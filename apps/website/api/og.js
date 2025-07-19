import chromium from '@sparticuz/chromium';
import puppeteer from 'puppeteer-core';

export default async function handler(req, res) {
  const { url } = req.query;
  if (typeof url !== 'string' || !/^https?:\/\//i.test(url)) {
    res.status(400).json({ error: 'url query parameter is required (absolute http/https URL)' });
    return;
  }

  const isProd = !!process.env.VERCEL;      // Vercel = true, 로컬 = false
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: { width: 1200, height: 630 },
    executablePath: isProd ? await chromium.executablePath() : undefined,
    headless: true,
  });

  try {
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 15_000 });

    const data = await page.evaluate(() => {
      // <head> 안의 메타 태그 우선순위 검색
      const pick = (...selectors) =>
        selectors
          .map((s) => document.querySelector(s)?.content)
          .find(Boolean) || null;

      const title =
        pick('meta[property="og:title"]', 'meta[name="twitter:title"]', 'title') ||
        document.title ||
        null;

      const description =
        pick(
          'meta[property="og:description"]',
          'meta[name="description"]',
          'meta[name="twitter:description"]',
          'description'
        );

      let image =
        pick(
          'meta[property="og:image"]',
          'meta[name="twitter:image"]',
          'image'
        ) ||
        document.querySelector('link[rel="image_src"]')?.href ||
        null;

      // 상대 경로 → 절대 URL
      if (image && image.startsWith('/')) {
        image = new URL(image, location.origin).href;
      }

      return { title, description, image };
    });

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err?.message || 'failed' });
  } finally {
    await browser.close();
  }
}