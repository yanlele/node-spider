import {Browser, launch, Page} from 'puppeteer';
import * as UserAgent from 'user-agents';
import { load } from 'cheerio';

class CSDNPage {
  private page: Page;
  private browser: Browser;
  private readonly userAgent: string;

  constructor() {
    this.page = null;
    this.browser = null;
    this.userAgent = new UserAgent().toString();
  }

  async main() {
    this.browser = await launch({
      timeout: 15000,
      ignoreHTTPSErrors: true,
      devtools: false,
      headless: false,
      slowMo: 100,
      defaultViewport: {
        width: 1100,
        height: 680,
      }
    });

    this.page = await this.browser.newPage();
    await this.page.setUserAgent(this.userAgent);
    await this.page.goto('https://so.csdn.net/so/search/s.do?p=1&q=puppeteer');
    await this.page.waitForSelector('.main-container');
    const htmlString: string = await this.page.evaluate(() => document.body.innerHTML);
    const $ = load(htmlString);
    const a: any = $('body > div.main-container > div.con-l > div.search-list-con > dl.J_search > dt > div > a');

    console.log(typeof a);
    a.each((index, element) => {
      console.log($(element).find('em').text());
    });

    await this.browser.close();
  }
}

const login: CSDNPage = new CSDNPage();
login.main();
