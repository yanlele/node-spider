import {launch} from 'puppeteer';

const run = async () => {
  const browser = await launch({
    timeout: 15000,
    ignoreHTTPSErrors: false,
    devtools: false,
    headless: false,
    slowMo: 100
  });

  const page = await browser.newPage();
  await page.goto('https://www.baidu.com/');
  await page.type('#kw', 'puppeteer');
  await page.click('#su');
  await page.waitFor(3000);
  const targetLink = await page.evaluate(() => {
    return document.querySelector('.c-container a').innerHTML;
  });
  console.log(targetLink);
  await page.waitFor(1000);
  await browser.close();
};

run();
