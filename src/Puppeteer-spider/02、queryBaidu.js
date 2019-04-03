"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var puppeteer_1 = require("puppeteer");
var UserAgent = require("user-agents");
var userAgent = new UserAgent();
var run = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var browser, page, targetLink;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, puppeteer_1.launch({
                    timeout: 15000,
                    ignoreHTTPSErrors: false,
                    devtools: false,
                    headless: false,
                    slowMo: 100
                })];
            case 1:
                browser = _a.sent();
                return [4, browser.newPage()];
            case 2:
                page = _a.sent();
                return [4, page.setUserAgent(userAgent.toString())];
            case 3:
                _a.sent();
                return [4, page.goto('https://www.baidu.com/')];
            case 4:
                _a.sent();
                return [4, page.type('#kw', 'puppeteer')];
            case 5:
                _a.sent();
                return [4, page.click('#su')];
            case 6:
                _a.sent();
                return [4, page.waitFor(1000)];
            case 7:
                _a.sent();
                return [4, page.evaluate(function () {
                        return document.querySelectorAll('.c-container a')[1].innerHTML;
                    })];
            case 8:
                targetLink = _a.sent();
                console.log(targetLink);
                return [4, page.waitFor(1000)];
            case 9:
                _a.sent();
                return [4, browser.close()];
            case 10:
                _a.sent();
                return [2];
        }
    });
}); };
run();
//# sourceMappingURL=02、queryBaidu.js.map