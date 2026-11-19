// Делает скриншоты живых сайтов и собирает из них картинки для слайдов в Prezentatsioon/img/.
// Запуск из корня репозитория: node Prezentatsioon/make-screenshots.mjs
import puppeteer from 'puppeteer';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const rawDir = path.join(dir, 'img', 'raw');
const outDir = path.join(dir, 'img');
fs.mkdirSync(rawDir, { recursive: true });

const DESKTOP = { width: 1440, height: 900, deviceScaleFactor: 1 };
const MOBILE = { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true };
const MOBILE_UA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1';

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function hideOverlays(page) {
  await page.evaluate(() => {
    [...document.querySelectorAll('button')].find(b => /^\s*(Nõustun|Разрешаю)\s*$/.test(b.textContent))?.click();
  });
  await sleep(500);
  await page.evaluate(() => {
    document.querySelectorAll('[id*="cookie" i], [class*="cookie" i], [id*="consent" i], [class*="consent" i]').forEach(el => {
      if (el === document.body || el === document.documentElement) return;
      el.style.setProperty('display', 'none', 'important');
    });
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  });
}

async function shoot(browser, { url, file, viewport = DESKTOP, wait = 2500, before, noJs = false, light = false }) {
  const page = await browser.newPage();
  if (viewport.isMobile) await page.setUserAgent(MOBILE_UA);
  if (light) await page.evaluateOnNewDocument(() => localStorage.setItem('adviral-theme', 'light'));
  await page.setViewport(viewport);
  if (noJs) await page.setJavaScriptEnabled(false);
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 90000 });
  await sleep(wait);
  if (!noJs) await hideOverlays(page);
  if (before) await before(page);
  await page.screenshot({ path: path.join(rawDir, file) });
  await page.close();
  console.log('ok', file);
}

async function compose(browser, { file, items, width = 1600, height = 1000 }) {
  const toData = f => 'data:image/png;base64,' + fs.readFileSync(path.join(rawDir, f)).toString('base64');
  const cells = items.map(it => `
    <figure style="flex:${it.flex || 1};${it.phone ? 'max-width:26%' : ''}">
      <img src="${toData(it.src)}" style="${it.phone ? 'border-radius:28px;border:6px solid #2a2f3a' : 'border-radius:12px;border:1px solid #2a2f3a'}">
      ${it.caption ? `<figcaption>${it.caption}</figcaption>` : ''}
    </figure>`).join('');
  const html = `<html><body style="margin:0;background:#181b22;width:${width}px;height:${height}px;
    display:flex;align-items:center;justify-content:center;gap:28px;padding:32px;box-sizing:border-box;
    font-family:Segoe UI,Arial,sans-serif">
    <style>figure{margin:0;display:flex;flex-direction:column;align-items:center;gap:12px;min-width:0}
    img{width:100%;height:auto;display:block;box-shadow:0 10px 30px rgba(0,0,0,.45)}
    figcaption{color:#9aa1b2;font-size:22px}</style>${cells}</body></html>`;
  const page = await browser.newPage();
  await page.setViewport({ width, height, deviceScaleFactor: 1 });
  await page.setContent(html, { waitUntil: 'load' });
  await page.screenshot({ path: path.join(outDir, file) });
  await page.close();
  console.log('composed', file);
}

async function grid(browser, { file, items, width = 1600, height = 1000 }) {
  const toData = f => 'data:image/png;base64,' + fs.readFileSync(path.join(rawDir, f)).toString('base64');
  const html = `<html><body style="margin:0;background:#181b22;width:${width}px;height:${height}px;padding:24px;box-sizing:border-box;
    display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;gap:20px">
    ${items.map(f => `<div style="min-height:0;display:flex;align-items:center;justify-content:center">
      <img src="${toData(f)}" style="max-width:100%;max-height:100%;border-radius:12px;box-shadow:0 10px 30px rgba(0,0,0,.45)"></div>`).join('')}
    </body></html>`;
  const page = await browser.newPage();
  await page.setViewport({ width, height, deviceScaleFactor: 1 });
  await page.setContent(html, { waitUntil: 'load' });
  await page.screenshot({ path: path.join(outDir, file) });
  await page.close();
  console.log('composed', file);
}

