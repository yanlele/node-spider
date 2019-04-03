import {Browser, launch, Page} from 'puppeteer';
import * as UserAgent from 'user-agents';
import {load} from 'cheerio';
import {writeFile, readFileSync} from 'fs';
import {resolve} from 'path';

class CSDNPage {
  private page: Page;
  private browser: Browser;
  private readonly userAgent: string;
  private readonly filePath: string;

  constructor() {
    this.page = null;
    this.browser = null;
    this.filePath = resolve(__dirname, './csdnPage.html')
    this.userAgent = new UserAgent({
      deviceCategory: 'desktop'
    }).toString();
  }

  file() {
    let fileData: string = '';
    try {
      fileData = readFileSync(this.filePath, 'utf8');
      console.log(fileData);
      console.log('处理filData');
    } catch (e) {
      this.main();
    }
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

    writeFile(this.filePath, a, 'utf8', () => console.log('success'));

    await this.browser.close();
  }
}

const login: CSDNPage = new CSDNPage();
login.file();
