// api/og.js ─ Node 22.x (Vercel)용
import chromium from '@sparticuz/chromium-min';
import puppeteer from 'puppeteer-core';

export default async function handler(req, res) {
  const { url } = req.query;
  if (typeof url !== 'string' || !/^https?:\/\//i.test(url)) {
    res.status(400).json({ error: 'url query parameter is required (absolute http/https URL)' });
    return;
  }

  // Vercel·로컬 모두 chromium‑min 쓰도록 통일
  const browser = await puppeteer.launch({
    executablePath: await chromium.executablePath(), // min 빌드 위치
    args: chromium.args,
    headless: chromium.headless,          // 'new' 모드 포함
    defaultViewport: { width: 1200, height: 630 }
  });

  try {
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 15_000 });

    const data = await page.evaluate(() => {
      const pick = (...sel) => sel.map(s => document.querySelector(s)?.content).find(Boolean) || null;

      const title = pick('meta[property="og:title"]', 'meta[name="twitter:title"]') ||
                    document.title || null;

      const description = pick(
        'meta[property="og:description"]',
        'meta[name="description"]'
      );

      let image = pick(
        'meta[property="og:image"]'
      ) || document.querySelector('link[rel="image_src"]')?.href || null;

      if (image && image.startsWith('/')) image = new URL(image, location.origin).href;
      return { title, description, image };
    });

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err?.message || 'failed' });
  } finally {
    await browser.close();
  }
}
