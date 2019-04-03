import {load} from 'cheerio';
import {launch, Page} from 'puppeteer';
import * as UserAgent from 'user-agents';

const userAgent = new UserAgent();

interface INew {
  title: string;
  href: string;
}

const localNews: INew[] = [];
const hotNews: INew[] = [];

const main = async () => {
  const browser = await launch({
    timeout: 15000,
    headless: false,
    devtools: false,
    slowMo: 100,
    ignoreHTTPSErrors: true
  });
  const page: Page = await browser.newPage();
  await page.setUserAgent(userAgent.toString());
  await page.goto('http://news.baidu.com/');
  await page.waitForSelector('div#local_news');
  const htmlStr: string = await page.evaluate(() => {
    return document.body.innerHTML;
  });
  const $ = load(htmlStr);
  // 本地新闻
  $('ul#localnews-focus li a').each((index, ele) => {
    const news: INew = {
      title: $(ele).text(),
      href: $(ele).attr('href'),
    };
    localNews.push(news);
  });

  // 本地咨询
  $('div#localnews-zixun ul li a').each((index, item) => {
    const news: INew = {
      title: $(item).text(),
      href: $(item).attr('href'),
    };
    localNews.push(news);
  });

  // 热点新闻
  $('div#pane-news ul li a').each((idx, ele) => {
    const news: INew = {
      title: $(ele).text(),        // 获取新闻标题
      href: $(ele).attr('href')    // 获取新闻网页链接
    };
    hotNews.push(news);              // 存入最终结果数组
  });

  console.log('hotNews', hotNews);
  console.log('localNews', localNews);
  await browser.close();
};

main();
