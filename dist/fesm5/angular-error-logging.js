import { InjectionToken, Injectable, Optional, Inject, NgModule, ErrorHandler, Injector, defineInjectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { parse } from 'error-stack-parser';
import { __extends } from 'tslib';
import { tap } from 'rxjs/operators';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var JsError = /** @class */ (function () {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
var GLOBALS = new InjectionToken('Global config for error-logging');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var ErrorLoggingService = /** @class */ (function () {
    function ErrorLoggingService(globalConfig, httpClient, locationStrategy) {
        this.globalConfig = globalConfig;
        this.httpClient = httpClient;
        this.locationStrategy = locationStrategy;
        this.endpoint = 'https://dashboard.7dev.nl/api/logs';
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
        var url = this.locationStrategy instanceof PathLocationStrategy ? this.locationStrategy.path() : 'Not applicable';
        /** @type {?} */
        var statusCode = error instanceof HttpErrorResponse ? error.status.toString() : 'Not applicable';
        /** @type {?} */
        var request = req ? JSON.stringify(req) : 'Not applicable';
        /** @type {?} */
        var message = error.message || error.toString() || 'Not defined';
        /** @type {?} */
        var stacktrace = error instanceof HttpErrorResponse ? 'No stack available' : parse(error);
        /** @type {?} */
        var file = error instanceof HttpErrorResponse ? 'Not applicable' : stacktrace[0].fileName;
        /** @type {?} */
        var line = error instanceof HttpErrorResponse ? 'Not applicable' : stacktrace[0].lineNumber;
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
        return this.httpClient.post(this.endpoint, error, {
            headers: {
                'Authorization': 'Bearer ' + this.globalConfig.access_token
            }
        });
    };
    ErrorLoggingService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    /** @nocollapse */
    ErrorLoggingService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [GLOBALS,] }] },
        { type: HttpClient },
        { type: LocationStrategy }
    ]; };
    /** @nocollapse */ ErrorLoggingService.ngInjectableDef = defineInjectable({ factory: function ErrorLoggingService_Factory() { return new ErrorLoggingService(inject(GLOBALS, 8), inject(HttpClient), inject(LocationStrategy)); }, token: ErrorLoggingService, providedIn: "root" });
    return ErrorLoggingService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var ErrorLoggingHandler = /** @class */ (function (_super) {
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
        if (!(error instanceof HttpErrorResponse)) {
            /** @type {?} */
            var errorLoggingService = this.injector.get(ErrorLoggingService);
            errorLoggingService.buildError(error);
        }
        _super.prototype.handleError.call(this, error);
    };
    ErrorLoggingHandler.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ErrorLoggingHandler.ctorParameters = function () { return [
        { type: Injector }
    ]; };
    return ErrorLoggingHandler;
}(ErrorHandler));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Pass untouched request through to the next request handler.
 */
