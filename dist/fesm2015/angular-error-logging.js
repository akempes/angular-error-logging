import { InjectionToken, Injectable, Optional, Inject, ErrorHandler, Injector, NgModule, defineInjectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { parse } from 'error-stack-parser';
import { tap } from 'rxjs/operators';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class JsError {
    /**
     * @param {?} type
     * @param {?} status_code
     * @param {?} error
     * @param {?=} file
     * @param {?=} line
     * @param {?=} stacktrac
     */
    constructor(type, status_code, error, file, line, stacktrac) {
        this.type = type;
        this.status_code = status_code;
        this.error = error;
        this.file = file;
        this.line = line;
        this.stacktrac = stacktrac;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const GLOBALS = new InjectionToken('Global config for error-logging');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class ErrorLoggingService {
    /**
     * @param {?} globalConfig
     * @param {?} httpClient
     * @param {?} locationStrategy
     */
    constructor(globalConfig, httpClient, locationStrategy) {
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
    buildError(error, req) {
        /** @type {?} */
        const appId = this.globalConfig.appId;
        /** @type {?} */
        const env = this.globalConfig.environment;
        /** @type {?} */
        const url = this.locationStrategy instanceof PathLocationStrategy ? this.locationStrategy.path() : 'Not applicable';
        /** @type {?} */
        const statusCode = error instanceof HttpErrorResponse ? error.status.toString() : 'Not applicable';
        /** @type {?} */
        const request = req ? JSON.stringify(req) : 'Not applicable';
        /** @type {?} */
        const message = error.message || error.toString() || 'Not defined';
        /** @type {?} */
        const stacktrace = error instanceof HttpErrorResponse ? 'No stack available' : parse(error);
        /** @type {?} */
        const file = error instanceof HttpErrorResponse ? 'Not applicable' : stacktrace[0].fileName;
        /** @type {?} */
        const line = error instanceof HttpErrorResponse ? 'Not applicable' : stacktrace[0].lineNumber;
        /** @type {?} */
        const errorToSend = {
            type: 'JS',
            appId,
            env,
            url,
            status_code: statusCode,
            request,
            error: message,
            file,
            line,
            stacktrace: JSON.stringify(stacktrace),
        };
        this.reportError(errorToSend).subscribe();
    }
    /**
     * @param {?} error
     * @return {?}
     */
    reportError(error) {
        return this.httpClient.post(this.endpoint, error, {
            headers: {
                'Authorization': 'Bearer ' + this.globalConfig.access_token
            }
        });
    }
}
ErrorLoggingService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
/** @nocollapse */
ErrorLoggingService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [GLOBALS,] }] },
    { type: HttpClient },
    { type: LocationStrategy }
];
/** @nocollapse */ ErrorLoggingService.ngInjectableDef = defineInjectable({ factory: function ErrorLoggingService_Factory() { return new ErrorLoggingService(inject(GLOBALS, 8), inject(HttpClient), inject(LocationStrategy)); }, token: ErrorLoggingService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class ErrorLoggingHandler extends ErrorHandler {
    /**
     * @param {?} injector
     */
    constructor(injector) {
        super();
        this.injector = injector;
    }
    /**
     * @param {?} error
     * @return {?}
     */
    handleError(error) {
        if (!(error instanceof HttpErrorResponse)) {
            /** @type {?} */
            const errorLoggingService = this.injector.get(ErrorLoggingService);
            errorLoggingService.buildError(error);
        }
        super.handleError(error);
    }
}
ErrorLoggingHandler.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ErrorLoggingHandler.ctorParameters = () => [
    { type: Injector }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Pass untouched request through to the next request handler.
 */
class ErrorLoggingInterceptor {
    /**
     * @param {?} errorLoggingService
     */
    constructor(errorLoggingService) {
        this.errorLoggingService = errorLoggingService;
    }
    /**
     * @param {?} req
     * @param {?} next
     * @return {?}
     */
    intercept(req, next) {
        return next.handle(req)
            .pipe(tap(
        // Succeeds when there is a response; ignore other events
        (event) => {
            if (event instanceof HttpResponse && event.status !== 200 && req.url !== this.errorLoggingService.endpoint) {
                this.errorLoggingService.buildError(new Error(event.status + ' !== 200'), req);
            }
        }, 
        // Operation failed; error is an HttpErrorResponse
        (error) => {
            if (req.url !== this.errorLoggingService.endpoint) {
                this.errorLoggingService.buildError(error, req);
            }
        }));
    }
}
ErrorLoggingInterceptor.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ErrorLoggingInterceptor.ctorParameters = () => [
    { type: ErrorLoggingService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class ErrorLoggingModule {
    /**
     * @param {?} globalOptions
     * @return {?}
     */
    static forRoot(globalOptions) {
        return {
            ngModule: ErrorLoggingModule,
            providers: [
                ErrorLoggingService,
                { provide: GLOBALS, useValue: globalOptions }
            ]
        };
    }
}
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { JsError, ErrorLoggingModule, ErrorLoggingHandler as ɵa, ErrorLoggingInterceptor as ɵb, ErrorLoggingService as ɵc, GLOBALS as ɵd };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1lcnJvci1sb2dnaW5nLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9hbmd1bGFyLWVycm9yLWxvZ2dpbmcvbGliL2pzLWVycm9yLnRzIiwibmc6Ly9hbmd1bGFyLWVycm9yLWxvZ2dpbmcvbGliL2dsb2JhbHMudHMiLCJuZzovL2FuZ3VsYXItZXJyb3ItbG9nZ2luZy9saWIvZXJyb3ItbG9nZ2luZy5zZXJ2aWNlLnRzIiwibmc6Ly9hbmd1bGFyLWVycm9yLWxvZ2dpbmcvbGliL2Vycm9yLWxvZ2dpbmcuaGFuZGxlci50cyIsIm5nOi8vYW5ndWxhci1lcnJvci1sb2dnaW5nL2xpYi9lcnJvci1sb2dnaW5nLmludGVyY2VwdG9yLnRzIiwibmc6Ly9hbmd1bGFyLWVycm9yLWxvZ2dpbmcvbGliL2Vycm9yLWxvZ2dpbmcubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBKc0Vycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIHR5cGU6ICdKUyBodHRwJyB8ICdKUyBydW50aW1lJyxcbiAgICAgICAgcHVibGljIHN0YXR1c19jb2RlOiBzdHJpbmcsXG4gICAgICAgIHB1YmxpYyBlcnJvcjogc3RyaW5nLFxuICAgICAgICBwdWJsaWMgZmlsZT86IHN0cmluZyxcbiAgICAgICAgcHVibGljIGxpbmU/OiBzdHJpbmcsXG4gICAgICAgIHB1YmxpYyBzdGFja3RyYWM/OiBzdHJpbmcsXG4gICAgKSB7fVxufVxuIiwiaW1wb3J0IHsgRXJyb3JMb2dnaW5nT3B0aW9ucyB9IGZyb20gJy4vZXJyb3ItbG9nZ2luZy1vcHRpb25zJztcbmltcG9ydCB7IEluamVjdGlvblRva2VuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmV4cG9ydCBjb25zdCBHTE9CQUxTOiBJbmplY3Rpb25Ub2tlbjxFcnJvckxvZ2dpbmdPcHRpb25zPiA9IG5ldyBJbmplY3Rpb25Ub2tlbignR2xvYmFsIGNvbmZpZyBmb3IgZXJyb3ItbG9nZ2luZycpO1xuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT3B0aW9uYWwsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cFJlcXVlc3QsIEh0dHBFcnJvclJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgTG9jYXRpb25TdHJhdGVneSwgUGF0aExvY2F0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0ICogYXMgU3RhY2tUcmFjZVBhcnNlciBmcm9tICdlcnJvci1zdGFjay1wYXJzZXInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBFcnJvckxvZ2dpbmdPcHRpb25zIH0gZnJvbSAnLi9lcnJvci1sb2dnaW5nLW9wdGlvbnMnO1xuaW1wb3J0IHsgR0xPQkFMUyB9IGZyb20gJy4vZ2xvYmFscyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5cbmV4cG9ydCBjbGFzcyBFcnJvckxvZ2dpbmdTZXJ2aWNlIHtcblxuICAgIHB1YmxpYyBlbmRwb2ludCA9ICdodHRwczovL2Rhc2hib2FyZC43ZGV2Lm5sL2FwaS9sb2dzJztcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KEdMT0JBTFMpIHByaXZhdGUgZ2xvYmFsQ29uZmlnOiBFcnJvckxvZ2dpbmdPcHRpb25zLFxuICAgICAgICBwcml2YXRlIGh0dHBDbGllbnQ6IEh0dHBDbGllbnQsXG4gICAgICAgIHByaXZhdGUgbG9jYXRpb25TdHJhdGVneTogTG9jYXRpb25TdHJhdGVneSxcbiAgICApIHt9XG5cbiAgICBidWlsZEVycm9yKGVycm9yLCByZXE/OiBIdHRwUmVxdWVzdDxhbnk+KSB7XG5cbiAgICAgICAgY29uc3QgYXBwSWQgPSB0aGlzLmdsb2JhbENvbmZpZy5hcHBJZDtcbiAgICAgICAgY29uc3QgZW52ID0gdGhpcy5nbG9iYWxDb25maWcuZW52aXJvbm1lbnQ7XG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMubG9jYXRpb25TdHJhdGVneSBpbnN0YW5jZW9mIFBhdGhMb2NhdGlvblN0cmF0ZWd5ID8gdGhpcy5sb2NhdGlvblN0cmF0ZWd5LnBhdGgoKSA6ICdOb3QgYXBwbGljYWJsZSc7XG4gICAgICAgIGNvbnN0IHN0YXR1c0NvZGUgPSBlcnJvciBpbnN0YW5jZW9mIEh0dHBFcnJvclJlc3BvbnNlID8gZXJyb3Iuc3RhdHVzLnRvU3RyaW5nKCkgOiAnTm90IGFwcGxpY2FibGUnO1xuICAgICAgICBjb25zdCByZXF1ZXN0ID0gcmVxID8gSlNPTi5zdHJpbmdpZnkocmVxKSA6ICdOb3QgYXBwbGljYWJsZSc7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBlcnJvci5tZXNzYWdlIHx8IGVycm9yLnRvU3RyaW5nKCkgfHwgJ05vdCBkZWZpbmVkJztcbiAgICAgICAgY29uc3Qgc3RhY2t0cmFjZTogYW55ID0gZXJyb3IgaW5zdGFuY2VvZiBIdHRwRXJyb3JSZXNwb25zZSA/ICdObyBzdGFjayBhdmFpbGFibGUnIDogU3RhY2tUcmFjZVBhcnNlci5wYXJzZShlcnJvcik7XG4gICAgICAgIGNvbnN0IGZpbGUgPSBlcnJvciBpbnN0YW5jZW9mIEh0dHBFcnJvclJlc3BvbnNlID8gJ05vdCBhcHBsaWNhYmxlJyA6IHN0YWNrdHJhY2VbMF0uZmlsZU5hbWU7XG4gICAgICAgIGNvbnN0IGxpbmUgPSBlcnJvciBpbnN0YW5jZW9mIEh0dHBFcnJvclJlc3BvbnNlID8gJ05vdCBhcHBsaWNhYmxlJyA6IHN0YWNrdHJhY2VbMF0ubGluZU51bWJlcjtcblxuICAgICAgICBjb25zdCBlcnJvclRvU2VuZCA9IHtcbiAgICAgICAgICAgIHR5cGU6ICdKUycsXG4gICAgICAgICAgICBhcHBJZCxcbiAgICAgICAgICAgIGVudixcbiAgICAgICAgICAgIHVybCxcbiAgICAgICAgICAgIHN0YXR1c19jb2RlOiBzdGF0dXNDb2RlLFxuICAgICAgICAgICAgcmVxdWVzdCxcbiAgICAgICAgICAgIGVycm9yOiBtZXNzYWdlLFxuICAgICAgICAgICAgZmlsZSxcbiAgICAgICAgICAgIGxpbmUsXG4gICAgICAgICAgICBzdGFja3RyYWNlOiBKU09OLnN0cmluZ2lmeShzdGFja3RyYWNlKSxcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLnJlcG9ydEVycm9yKGVycm9yVG9TZW5kKS5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICByZXBvcnRFcnJvcihlcnJvcik6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBDbGllbnQucG9zdCh0aGlzLmVuZHBvaW50LCBlcnJvciwge1xuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogJ0JlYXJlciAnICsgdGhpcy5nbG9iYWxDb25maWcuYWNjZXNzX3Rva2VuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEVycm9ySGFuZGxlciwgSW5qZWN0YWJsZSwgSW5qZWN0b3IgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBFcnJvclJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuXG5pbXBvcnQgeyBFcnJvckxvZ2dpbmdTZXJ2aWNlIH0gZnJvbSAnLi9lcnJvci1sb2dnaW5nLnNlcnZpY2UnO1xuXG4vLyBvdXIgZ2xvYmFsIGVycm9yIGhhbmRsZXJcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBFcnJvckxvZ2dpbmdIYW5kbGVyIGV4dGVuZHMgRXJyb3JIYW5kbGVyIHtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvcixcbiAgICApIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICBoYW5kbGVFcnJvcihlcnJvcikge1xuICAgICAgICBpZiAoIShlcnJvciBpbnN0YW5jZW9mIEh0dHBFcnJvclJlc3BvbnNlKSkge1xuICAgICAgICAgICAgY29uc3QgZXJyb3JMb2dnaW5nU2VydmljZSA9IHRoaXMuaW5qZWN0b3IuZ2V0KEVycm9yTG9nZ2luZ1NlcnZpY2UpO1xuICAgICAgICAgICAgZXJyb3JMb2dnaW5nU2VydmljZS5idWlsZEVycm9yKGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICBzdXBlci5oYW5kbGVFcnJvcihlcnJvcik7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwRXZlbnQsIEh0dHBJbnRlcmNlcHRvciwgSHR0cEhhbmRsZXIsIEh0dHBSZXF1ZXN0LCBIdHRwUmVzcG9uc2UsIEh0dHBFcnJvclJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBFcnJvckxvZ2dpbmdTZXJ2aWNlIH0gZnJvbSAnLi9lcnJvci1sb2dnaW5nLnNlcnZpY2UnO1xuXG4vKiogUGFzcyB1bnRvdWNoZWQgcmVxdWVzdCB0aHJvdWdoIHRvIHRoZSBuZXh0IHJlcXVlc3QgaGFuZGxlci4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBFcnJvckxvZ2dpbmdJbnRlcmNlcHRvciBpbXBsZW1lbnRzIEh0dHBJbnRlcmNlcHRvciB7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBlcnJvckxvZ2dpbmdTZXJ2aWNlOiBFcnJvckxvZ2dpbmdTZXJ2aWNlLFxuICAgICkge1xuICAgIH1cblxuICAgIGludGVyY2VwdChyZXE6IEh0dHBSZXF1ZXN0PGFueT4sIG5leHQ6IEh0dHBIYW5kbGVyKTogT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8YW55Pj4ge1xuICAgICAgICByZXR1cm4gbmV4dC5oYW5kbGUocmVxKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICAgIHRhcChcbiAgICAgICAgICAgICAgICAvLyBTdWNjZWVkcyB3aGVuIHRoZXJlIGlzIGEgcmVzcG9uc2U7IGlnbm9yZSBvdGhlciBldmVudHNcbiAgICAgICAgICAgICAgICAoZXZlbnQ6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiBIdHRwUmVzcG9uc2UgJiYgZXZlbnQuc3RhdHVzICE9PSAyMDAgJiYgcmVxLnVybCAhPT0gdGhpcy5lcnJvckxvZ2dpbmdTZXJ2aWNlLmVuZHBvaW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVycm9yTG9nZ2luZ1NlcnZpY2UuYnVpbGRFcnJvcihuZXcgRXJyb3IoZXZlbnQuc3RhdHVzICsgJyAhPT0gMjAwJyksIHJlcSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIC8vIE9wZXJhdGlvbiBmYWlsZWQ7IGVycm9yIGlzIGFuIEh0dHBFcnJvclJlc3BvbnNlXG4gICAgICAgICAgICAgICAgKGVycm9yOiBIdHRwRXJyb3JSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVxLnVybCAhPT0gdGhpcy5lcnJvckxvZ2dpbmdTZXJ2aWNlLmVuZHBvaW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVycm9yTG9nZ2luZ1NlcnZpY2UuYnVpbGRFcnJvcihlcnJvciwgcmVxKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycywgRXJyb3JIYW5kbGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIVFRQX0lOVEVSQ0VQVE9SUyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcblxuaW1wb3J0IHsgRXJyb3JMb2dnaW5nT3B0aW9ucyB9IGZyb20gJy4vZXJyb3ItbG9nZ2luZy1vcHRpb25zJztcbmltcG9ydCB7IEVycm9yTG9nZ2luZ0hhbmRsZXIgfSBmcm9tICcuL2Vycm9yLWxvZ2dpbmcuaGFuZGxlcic7XG5pbXBvcnQgeyBFcnJvckxvZ2dpbmdJbnRlcmNlcHRvciB9IGZyb20gJy4vZXJyb3ItbG9nZ2luZy5pbnRlcmNlcHRvcic7XG5pbXBvcnQgeyBFcnJvckxvZ2dpbmdTZXJ2aWNlIH0gZnJvbSAnLi9lcnJvci1sb2dnaW5nLnNlcnZpY2UnO1xuaW1wb3J0IHsgR0xPQkFMUyB9IGZyb20gJy4vZ2xvYmFscyc7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW10sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgeyBwcm92aWRlOiBFcnJvckhhbmRsZXIsIHVzZUNsYXNzOiBFcnJvckxvZ2dpbmdIYW5kbGVyIH0sXG4gICAgICAgIHsgcHJvdmlkZTogSFRUUF9JTlRFUkNFUFRPUlMsIHVzZUNsYXNzOiBFcnJvckxvZ2dpbmdJbnRlcmNlcHRvciwgbXVsdGk6IHRydWUgfSxcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIEVycm9yTG9nZ2luZ01vZHVsZSB7XG4gICAgc3RhdGljIGZvclJvb3QoZ2xvYmFsT3B0aW9uczogRXJyb3JMb2dnaW5nT3B0aW9ucyk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmdNb2R1bGU6IEVycm9yTG9nZ2luZ01vZHVsZSxcbiAgICAgICAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICAgICAgICAgIEVycm9yTG9nZ2luZ1NlcnZpY2UsXG4gICAgICAgICAgICAgICAgeyBwcm92aWRlOiBHTE9CQUxTLCB1c2VWYWx1ZTogZ2xvYmFsT3B0aW9ucyB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG4gICAgfVxufVxuIl0sIm5hbWVzIjpbIlN0YWNrVHJhY2VQYXJzZXIucGFyc2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7O0lBQ0ksWUFDVyxNQUNBLGFBQ0EsT0FDQSxNQUNBLE1BQ0E7UUFMQSxTQUFJLEdBQUosSUFBSTtRQUNKLGdCQUFXLEdBQVgsV0FBVztRQUNYLFVBQUssR0FBTCxLQUFLO1FBQ0wsU0FBSSxHQUFKLElBQUk7UUFDSixTQUFJLEdBQUosSUFBSTtRQUNKLGNBQVMsR0FBVCxTQUFTO0tBQ2hCO0NBQ1A7Ozs7OztBQ1JEO0FBRUEsTUFBYSxPQUFPLEdBQXdDLElBQUksY0FBYyxDQUFDLGlDQUFpQyxDQUFDOzs7Ozs7QUNIakg7Ozs7OztJQWlCSSxZQUN5QyxZQUFpQyxFQUM5RCxZQUNBO1FBRjZCLGlCQUFZLEdBQVosWUFBWSxDQUFxQjtRQUM5RCxlQUFVLEdBQVYsVUFBVTtRQUNWLHFCQUFnQixHQUFoQixnQkFBZ0I7d0JBTFYsb0NBQW9DO0tBTWxEOzs7Ozs7SUFFSixVQUFVLENBQUMsS0FBSyxFQUFFLEdBQXNCOztRQUVwQyxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQzs7UUFDdEMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUM7O1FBQzFDLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsWUFBWSxvQkFBb0IsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLEdBQUcsZ0JBQWdCLENBQUM7O1FBQ3BILE1BQU0sVUFBVSxHQUFHLEtBQUssWUFBWSxpQkFBaUIsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxHQUFHLGdCQUFnQixDQUFDOztRQUNuRyxNQUFNLE9BQU8sR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxnQkFBZ0IsQ0FBQzs7UUFDN0QsTUFBTSxPQUFPLEdB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