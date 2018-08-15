(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common/http'), require('@angular/common'), require('error-stack-parser'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('angular-error-logging', ['exports', '@angular/core', '@angular/common/http', '@angular/common', 'error-stack-parser', 'rxjs/operators'], factory) :
    (factory((global['angular-error-logging'] = {}),global.ng.core,global.ng.common.http,global.ng.common,null,global.rxjs.operators));
}(this, (function (exports,i0,i2,i3,StackTraceParser,operators) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var ErrorLoggingOptions = (function () {
        function ErrorLoggingOptions() {
            this.endpoint = 'https://dashboard.7dev.nl/api/logs';
        }
        return ErrorLoggingOptions;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var JsError = (function () {
        function JsError(type, status_code, error, file, line, stacktrac) {
            this.type = type;
            this.status_code = status_code;
            this.error = error;
            this.file = file;
            this.line = line;
            this.stacktrac = stacktrac;
        }
        return JsError;
    }());

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @type {?} */
    var GLOBALS = new i0.InjectionToken('Global config for error-logging');

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var ErrorLoggingService = (function () {
        function ErrorLoggingService(globalConfig, httpClient, locationStrategy) {
            this.globalConfig = globalConfig;
            this.httpClient = httpClient;
            this.locationStrategy = locationStrategy;
        }
        /**
         * @param {?} error
         * @param {?=} req
         * @return {?}
         */
        ErrorLoggingService.prototype.buildError = /**
         * @param {?} error
         * @param {?=} req
         * @return {?}
         */
            function (error, req) {
                /** @type {?} */
                var appId = this.globalConfig.appId;
                /** @type {?} */
                var env = this.globalConfig.environment;
                /** @type {?} */
                var url = this.locationStrategy instanceof i3.PathLocationStrategy ? this.locationStrategy.path() : 'Not applicable';
                /** @type {?} */
                var statusCode = error instanceof i2.HttpErrorResponse ? error.status.toString() : 'Not applicable';
                /** @type {?} */
                var request = req ? JSON.stringify(req) : 'Not applicable';
                /** @type {?} */
                var message = error.message || error.toString() || 'Not defined';
                /** @type {?} */
                var stacktrace = error instanceof i2.HttpErrorResponse ? 'No stack available' : StackTraceParser.parse(error);
                /** @type {?} */
                var file = error instanceof i2.HttpErrorResponse ? 'Not applicable' : stacktrace[0].fileName;
                /** @type {?} */
                var line = error instanceof i2.HttpErrorResponse ? 'Not applicable' : stacktrace[0].lineNumber;
                /** @type {?} */
                var errorToSend = {
                    type: 'JS',
                    appId: appId,
                    env: env,
                    url: url,
                    status_code: statusCode,
                    request: request,
                    error: message,
                    file: file,
                    line: line,
                    stacktrace: JSON.stringify(stacktrace),
                };
                this.reportError(errorToSend).subscribe();
            };
        /**
         * @param {?} error
         * @return {?}
         */
        ErrorLoggingService.prototype.reportError = /**
         * @param {?} error
         * @return {?}
         */
            function (error) {
                return this.httpClient.post(this.globalConfig.endpoint, error, {
                    headers: {
                        'Authorization': 'Bearer ' + this.globalConfig.access_token
                    }
                });
            };
        ErrorLoggingService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        /** @nocollapse */
        ErrorLoggingService.ctorParameters = function () {
            return [
                { type: ErrorLoggingOptions, decorators: [{ type: i0.Optional }, { type: i0.Inject, args: [GLOBALS,] }] },
                { type: i2.HttpClient },
                { type: i3.LocationStrategy }
            ];
        };
        /** @nocollapse */ ErrorLoggingService.ngInjectableDef = i0.defineInjectable({ factory: function ErrorLoggingService_Factory() { return new ErrorLoggingService(i0.inject(GLOBALS, 8), i0.inject(i2.HttpClient), i0.inject(i3.LocationStrategy)); }, token: ErrorLoggingService, providedIn: "root" });
        return ErrorLoggingService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var ErrorLoggingHandler = (function (_super) {
        __extends(ErrorLoggingHandler, _super);
        function ErrorLoggingHandler(injector) {
            var _this = _super.call(this) || this;
            _this.injector = injector;
            return _this;
        }
        /**
         * @param {?} error
         * @return {?}
         */
        ErrorLoggingHandler.prototype.handleError = /**
         * @param {?} error
         * @return {?}
         */
            function (error) {
                if (!(error instanceof i2.HttpErrorResponse)) {
                    /** @type {?} */
                    var errorLoggingService = this.injector.get(ErrorLoggingService);
                    errorLoggingService.buildError(error);
                }
                _super.prototype.handleError.call(this, error);
            };
        ErrorLoggingHandler.decorators = [
            { type: i0.Injectable },
        ];
        /** @nocollapse */
        ErrorLoggingHandler.ctorParameters = function () {
            return [
                { type: i0.Injector }
            ];
        };
        return ErrorLoggingHandler;
    }(i0.ErrorHandler));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Pass untouched request through to the next request handler.
     */
    var ErrorLoggingInterceptor = (function () {
        function ErrorLoggingInterceptor(globalConfig, errorLoggingService) {
            this.globalConfig = globalConfig;
            this.errorLoggingService = errorLoggingService;
        }
        /**
         * @param {?} req
         * @param {?} next
         * @return {?}
         */
        ErrorLoggingInterceptor.prototype.intercept = /**
         * @param {?} req
         * @param {?} next
         * @return {?}
         */
            function (req, next) {
                var _this = this;
                return next.handle(req)
                    .pipe(operators.tap(
                // Succeeds when there is a response; ignore other events
                // Succeeds when there is a response; ignore other events
                function (event) {
                    if (event instanceof i2.HttpResponse && event.status !== 200 && event.status !== 401 && event.status !== 403 && req.url !== _this.globalConfig.endpoint) {
                        _this.errorLoggingService.buildError(new Error(event.status + ' !== 200'), req);
                    }
                }, 
                // Operation failed; error is an HttpErrorResponse
                // Operation failed; error is an HttpErrorResponse
                function (error) {
                    if (req.url !== _this.globalConfig.endpoint && error.status !== 401 && error.status !== 403) {
                        _this.errorLoggingService.buildError(error, req);
                    }
                }));
            };
        ErrorLoggingInterceptor.decorators = [
            { type: i0.Injectable },
        ];
        /** @nocollapse */
        ErrorLoggingInterceptor.ctorParameters = function () {
            return [
                { type: ErrorLoggingOptions, decorators: [{ type: i0.Optional }, { type: i0.Inject, args: [GLOBALS,] }] },
                { type: ErrorLoggingService }
            ];
        };
        return ErrorLoggingInterceptor;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var ErrorLoggingModule = (function () {
        function ErrorLoggingModule() {
        }
        /**
         * @param {?} globalOptions
         * @return {?}
         */
        ErrorLoggingModule.forRoot = /**
         * @param {?} globalOptions
         * @return {?}
         */
            function (globalOptions) {
                return {
                    ngModule: ErrorLoggingModule,
                    providers: [
                        ErrorLoggingService,
                        { provide: GLOBALS, useValue: globalOptions }
                    ]
                };
            };
        ErrorLoggingModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [],
                        declarations: [],
                        exports: [],
                        providers: [
                            { provide: i0.ErrorHandler, useClass: ErrorLoggingHandler },
                            { provide: i2.HTTP_INTERCEPTORS, useClass: ErrorLoggingInterceptor, multi: true },
                        ]
                    },] },
        ];
        return ErrorLoggingModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    exports.ErrorLoggingOptions = ErrorLoggingOptions;
    exports.JsError = JsError;
    exports.ErrorLoggingModule = ErrorLoggingModule;
    exports.ɵa = ErrorLoggingHandler;
    exports.ɵb = ErrorLoggingInterceptor;
    exports.ɵd = ErrorLoggingService;
    exports.ɵc = GLOBALS;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1lcnJvci1sb2dnaW5nLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vYW5ndWxhci1lcnJvci1sb2dnaW5nL2xpYi9lcnJvci1sb2dnaW5nLW9wdGlvbnMudHMiLCJuZzovL2FuZ3VsYXItZXJyb3ItbG9nZ2luZy9saWIvanMtZXJyb3IudHMiLG51bGwsIm5nOi8vYW5ndWxhci1lcnJvci1sb2dnaW5nL2xpYi9nbG9iYWxzLnRzIiwibmc6Ly9hbmd1bGFyLWVycm9yLWxvZ2dpbmcvbGliL2Vycm9yLWxvZ2dpbmcuc2VydmljZS50cyIsIm5nOi8vYW5ndWxhci1lcnJvci1sb2dnaW5nL2xpYi9lcnJvci1sb2dnaW5nLmhhbmRsZXIudHMiLCJuZzovL2FuZ3VsYXItZXJyb3ItbG9nZ2luZy9saWIvZXJyb3ItbG9nZ2luZy5pbnRlcmNlcHRvci50cyIsIm5nOi8vYW5ndWxhci1lcnJvci1sb2dnaW5nL2xpYi9lcnJvci1sb2dnaW5nLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgRXJyb3JMb2dnaW5nT3B0aW9ucyB7XG4gICAgYXBwSWQ6IHN0cmluZztcbiAgICBhY2Nlc3NfdG9rZW46IHN0cmluZztcbiAgICBlbnZpcm9ubWVudDogYW55O1xuICAgIGVuZHBvaW50OiBzdHJpbmcgPSAnaHR0cHM6Ly9kYXNoYm9hcmQuN2Rldi5ubC9hcGkvbG9ncyc7XG59XG4iLCJleHBvcnQgY2xhc3MgSnNFcnJvciB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyB0eXBlOiAnSlMgaHR0cCcgfCAnSlMgcnVudGltZScsXG4gICAgICAgIHB1YmxpYyBzdGF0dXNfY29kZTogc3RyaW5nLFxuICAgICAgICBwdWJsaWMgZXJyb3I6IHN0cmluZyxcbiAgICAgICAgcHVibGljIGZpbGU/OiBzdHJpbmcsXG4gICAgICAgIHB1YmxpYyBsaW5lPzogc3RyaW5nLFxuICAgICAgICBwdWJsaWMgc3RhY2t0cmFjPzogc3RyaW5nLFxuICAgICkge31cbn1cbiIsIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXHJcbnRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXHJcbkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblxyXG5USElTIENPREUgSVMgUFJPVklERUQgT04gQU4gKkFTIElTKiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXHJcbktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRURcclxuV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIFRJVExFLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSxcclxuTUVSQ0hBTlRBQkxJVFkgT1IgTk9OLUlORlJJTkdFTUVOVC5cclxuXHJcblNlZSB0aGUgQXBhY2hlIFZlcnNpb24gMi4wIExpY2Vuc2UgZm9yIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9uc1xyXG5hbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMClcclxuICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBleHBvcnRzKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmICghZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl0sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogbiA9PT0gXCJyZXR1cm5cIiB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIHJlc3VsdFtrXSA9IG1vZFtrXTtcclxuICAgIHJlc3VsdC5kZWZhdWx0ID0gbW9kO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuIiwiaW1wb3J0IHsgRXJyb3JMb2dnaW5nT3B0aW9ucyB9IGZyb20gJy4vZXJyb3ItbG9nZ2luZy1vcHRpb25zJztcbmltcG9ydCB7IEluamVjdGlvblRva2VuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmV4cG9ydCBjb25zdCBHTE9CQUxTOiBJbmplY3Rpb25Ub2tlbjxFcnJvckxvZ2dpbmdPcHRpb25zPiA9IG5ldyBJbmplY3Rpb25Ub2tlbignR2xvYmFsIGNvbmZpZyBmb3IgZXJyb3ItbG9nZ2luZycpO1xuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT3B0aW9uYWwsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cFJlcXVlc3QsIEh0dHBFcnJvclJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgTG9jYXRpb25TdHJhdGVneSwgUGF0aExvY2F0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0ICogYXMgU3RhY2tUcmFjZVBhcnNlciBmcm9tICdlcnJvci1zdGFjay1wYXJzZXInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBFcnJvckxvZ2dpbmdPcHRpb25zIH0gZnJvbSAnLi9lcnJvci1sb2dnaW5nLW9wdGlvbnMnO1xuaW1wb3J0IHsgR0xPQkFMUyB9IGZyb20gJy4vZ2xvYmFscyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5cbmV4cG9ydCBjbGFzcyBFcnJvckxvZ2dpbmdTZXJ2aWNlIHtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KEdMT0JBTFMpIHByaXZhdGUgZ2xvYmFsQ29uZmlnOiBFcnJvckxvZ2dpbmdPcHRpb25zLFxuICAgICAgICBwcml2YXRlIGh0dHBDbGllbnQ6IEh0dHBDbGllbnQsXG4gICAgICAgIHByaXZhdGUgbG9jYXRpb25TdHJhdGVneTogTG9jYXRpb25TdHJhdGVneSxcbiAgICApIHt9XG5cbiAgICBidWlsZEVycm9yKGVycm9yLCByZXE/OiBIdHRwUmVxdWVzdDxhbnk+KSB7XG5cbiAgICAgICAgY29uc3QgYXBwSWQgPSB0aGlzLmdsb2JhbENvbmZpZy5hcHBJZDtcbiAgICAgICAgY29uc3QgZW52ID0gdGhpcy5nbG9iYWxDb25maWcuZW52aXJvbm1lbnQ7XG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMubG9jYXRpb25TdHJhdGVneSBpbnN0YW5jZW9mIFBhdGhMb2NhdGlvblN0cmF0ZWd5ID8gdGhpcy5sb2NhdGlvblN0cmF0ZWd5LnBhdGgoKSA6ICdOb3QgYXBwbGljYWJsZSc7XG4gICAgICAgIGNvbnN0IHN0YXR1c0NvZGUgPSBlcnJvciBpbnN0YW5jZW9mIEh0dHBFcnJvclJlc3BvbnNlID8gZXJyb3Iuc3RhdHVzLnRvU3RyaW5nKCkgOiAnTm90IGFwcGxpY2FibGUnO1xuICAgICAgICBjb25zdCByZXF1ZXN0ID0gcmVxID8gSlNPTi5zdHJpbmdpZnkocmVxKSA6ICdOb3QgYXBwbGljYWJsZSc7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBlcnJvci5tZXNzYWdlIHx8IGVycm9yLnRvU3RyaW5nKCkgfHwgJ05vdCBkZWZpbmVkJztcbiAgICAgICAgY29uc3Qgc3RhY2t0cmFjZTogYW55ID0gZXJyb3IgaW5zdGFuY2VvZiBIdHRwRXJyb3JSZXNwb25zZSA/ICdObyBzdGFjayBhdmFpbGFibGUnIDogU3RhY2tUcmFjZVBhcnNlci5wYXJzZShlcnJvcik7XG4gICAgICAgIGNvbnN0IGZpbGUgPSBlcnJvciBpbnN0YW5jZW9mIEh0dHBFcnJvclJlc3BvbnNlID8gJ05vdCBhcHBsaWNhYmxlJyA6IHN0YWNrdHJhY2VbMF0uZmlsZU5hbWU7XG4gICAgICAgIGNvbnN0IGxpbmUgPSBlcnJvciBpbnN0YW5jZW9mIEh0dHBFcnJvclJlc3BvbnNlID8gJ05vdCBhcHBsaWNhYmxlJyA6IHN0YWNrdHJhY2VbMF0ubGluZU51bWJlcjtcblxuICAgICAgICBjb25zdCBlcnJvclRvU2VuZCA9IHtcbiAgICAgICAgICAgIHR5cGU6ICdKUycsXG4gICAgICAgICAgICBhcHBJZCxcbiAgICAgICAgICAgIGVudixcbiAgICAgICAgICAgIHVybCxcbiAgICAgICAgICAgIHN0YXR1c19jb2RlOiBzdGF0dXNDb2RlLFxuICAgICAgICAgICAgcmVxdWVzdCxcbiAgICAgICAgICAgIGVycm9yOiBtZXNzYWdlLFxuICAgICAgICAgICAgZmlsZSxcbiAgICAgICAgICAgIGxpbmUsXG4gICAgICAgICAgICBzdGFja3RyYWNlOiBKU09OLnN0cmluZ2lmeShzdGFja3RyYWNlKSxcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLnJlcG9ydEVycm9yKGVycm9yVG9TZW5kKS5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICByZXBvcnRFcnJvcihlcnJvcik6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBDbGllbnQucG9zdCh0aGlzLmdsb2JhbENvbmZpZy5lbmRwb2ludCwgZXJyb3IsIHtcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6ICdCZWFyZXIgJyArIHRoaXMuZ2xvYmFsQ29uZmlnLmFjY2Vzc190b2tlblxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBFcnJvckhhbmRsZXIsIEluamVjdGFibGUsIEluamVjdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwRXJyb3JSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcblxuaW1wb3J0IHsgRXJyb3JMb2dnaW5nU2VydmljZSB9IGZyb20gJy4vZXJyb3ItbG9nZ2luZy5zZXJ2aWNlJztcblxuLy8gb3VyIGdsb2JhbCBlcnJvciBoYW5kbGVyXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRXJyb3JMb2dnaW5nSGFuZGxlciBleHRlbmRzIEVycm9ySGFuZGxlciB7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgaGFuZGxlRXJyb3IoZXJyb3IpIHtcbiAgICAgICAgaWYgKCEoZXJyb3IgaW5zdGFuY2VvZiBIdHRwRXJyb3JSZXNwb25zZSkpIHtcbiAgICAgICAgICAgIGNvbnN0IGVycm9yTG9nZ2luZ1NlcnZpY2UgPSB0aGlzLmluamVjdG9yLmdldChFcnJvckxvZ2dpbmdTZXJ2aWNlKTtcbiAgICAgICAgICAgIGVycm9yTG9nZ2luZ1NlcnZpY2UuYnVpbGRFcnJvcihlcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgc3VwZXIuaGFuZGxlRXJyb3IoZXJyb3IpO1xuICAgIH1cblxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0LCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cEV2ZW50LCBIdHRwSW50ZXJjZXB0b3IsIEh0dHBIYW5kbGVyLCBIdHRwUmVxdWVzdCwgSHR0cFJlc3BvbnNlLCBIdHRwRXJyb3JSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgRXJyb3JMb2dnaW5nU2VydmljZSB9IGZyb20gJy4vZXJyb3ItbG9nZ2luZy5zZXJ2aWNlJztcbmltcG9ydCB7IEVycm9yTG9nZ2luZ09wdGlvbnMgfSBmcm9tICcuL2Vycm9yLWxvZ2dpbmctb3B0aW9ucyc7XG5pbXBvcnQgeyBHTE9CQUxTIH0gZnJvbSAnLi9nbG9iYWxzJztcblxuLyoqIFBhc3MgdW50b3VjaGVkIHJlcXVlc3QgdGhyb3VnaCB0byB0aGUgbmV4dCByZXF1ZXN0IGhhbmRsZXIuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRXJyb3JMb2dnaW5nSW50ZXJjZXB0b3IgaW1wbGVtZW50cyBIdHRwSW50ZXJjZXB0b3Ige1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoR0xPQkFMUykgcHJpdmF0ZSBnbG9iYWxDb25maWc6IEVycm9yTG9nZ2luZ09wdGlvbnMsXG4gICAgICAgIHByaXZhdGUgZXJyb3JMb2dnaW5nU2VydmljZTogRXJyb3JMb2dnaW5nU2VydmljZSxcbiAgICApIHtcbiAgICB9XG5cbiAgICBpbnRlcmNlcHQocmVxOiBIdHRwUmVxdWVzdDxhbnk+LCBuZXh0OiBIdHRwSGFuZGxlcik6IE9ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+IHtcbiAgICAgICAgcmV0dXJuIG5leHQuaGFuZGxlKHJlcSlcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICB0YXAoXG4gICAgICAgICAgICAgICAgLy8gU3VjY2VlZHMgd2hlbiB0aGVyZSBpcyBhIHJlc3BvbnNlOyBpZ25vcmUgb3RoZXIgZXZlbnRzXG4gICAgICAgICAgICAgICAgKGV2ZW50OiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50IGluc3RhbmNlb2YgSHR0cFJlc3BvbnNlICYmIGV2ZW50LnN0YXR1cyAhPT0gMjAwICYmIGV2ZW50LnN0YXR1cyAhPT0gNDAxICYmIGV2ZW50LnN0YXR1cyAhPT0gNDAzICYmIHJlcS51cmwgIT09IHRoaXMuZ2xvYmFsQ29uZmlnLmVuZHBvaW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVycm9yTG9nZ2luZ1NlcnZpY2UuYnVpbGRFcnJvcihuZXcgRXJyb3IoZXZlbnQuc3RhdHVzICsgJyAhPT0gMjAwJyksIHJlcSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIC8vIE9wZXJhdGlvbiBmYWlsZWQ7IGVycm9yIGlzIGFuIEh0dHBFcnJvclJlc3BvbnNlXG4gICAgICAgICAgICAgICAgKGVycm9yOiBIdHRwRXJyb3JSZXNwb25zZSkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXEudXJsICE9PSB0aGlzLmdsb2JhbENvbmZpZy5lbmRwb2ludCAmJiBlcnJvci5zdGF0dXMgIT09IDQwMSAmJiBlcnJvci5zdGF0dXMgIT09IDQwMykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lcnJvckxvZ2dpbmdTZXJ2aWNlLmJ1aWxkRXJyb3IoZXJyb3IsIHJlcSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMsIEVycm9ySGFuZGxlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSFRUUF9JTlRFUkNFUFRPUlMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5cbmltcG9ydCB7IEVycm9yTG9nZ2luZ09wdGlvbnMgfSBmcm9tICcuL2Vycm9yLWxvZ2dpbmctb3B0aW9ucyc7XG5pbXBvcnQgeyBFcnJvckxvZ2dpbmdIYW5kbGVyIH0gZnJvbSAnLi9lcnJvci1sb2dnaW5nLmhhbmRsZXInO1xuaW1wb3J0IHsgRXJyb3JMb2dnaW5nSW50ZXJjZXB0b3IgfSBmcm9tICcuL2Vycm9yLWxvZ2dpbmcuaW50ZXJjZXB0b3InO1xuaW1wb3J0IHsgRXJyb3JMb2dnaW5nU2VydmljZSB9IGZyb20gJy4vZXJyb3ItbG9nZ2luZy5zZXJ2aWNlJztcbmltcG9ydCB7IEdMT0JBTFMgfSBmcm9tICcuL2dsb2JhbHMnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHsgcHJvdmlkZTogRXJyb3JIYW5kbGVyLCB1c2VDbGFzczogRXJyb3JMb2dnaW5nSGFuZGxlciB9LFxuICAgICAgICB7IHByb3ZpZGU6IEhUVFBfSU5URVJDRVBUT1JTLCB1c2VDbGFzczogRXJyb3JMb2dnaW5nSW50ZXJjZXB0b3IsIG11bHRpOiB0cnVlIH0sXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBFcnJvckxvZ2dpbmdNb2R1bGUge1xuICAgIHN0YXRpYyBmb3JSb290KGdsb2JhbE9wdGlvbnM6IEVycm9yTG9nZ2luZ09wdGlvbnMpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5nTW9kdWxlOiBFcnJvckxvZ2dpbmdNb2R1bGUsXG4gICAgICAgICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgICAgICAgICBFcnJvckxvZ2dpbmdTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHsgcHJvdmlkZTogR0xPQkFMUywgdXNlVmFsdWU6IGdsb2JhbE9wdGlvbnMgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuICAgIH1cbn1cbiJdLCJuYW1lcyI6WyJJbmplY3Rpb25Ub2tlbiIsIlBhdGhMb2NhdGlvblN0cmF0ZWd5IiwiSHR0cEVycm9yUmVzcG9uc2UiLCJTdGFja1RyYWNlUGFyc2VyLnBhcnNlIiwiSW5qZWN0YWJsZSIsIk9wdGlvbmFsIiwiSW5qZWN0IiwiSHR0cENsaWVudCIsIkxvY2F0aW9uU3RyYXRlZ3kiLCJ0c2xpYl8xLl9fZXh0ZW5kcyIsIkluamVjdG9yIiwiRXJyb3JIYW5kbGVyIiwidGFwIiwiSHR0cFJlc3BvbnNlIiwiTmdNb2R1bGUiLCJIVFRQX0lOVEVSQ0VQVE9SUyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLFFBQUE7OzRCQUl1QixvQ0FBb0M7O2tDQUozRDtRQUtDOzs7Ozs7QUNMRCxRQUFBO1FBQ0ksaUJBQ1csTUFDQSxhQUNBLE9BQ0EsTUFDQSxNQUNBO1lBTEEsU0FBSSxHQUFKLElBQUk7WUFDSixnQkFBVyxHQUFYLFdBQVc7WUFDWCxVQUFLLEdBQUwsS0FBSztZQUNMLFNBQUksR0FBSixJQUFJO1lBQ0osU0FBSSxHQUFKLElBQUk7WUFDSixjQUFTLEdBQVQsU0FBUztTQUNoQjtzQkFSUjtRQVNDOztJQ1REOzs7Ozs7Ozs7Ozs7OztJQWNBO0lBRUEsSUFBSSxhQUFhLEdBQUcsVUFBUyxDQUFDLEVBQUUsQ0FBQztRQUM3QixhQUFhLEdBQUcsTUFBTSxDQUFDLGNBQWM7YUFDaEMsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLFlBQVksS0FBSyxJQUFJLFVBQVUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDNUUsVUFBVSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQztnQkFBRSxJQUFJLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FB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