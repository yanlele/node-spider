"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var puppeteer_1 = require("puppeteer");
var run = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var browser, page, dimensions;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, puppeteer_1.launch({
                    timeout: 15000,
                    ignoreHTTPSErrors: true,
                    devtools: false,
                    headless: false,
                    slowMo: 100
                })];
            case 1:
                browser = _a.sent();
                return [4, browser.newPage()];
            case 2:
                page = _a.sent();
                return [4, page.goto('https://github.com')];
            case 3:
                _a.sent();
                return [4, page.evaluate(function () {
                        return {
                            width: document.documentElement.clientWidth,
                            height: document.documentElement.clientHeight,
                            deviceScaleFactor: window.devicePixelRatio,
                            href: window.location.href,
                        };
                    })];
            case 4:
                dimensions = _a.sent();
                console.log('dimensions', dimensions);
                return [4, browser.close()];
            case 5:
                _a.sent();
                return [2];
        }
    });
}); };
run();
//# sourceMappingURL=01、simpleDemo.js.map