var ErrorLoggingInterceptor = /** @class */ (function () {
    function ErrorLoggingInterceptor(errorLoggingService) {
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
            .pipe(tap(
        // Succeeds when there is a response; ignore other events
        // Succeeds when there is a response; ignore other events
        function (event) {
            if (event instanceof HttpResponse && event.status !== 200 && req.url !== _this.errorLoggingService.endpoint) {
                _this.errorLoggingService.buildError(new Error(event.status + ' !== 200'), req);
            }
        }, 
        // Operation failed; error is an HttpErrorResponse
        // Operation failed; error is an HttpErrorResponse
        function (error) {
            if (req.url !== _this.errorLoggingService.endpoint) {
                _this.errorLoggingService.buildError(error, req);
            }
        }));
    };
    ErrorLoggingInterceptor.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ErrorLoggingInterceptor.ctorParameters = function () { return [
        { type: ErrorLoggingService }
    ]; };
    return ErrorLoggingInterceptor;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var ErrorLoggingModule = /** @class */ (function () {
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
        { type: NgModule, args: [{
                    imports: [],
                    declarations: [],
                    exports: [],
                    providers: [
                        { provide: ErrorHandler, useClass: ErrorLoggingHandler },
                        { provide: HTTP_INTERCEPTORS, useClass: ErrorLoggingInterceptor, multi: true },
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

export { JsError, ErrorLoggingModule, ErrorLoggingHandler as ɵa, ErrorLoggingInterceptor as ɵb, ErrorLoggingService as ɵc, GLOBALS as ɵd };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1lcnJvci1sb2dnaW5nLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9hbmd1bGFyLWVycm9yLWxvZ2dpbmcvbGliL2pzLWVycm9yLnRzIiwibmc6Ly9hbmd1bGFyLWVycm9yLWxvZ2dpbmcvbGliL2dsb2JhbHMudHMiLCJuZzovL2FuZ3VsYXItZXJyb3ItbG9nZ2luZy9saWIvZXJyb3ItbG9nZ2luZy5zZXJ2aWNlLnRzIiwibmc6Ly9hbmd1bGFyLWVycm9yLWxvZ2dpbmcvbGliL2Vycm9yLWxvZ2dpbmcuaGFuZGxlci50cyIsIm5nOi8vYW5ndWxhci1lcnJvci1sb2dnaW5nL2xpYi9lcnJvci1sb2dnaW5nLmludGVyY2VwdG9yLnRzIiwibmc6Ly9hbmd1bGFyLWVycm9yLWxvZ2dpbmcvbGliL2Vycm9yLWxvZ2dpbmcubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBKc0Vycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIHR5cGU6ICdKUyBodHRwJyB8ICdKUyBydW50aW1lJyxcbiAgICAgICAgcHVibGljIHN0YXR1c19jb2RlOiBzdHJpbmcsXG4gICAgICAgIHB1YmxpYyBlcnJvcjogc3RyaW5nLFxuICAgICAgICBwdWJsaWMgZmlsZT86IHN0cmluZyxcbiAgICAgICAgcHVibGljIGxpbmU/OiBzdHJpbmcsXG4gICAgICAgIHB1YmxpYyBzdGFja3RyYWM/OiBzdHJpbmcsXG4gICAgKSB7fVxufVxuIiwiaW1wb3J0IHsgRXJyb3JMb2dnaW5nT3B0aW9ucyB9IGZyb20gJy4vZXJyb3ItbG9nZ2luZy1vcHRpb25zJztcbmltcG9ydCB7IEluamVjdGlvblRva2VuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmV4cG9ydCBjb25zdCBHTE9CQUxTOiBJbmplY3Rpb25Ub2tlbjxFcnJvckxvZ2dpbmdPcHRpb25zPiA9IG5ldyBJbmplY3Rpb25Ub2tlbignR2xvYmFsIGNvbmZpZyBmb3IgZXJyb3ItbG9nZ2luZycpO1xuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT3B0aW9uYWwsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cFJlcXVlc3QsIEh0dHBFcnJvclJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgTG9jYXRpb25TdHJhdGVneSwgUGF0aExvY2F0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0ICogYXMgU3RhY2tUcmFjZVBhcnNlciBmcm9tICdlcnJvci1zdGFjay1wYXJzZXInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBFcnJvckxvZ2dpbmdPcHRpb25zIH0gZnJvbSAnLi9lcnJvci1sb2dnaW5nLW9wdGlvbnMnO1xuaW1wb3J0IHsgR0xPQkFMUyB9IGZyb20gJy4vZ2xvYmFscyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5cbmV4cG9ydCBjbGFzcyBFcnJvckxvZ2dpbmdTZXJ2aWNlIHtcblxuICAgIHB1YmxpYyBlbmRwb2ludCA9ICdodHRwczovL2Rhc2hib2FyZC43ZGV2Lm5sL2FwaS9sb2dzJztcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KEdMT0JBTFMpIHByaXZhdGUgZ2xvYmFsQ29uZmlnOiBFcnJvckxvZ2dpbmdPcHRpb25zLFxuICAgICAgICBwcml2YXRlIGh0dHBDbGllbnQ6IEh0dHBDbGllbnQsXG4gICAgICAgIHByaXZhdGUgbG9jYXRpb25TdHJhdGVneTogTG9jYXRpb25TdHJhdGVneSxcbiAgICApIHt9XG5cbiAgICBidWlsZEVycm9yKGVycm9yLCByZXE/OiBIdHRwUmVxdWVzdDxhbnk+KSB7XG5cbiAgICAgICAgY29uc3QgYXBwSWQgPSB0aGlzLmdsb2JhbENvbmZpZy5hcHBJZDtcbiAgICAgICAgY29uc3QgZW52ID0gdGhpcy5nbG9iYWxDb25maWcuZW52aXJvbm1lbnQ7XG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMubG9jYXRpb25TdHJhdGVneSBpbnN0YW5jZW9mIFBhdGhMb2NhdGlvblN0cmF0ZWd5ID8gdGhpcy5sb2NhdGlvblN0cmF0ZWd5LnBhdGgoKSA6ICdOb3QgYXBwbGljYWJsZSc7XG4gICAgICAgIGNvbnN0IHN0YXR1c0NvZGUgPSBlcnJvciBpbnN0YW5jZW9mIEh0dHBFcnJvclJlc3BvbnNlID8gZXJyb3Iuc3RhdHVzLnRvU3RyaW5nKCkgOiAnTm90IGFwcGxpY2FibGUnO1xuICAgICAgICBjb25zdCByZXF1ZXN0ID0gcmVxID8gSlNPTi5zdHJpbmdpZnkocmVxKSA6ICdOb3QgYXBwbGljYWJsZSc7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBlcnJvci5tZXNzYWdlIHx8IGVycm9yLnRvU3RyaW5nKCkgfHwgJ05vdCBkZWZpbmVkJztcbiAgICAgICAgY29uc3Qgc3RhY2t0cmFjZTogYW55ID0gZXJyb3IgaW5zdGFuY2VvZiBIdHRwRXJyb3JSZXNwb25zZSA/ICdObyBzdGFjayBhdmFpbGFibGUnIDogU3RhY2tUcmFjZVBhcnNlci5wYXJzZShlcnJvcik7XG4gICAgICAgIGNvbnN0IGZpbGUgPSBlcnJvciBpbnN0YW5jZW9mIEh0dHBFcnJvclJlc3BvbnNlID8gJ05vdCBhcHBsaWNhYmxlJyA6IHN0YWNrdHJhY2VbMF0uZmlsZU5hbWU7XG4gICAgICAgIGNvbnN0IGxpbmUgPSBlcnJvciBpbnN0YW5jZW9mIEh0dHBFcnJvclJlc3BvbnNlID8gJ05vdCBhcHBsaWNhYmxlJyA6IHN0YWNrdHJhY2VbMF0ubGluZU51bWJlcjtcblxuICAgICAgICBjb25zdCBlcnJvclRvU2VuZCA9IHtcbiAgICAgICAgICAgIHR5cGU6ICdKUycsXG4gICAgICAgICAgICBhcHBJZCxcbiAgICAgICAgICAgIGVudixcbiAgICAgICAgICAgIHVybCxcbiAgICAgICAgICAgIHN0YXR1c19jb2RlOiBzdGF0dXNDb2RlLFxuICAgICAgICAgICAgcmVxdWVzdCxcbiAgICAgICAgICAgIGVycm9yOiBtZXNzYWdlLFxuICAgICAgICAgICAgZmlsZSxcbiAgICAgICAgICAgIGxpbmUsXG4gICAgICAgICAgICBzdGFja3RyYWNlOiBKU09OLnN0cmluZ2lmeShzdGFja3RyYWNlKSxcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLnJlcG9ydEVycm9yKGVycm9yVG9TZW5kKS5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICByZXBvcnRFcnJvcihlcnJvcik6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBDbGllbnQucG9zdCh0aGlzLmVuZHBvaW50LCBlcnJvciwge1xuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogJ0JlYXJlciAnICsgdGhpcy5nbG9iYWxDb25maWcuYWNjZXNzX3Rva2VuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEVycm9ySGFuZGxlciwgSW5qZWN0YWJsZSwgSW5qZWN0b3IgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBFcnJvclJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuXG5pbXBvcnQgeyBFcnJvckxvZ2dpbmdTZXJ2aWNlIH0gZnJvbSAnLi9lcnJvci1sb2dnaW5nLnNlcnZpY2UnO1xuXG4vLyBvdXIgZ2xvYmFsIGVycm9yIGhhbmRsZXJcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBFcnJvckxvZ2dpbmdIYW5kbGVyIGV4dGVuZHMgRXJyb3JIYW5kbGVyIHtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvcixcbiAgICApIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICBoYW5kbGVFcnJvcihlcnJvcikge1xuICAgICAgICBpZiAoIShlcnJvciBpbnN0YW5jZW9mIEh0dHBFcnJvclJlc3BvbnNlKSkge1xuICAgICAgICAgICAgY29uc3QgZXJyb3JMb2dnaW5nU2VydmljZSA9IHRoaXMuaW5qZWN0b3IuZ2V0KEVycm9yTG9nZ2luZ1NlcnZpY2UpO1xuICAgICAgICAgICAgZXJyb3JMb2dnaW5nU2VydmljZS5idWlsZEVycm9yKGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICBzdXBlci5oYW5kbGVFcnJvcihlcnJvcik7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwRXZlbnQsIEh0dHBJbnRlcmNlcHRvciwgSHR0cEhhbmRsZXIsIEh0dHBSZXF1ZXN0LCBIdHRwUmVzcG9uc2UsIEh0dHBFcnJvclJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBFcnJvckxvZ2dpbmdTZXJ2aWNlIH0gZnJvbSAnLi9lcnJvci1sb2dnaW5nLnNlcnZpY2UnO1xuXG4vKiogUGFzcyB1bnRvdWNoZWQgcmVxdWVzdCB0aHJvdWdoIHRvIHRoZSBuZXh0IHJlcXVlc3QgaGFuZGxlci4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBFcnJvckxvZ2dpbmdJbnRlcmNlcHRvciBpbXBsZW1lbnRzIEh0dHBJbnRlcmNlcHRvciB7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBlcnJvckxvZ2dpbmdTZXJ2aWNlOiBFcnJvckxvZ2dpbmdTZXJ2aWNlLFxuICAgICkge1xuICAgIH1cblxuICAgIGludGVyY2VwdChyZXE6IEh0dHBSZXF1ZXN0PGFueT4sIG5leHQ6IEh0dHBIYW5kbGVyKTogT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8YW55Pj4ge1xuICAgICAgICByZXR1cm4gbmV4dC5oYW5kbGUocmVxKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICAgIHRhcChcbiAgICAgICAgICAgICAgICAvLyBTdWNjZWVkcyB3aGVuIHRoZXJlIGlzIGEgcmVzcG9uc2U7IGlnbm9yZSBvdGhlciBldmVudHNcbiAgICAgICAgICAgICAgICAoZXZlbnQ6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiBIdHRwUmVzcG9uc2UgJiYgZXZlbnQuc3RhdHVzICE9PSAyMDAgJiYgcmVxLnVybCAhPT0gdGhpcy5lcnJvckxvZ2dpbmdTZXJ2aWNlLmVuZHBvaW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVycm9yTG9nZ2luZ1NlcnZpY2UuYnVpbGRFcnJvcihuZXcgRXJyb3IoZXZlbnQuc3RhdHVzICsgJyAhPT0gMjAwJyksIHJlcSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIC8vIE9wZXJhdGlvbiBmYWlsZWQ7IGVycm9yIGlzIGFuIEh0dHBFcnJvclJlc3BvbnNlXG4gICAgICAgICAgICAgICAgKGVycm9yOiBIdHRwRXJyb3JSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVxLnVybCAhPT0gdGhpcy5lcnJvckxvZ2dpbmdTZXJ2aWNlLmVuZHBvaW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVycm9yTG9nZ2luZ1NlcnZpY2UuYnVpbGRFcnJvcihlcnJvciwgcmVxKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycywgRXJyb3JIYW5kbGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIVFRQX0lOVEVSQ0VQVE9SUyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcblxuaW1wb3J0IHsgRXJyb3JMb2dnaW5nT3B0aW9ucyB9IGZyb20gJy4vZXJyb3ItbG9nZ2luZy1vcHRpb25zJztcbmltcG9ydCB7IEVycm9yTG9nZ2luZ0hhbmRsZXIgfSBmcm9tICcuL2Vycm9yLWxvZ2dpbmcuaGFuZGxlcic7XG5pbXBvcnQgeyBFcnJvckxvZ2dpbmdJbnRlcmNlcHRvciB9IGZyb20gJy4vZXJyb3ItbG9nZ2luZy5pbnRlcmNlcHRvcic7XG5pbXBvcnQgeyBFcnJvckxvZ2dpbmdTZXJ2aWNlIH0gZnJvbSAnLi9lcnJvci1sb2dnaW5nLnNlcnZpY2UnO1xuaW1wb3J0IHsgR0xPQkFMUyB9IGZyb20gJy4vZ2xvYmFscyc7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW10sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgeyBwcm92aWRlOiBFcnJvckhhbmRsZXIsIHVzZUNsYXNzOiBFcnJvckxvZ2dpbmdIYW5kbGVyIH0sXG4gICAgICAgIHsgcHJvdmlkZTogSFRUUF9JTlRFUkNFUFRPUlMsIHVzZUNsYXNzOiBFcnJvckxvZ2dpbmdJbnRlcmNlcHRvciwgbXVsdGk6IHRydWUgfSxcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIEVycm9yTG9nZ2luZ01vZHVsZSB7XG4gICAgc3RhdGljIGZvclJvb3QoZ2xvYmFsT3B0aW9uczogRXJyb3JMb2dnaW5nT3B0aW9ucyk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmdNb2R1bGU6IEVycm9yTG9nZ2luZ01vZHVsZSxcbiAgICAgICAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICAgICAgICAgIEVycm9yTG9nZ2luZ1NlcnZpY2UsXG4gICAgICAgICAgICAgICAgeyBwcm92aWRlOiBHTE9CQUxTLCB1c2VWYWx1ZTogZ2xvYmFsT3B0aW9ucyB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG4gICAgfVxufVxuIl0sIm5hbWVzIjpbIlN0YWNrVHJhY2VQYXJzZXIucGFyc2UiLCJ0c2xpYl8xLl9fZXh0ZW5kcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxJQUFBO0lBQ0ksaUJBQ1csTUFDQSxhQUNBLE9BQ0EsTUFDQSxNQUNBO1FBTEEsU0FBSSxHQUFKLElBQUk7UUFDSixnQkFBVyxHQUFYLFdBQVc7UUFDWCxVQUFLLEdBQUwsS0FBSztRQUNMLFNBQUksR0FBSixJQUFJO1FBQ0osU0FBSSxHQUFKLElBQUk7UUFDSixjQUFTLEdBQVQsU0FBUztLQUNoQjtrQkFSUjtJQVNDOzs7Ozs7QUNSRDtBQUVBLElBQWEsT0FBTyxHQUF3QyxJQUFJLGNBQWMsQ0FBQyxpQ0FBaUMsQ0FBQzs7Ozs7O0FDSGpIO0lBaUJJLDZCQUN5QyxZQUFpQyxFQUM5RCxZQUNBO1FBRjZCLGlCQUFZLEdBQVosWUFBWSxDQUFxQjtRQUM5RCxlQUFVLEdBQVYsVUFBVTtRQUNWLHFCQUFnQixHQUFoQixnQkFBZ0I7d0JBTFYsb0NBQW9DO0tBTWxEOzs7Ozs7SUFFSix3Q0FBVTs7Ozs7SUFBVixVQUFXLEtBQUssRUFBRSxHQUFzQjs7UUFFcEMsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUM7O1FBQ3RDLElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDOztRQUMxQyxJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLFlBQVksb0JBQW9CLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxHQUFHLGdCQUFnQixDQUFDOztRQUNwSCxJQUFNLFVBQVUsR0FBRyxLQUFLLFlBQVksaUJBQWlCLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsR0FBRyxnQkFBZ0IsQ0FBQzs7UUFDbkcsSUFBTSxPQUFPLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcs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