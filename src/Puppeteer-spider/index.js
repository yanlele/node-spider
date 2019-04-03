"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var puppeteer_1 = require("puppeteer");
var run = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var browser, page;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, puppeteer_1.launch({
                    timeout: 15000,
                    ignoreHTTPSErrors: true,
                    devtools: false,
                    headless: false,
                    slowMo: 100,
                })];
            case 1:
                browser = _a.sent();
                console.log('创建browser中...');
                return [4, browser.newPage()];
            case 2:
                page = _a.sent();
                console.log('创建browser成功...');
                return [4, page.goto('https://github.com/login')];
            case 3:
                _a.sent();
                console.log('正在打开网页...');
                return [4, page.type('#login_field', 'yanlele')];
            case 4:
                _a.sent();
                return [4, page.type('#password', '53693750qxyqxy')];
            case 5:
                _a.sent();
                return [4, browser.close()];
            case 6:
                _a.sent();
                return [2];
        }
    });
}); };
run();
//# sourceMappingURL=index.js.map