const browser = await puppeteer.launch({ headless: true, args: ['--autoplay-policy=no-user-gesture-required'] });
try {
  // Adviral
  await shoot(browser, { url: 'https://adviral.agency/et/', file: 'adv_desktop.png', wait: 4000 });
  await shoot(browser, { url: 'https://adviral.agency/et/', file: 'adv_mobile.png', viewport: MOBILE, wait: 4000 });
  await shoot(browser, { url: 'https://adviral.agency/et/services/video/', file: 'adv_popup.png', wait: 4000 });
  await shoot(browser, { url: 'https://adviral.agency/et/services/video/', file: 'adv_popup_mobile.png', viewport: MOBILE, wait: 4000 });
  await shoot(browser, {
    url: 'https://adviral.agency/et/', file: 'adv_player.png', wait: 4000,
    before: async page => {
      await page.evaluate(() => document.querySelector('.ig-item')?.scrollIntoView({ block: 'center' }));
      await sleep(800);
      await page.click('.ig-item');
      await sleep(4000);
    },
  });
  // Как страницу видит робот без JavaScript и стилей
  await shoot(browser, {
    url: 'https://adviral.agency/et/services/video/', file: 'adv_bot.png', noJs: true, wait: 500,
    viewport: { width: 1000, height: 560, deviceScaleFactor: 1.5 },
    before: async page => {
      await page.evaluate(() => {
        document.querySelectorAll('link[rel="stylesheet"], style, script, noscript, video, img, svg, iframe').forEach(el => el.remove());
        document.querySelectorAll('[hidden]').forEach(el => el.removeAttribute('hidden'));
        document.body.style.cssText = 'background:#fff;color:#111;font:20px/1.5 Times New Roman,serif;padding:24px 40px';
        const h1 = document.querySelector('h1.service-popup-title');
        if (h1) {
          h1.style.cssText = 'background:#ffe14d;outline:3px solid #ff7a1a;padding:4px 8px;font-size:34px';
          const tag = document.createElement('div');
          tag.textContent = '<h1>';
          tag.style.cssText = 'font:bold 22px monospace;color:#ff7a1a;padding-top:16px';
          h1.before(tag);
          tag.scrollIntoView({ block: 'start' });
        }
      });
    },
  });
  await shoot(browser, {
    url: 'https://adviral.agency/et/', file: 'adv_light_mobile.png', viewport: MOBILE, wait: 4000, light: true,
    before: async page => {
      await page.evaluate(() => [...document.querySelectorAll('h2')].find(h => /Teenused/.test(h.textContent))?.scrollIntoView({ block: 'start' }));
      await sleep(2500);
    },
  });

  // GoGPS
  await shoot(browser, { url: 'https://gogps.ee/et/', file: 'gogps_desktop.png', wait: 4000 });
  await shoot(browser, { url: 'https://gogps.ee/et/', file: 'gogps_mobile.png', viewport: MOBILE, wait: 4000 });

  // Сборки для слайдов
  await compose(browser, { file: 'adviral_home.png', items: [{ src: 'adv_desktop.png', flex: 3 }, { src: 'adv_mobile.png', phone: true }] });
  await compose(browser, { file: 'gogps_home.png', items: [{ src: 'gogps_desktop.png', flex: 3 }, { src: 'gogps_mobile.png', phone: true }] });
  // gogps_admin_1..4.png — скриншоты админ-панели, сделанные вручную (вход по логину)
  await grid(browser, { file: 'gogps_admin.png', items: [1, 2, 3, 4].map(i => `gogps_admin_${i}.png`) });
  await compose(browser, { file: 'adviral_player.png', items: [
    { src: 'adv_player.png', flex: 3, caption: 'Свой видеоплеер' },
    { src: 'adv_light_mobile.png', phone: true, caption: 'Светлая тема' },
  ] });
  await compose(browser, { file: 'popup_vs_google.png', items: [
    { src: 'adv_popup.png', flex: 3, caption: 'Компьютер' },
    { src: 'adv_popup_mobile.png', phone: true, caption: 'Телефон' },
  ] });
  fs.copyFileSync(path.join(rawDir, 'adv_bot.png'), path.join(outDir, 'google_view.png'));

  // Ответ ИИ по реальному отчёту Google Analytics (adviral.agency, последние 28 дней, запрос через MCP)
  const page = await browser.newPage();
  await page.setViewport({ width: 1600, height: 1000 });
  const rows = [["Google'i otsing", 9], ['Otsekülastused', 3], ['AI-assistendid', 2], ['Sotsiaalmeedia', 2], ['Muu', 1]];
  await page.setContent(`<html><body style="margin:0;background:#181b22;width:1600px;height:1000px;display:flex;
    flex-direction:column;justify-content:center;gap:36px;padding:60px 90px;box-sizing:border-box;font-family:Segoe UI,Arial,sans-serif;color:#e8eaf0">
    <div style="align-self:flex-end;max-width:78%;background:#2b3245;border-radius:22px 22px 4px 22px;padding:26px 32px;font-size:34px">
      Kust tulevad inimesed adviral.agency lehele viimase 4 nädala jooksul?</div>
    <div style="max-width:88%;background:#0f1115;border:1px solid #2a2f3a;border-radius:22px 22px 22px 4px;padding:30px 36px;font-size:30px">
      <div style="color:#9aa1b2;font-size:22px;margin-bottom:14px">AI · Google Analytics MCP · run_report</div>
      <div style="margin-bottom:22px"><b>17 külastust.</b> Rohkem kui pool — Google'i otsingust:</div>
      ${rows.map(([n, v]) => `<div style="display:flex;align-items:center;gap:20px;margin:10px 0">
        <span style="width:280px">${n}</span>
        <span style="height:30px;width:${v * 70}px;background:${n === "Google'i otsing" ? '#ff7a1a' : '#4fa3ff'};border-radius:6px"></span>
        <b>${v}</b></div>`).join('')}
    </div></body></html>`);
  await page.screenshot({ path: path.join(outDir, 'ai_analytics.png') });
  await page.close();
  console.log('composed ai_analytics.png');
} finally {
  await browser.close();
}
