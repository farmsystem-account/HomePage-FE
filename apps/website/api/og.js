// api/og.js  (Node 22.x / Vercel Serverless Function)

import chromium from '@sparticuz/chromium';
import puppeteer from 'puppeteer-core';

/**
 * 로컬(macOS) 크롬 경로 후보들
 * 필요 시 CHROME_PATH / PUPPETEER_EXECUTABLE_PATH 환경변수로 덮어쓰기 가능
 */
const LOCAL_CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  process.env.PUPPETEER_EXECUTABLE_PATH,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium'
].filter(Boolean);

const isProd = !!process.env.VERCEL;

async function getExecPath() {
  if (isProd) {
    // Vercel(Linux) -> 서버리스용 chromium 바이너리
    return await chromium.executablePath();
  }
  // 로컬: 후보 중 첫 번째 것을 사용 (없으면 puppeteer가 실패하므로 반드시 하나는 세팅)
  return LOCAL_CHROME_CANDIDATES[0];
}

export default async function handler(req, res) {
  // CORS (필요 시)
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.status(204).end();
    return;
  }

  const { url } = req.query;
  if (typeof url !== 'string' || !/^https?:\/\//i.test(url)) {
    res.status(400).json({ error: 'url query parameter is required (absolute http/https URL)' });
    return;
  }

  let browser;
  try {
    const executablePath = await getExecPath();

    browser = await puppeteer.launch({
      executablePath,
      args: isProd ? chromium.args : [],
      headless: true,
      defaultViewport: { width: 1200, height: 630 }
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 15_000 });

    const data = await page.evaluate(() => {
      const pick = (...sel) =>
        sel.map(s => document.querySelector(s)?.content).find(Boolean) || null;

      const title =
        pick('meta[property="og:title"]', 'meta[name="twitter:title"]') ||
        document.title ||
        null;

      const description = pick(
        'meta[property="og:description"]',
        'meta[name="description"]'
      );

      let image =
        pick('meta[property="og:image"]') ||
        document.querySelector('link[rel="image_src"]')?.href ||
        null;

      if (image && image.startsWith('/')) image = new URL(image, location.origin).href;

      return { title, description, image };
    });

    res.setHeader('Access-Control-Allow-Origin', '*');
    // 캐시 전략 필요 시 아래 라인 조정
    // res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err?.message || 'failed' });
  } finally {
    if (browser) await browser.close();
  }
}
