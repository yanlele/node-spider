"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var cheerio_1 = require("cheerio");
var fs_1 = require("fs");
var path_1 = require("path");
var puppeteer_1 = require("puppeteer");
var UserAgent = require("user-agents");
var userAgent = new UserAgent();
var localNews = [];
var hotNews = [];
var main = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var browser, page, htmlStr, $;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, puppeteer_1.launch({
                    timeout: 15000,
                    headless: true,
                    devtools: false,
                    slowMo: 100,
                    ignoreHTTPSErrors: true
                })];
            case 1:
                browser = _a.sent();
                return [4, browser.newPage()];
            case 2:
                page = _a.sent();
                return [4, page.setUserAgent(userAgent.toString())];
            case 3:
                _a.sent();
                return [4, page.goto('http://news.baidu.com/')];
            case 4:
                _a.sent();
                return [4, page.waitForSelector('div#local_news')];
            case 5:
                _a.sent();
                return [4, page.evaluate(function () { return document.body.innerHTML; })];
            case 6:
                htmlStr = _a.sent();
                $ = cheerio_1.load(htmlStr);
                $('ul#localnews-focus li a').each(function (index, item) {
                    var news = {
                        title: $(item).text(),
                        href: $(item).attr('href'),
                    };
                    localNews.push(news);
                });
                $('div#localnews-zixun ul li a').each(function (index, item) {
                    var news = {
                        title: $(item).text(),
                        href: $(item).attr('href'),
                    };
                    localNews.push(news);
                });
                $('div#pane-news ul li a').each(function (idx, ele) {
                    var news = {
                        title: $(ele).text(),
                        href: $(ele).attr('href')
                    };
                    hotNews.push(news);
                });
                console.log('hotNews', hotNews);
                console.log('localNews', localNews);
                fs_1.writeFile(path_1.resolve(__dirname, 'news.json'), JSON.stringify({
                    hotNews: hotNews,
                    localNews: localNews,
                }, undefined, 4), 'utf8', function () {
                    console.log('文件保存成功');
                });
                return [4, browser.close()];
            case 7:
                _a.sent();
                return [2];
        }
    });
}); };
main();
//# sourceMappingURL=03、news.js.map