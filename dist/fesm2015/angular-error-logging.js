import { InjectionToken, Injectable, Optional, Inject, ErrorHandler, Injector, NgModule, defineInjectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { parse } from 'error-stack-parser';
import { tap } from 'rxjs/operators';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class ErrorLoggingOptions {
    constructor() {
        this.endpoint = 'https://dashboard.7dev.nl/api/logs';
    }
}

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
        return this.httpClient.post(this.globalConfig.endpoint, error, {
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
    { type: ErrorLoggingOptions, decorators: [{ type: Optional }, { type: Inject, args: [GLOBALS,] }] },
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
     * @param {?} globalConfig
     * @param {?} errorLoggingService
     */
    constructor(globalConfig, errorLoggingService) {
        this.globalConfig = globalConfig;
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
            if (event instanceof HttpResponse && event.status !== 200 && event.status !== 401 && event.status !== 403 && req.url !== this.globalConfig.endpoint) {
                this.errorLoggingService.buildError(new Error(event.status + ' !== 200'), req);
            }
        }, 
        // Operation failed; error is an HttpErrorResponse
        (error) => {
            if (req.url !== this.globalConfig.endpoint && error.status !== 401 && error.status !== 403) {
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
    { type: ErrorLoggingOptions, decorators: [{ type: Optional }, { type: Inject, args: [GLOBALS,] }] },
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

export { ErrorLoggingOptions, JsError, ErrorLoggingModule, ErrorLoggingHandler as ɵa, ErrorLoggingInterceptor as ɵb, ErrorLoggingService as ɵd, GLOBALS as ɵc };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1lcnJvci1sb2dnaW5nLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9hbmd1bGFyLWVycm9yLWxvZ2dpbmcvbGliL2Vycm9yLWxvZ2dpbmctb3B0aW9ucy50cyIsIm5nOi8vYW5ndWxhci1lcnJvci1sb2dnaW5nL2xpYi9qcy1lcnJvci50cyIsIm5nOi8vYW5ndWxhci1lcnJvci1sb2dnaW5nL2xpYi9nbG9iYWxzLnRzIiwibmc6Ly9hbmd1bGFyLWVycm9yLWxvZ2dpbmcvbGliL2Vycm9yLWxvZ2dpbmcuc2VydmljZS50cyIsIm5nOi8vYW5ndWxhci1lcnJvci1sb2dnaW5nL2xpYi9lcnJvci1sb2dnaW5nLmhhbmRsZXIudHMiLCJuZzovL2FuZ3VsYXItZXJyb3ItbG9nZ2luZy9saWIvZXJyb3ItbG9nZ2luZy5pbnRlcmNlcHRvci50cyIsIm5nOi8vYW5ndWxhci1lcnJvci1sb2dnaW5nL2xpYi9lcnJvci1sb2dnaW5nLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgRXJyb3JMb2dnaW5nT3B0aW9ucyB7XG4gICAgYXBwSWQ6IHN0cmluZztcbiAgICBhY2Nlc3NfdG9rZW46IHN0cmluZztcbiAgICBlbnZpcm9ubWVudDogYW55O1xuICAgIGVuZHBvaW50OiBzdHJpbmcgPSAnaHR0cHM6Ly9kYXNoYm9hcmQuN2Rldi5ubC9hcGkvbG9ncyc7XG59XG4iLCJleHBvcnQgY2xhc3MgSnNFcnJvciB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyB0eXBlOiAnSlMgaHR0cCcgfCAnSlMgcnVudGltZScsXG4gICAgICAgIHB1YmxpYyBzdGF0dXNfY29kZTogc3RyaW5nLFxuICAgICAgICBwdWJsaWMgZXJyb3I6IHN0cmluZyxcbiAgICAgICAgcHVibGljIGZpbGU/OiBzdHJpbmcsXG4gICAgICAgIHB1YmxpYyBsaW5lPzogc3RyaW5nLFxuICAgICAgICBwdWJsaWMgc3RhY2t0cmFjPzogc3RyaW5nLFxuICAgICkge31cbn1cbiIsImltcG9ydCB7IEVycm9yTG9nZ2luZ09wdGlvbnMgfSBmcm9tICcuL2Vycm9yLWxvZ2dpbmctb3B0aW9ucyc7XG5pbXBvcnQgeyBJbmplY3Rpb25Ub2tlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5leHBvcnQgY29uc3QgR0xPQkFMUzogSW5qZWN0aW9uVG9rZW48RXJyb3JMb2dnaW5nT3B0aW9ucz4gPSBuZXcgSW5qZWN0aW9uVG9rZW4oJ0dsb2JhbCBjb25maWcgZm9yIGVycm9yLWxvZ2dpbmcnKTtcbiIsImltcG9ydCB7IEluamVjdGFibGUsIE9wdGlvbmFsLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBSZXF1ZXN0LCBIdHRwRXJyb3JSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IExvY2F0aW9uU3RyYXRlZ3ksIFBhdGhMb2NhdGlvblN0cmF0ZWd5IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCAqIGFzIFN0YWNrVHJhY2VQYXJzZXIgZnJvbSAnZXJyb3Itc3RhY2stcGFyc2VyJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgRXJyb3JMb2dnaW5nT3B0aW9ucyB9IGZyb20gJy4vZXJyb3ItbG9nZ2luZy1vcHRpb25zJztcbmltcG9ydCB7IEdMT0JBTFMgfSBmcm9tICcuL2dsb2JhbHMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuXG5leHBvcnQgY2xhc3MgRXJyb3JMb2dnaW5nU2VydmljZSB7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChHTE9CQUxTKSBwcml2YXRlIGdsb2JhbENvbmZpZzogRXJyb3JMb2dnaW5nT3B0aW9ucyxcbiAgICAgICAgcHJpdmF0ZSBodHRwQ2xpZW50OiBIdHRwQ2xpZW50LFxuICAgICAgICBwcml2YXRlIGxvY2F0aW9uU3RyYXRlZ3k6IExvY2F0aW9uU3RyYXRlZ3ksXG4gICAgKSB7fVxuXG4gICAgYnVpbGRFcnJvcihlcnJvciwgcmVxPzogSHR0cFJlcXVlc3Q8YW55Pikge1xuXG4gICAgICAgIGNvbnN0IGFwcElkID0gdGhpcy5nbG9iYWxDb25maWcuYXBwSWQ7XG4gICAgICAgIGNvbnN0IGVudiA9IHRoaXMuZ2xvYmFsQ29uZmlnLmVudmlyb25tZW50O1xuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmxvY2F0aW9uU3RyYXRlZ3kgaW5zdGFuY2VvZiBQYXRoTG9jYXRpb25TdHJhdGVneSA/IHRoaXMubG9jYXRpb25TdHJhdGVneS5wYXRoKCkgOiAnTm90IGFwcGxpY2FibGUnO1xuICAgICAgICBjb25zdCBzdGF0dXNDb2RlID0gZXJyb3IgaW5zdGFuY2VvZiBIdHRwRXJyb3JSZXNwb25zZSA/IGVycm9yLnN0YXR1cy50b1N0cmluZygpIDogJ05vdCBhcHBsaWNhYmxlJztcbiAgICAgICAgY29uc3QgcmVxdWVzdCA9IHJlcSA/IEpTT04uc3RyaW5naWZ5KHJlcSkgOiAnTm90IGFwcGxpY2FibGUnO1xuICAgICAgICBjb25zdCBtZXNzYWdlID0gZXJyb3IubWVzc2FnZSB8fCBlcnJvci50b1N0cmluZygpIHx8ICdOb3QgZGVmaW5lZCc7XG4gICAgICAgIGNvbnN0IHN0YWNrdHJhY2U6IGFueSA9IGVycm9yIGluc3RhbmNlb2YgSHR0cEVycm9yUmVzcG9uc2UgPyAnTm8gc3RhY2sgYXZhaWxhYmxlJyA6IFN0YWNrVHJhY2VQYXJzZXIucGFyc2UoZXJyb3IpO1xuICAgICAgICBjb25zdCBmaWxlID0gZXJyb3IgaW5zdGFuY2VvZiBIdHRwRXJyb3JSZXNwb25zZSA/ICdOb3QgYXBwbGljYWJsZScgOiBzdGFja3RyYWNlWzBdLmZpbGVOYW1lO1xuICAgICAgICBjb25zdCBsaW5lID0gZXJyb3IgaW5zdGFuY2VvZiBIdHRwRXJyb3JSZXNwb25zZSA/ICdOb3QgYXBwbGljYWJsZScgOiBzdGFja3RyYWNlWzBdLmxpbmVOdW1iZXI7XG5cbiAgICAgICAgY29uc3QgZXJyb3JUb1NlbmQgPSB7XG4gICAgICAgICAgICB0eXBlOiAnSlMnLFxuICAgICAgICAgICAgYXBwSWQsXG4gICAgICAgICAgICBlbnYsXG4gICAgICAgICAgICB1cmwsXG4gICAgICAgICAgICBzdGF0dXNfY29kZTogc3RhdHVzQ29kZSxcbiAgICAgICAgICAgIHJlcXVlc3QsXG4gICAgICAgICAgICBlcnJvcjogbWVzc2FnZSxcbiAgICAgICAgICAgIGZpbGUsXG4gICAgICAgICAgICBsaW5lLFxuICAgICAgICAgICAgc3RhY2t0cmFjZTogSlNPTi5zdHJpbmdpZnkoc3RhY2t0cmFjZSksXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5yZXBvcnRFcnJvcihlcnJvclRvU2VuZCkuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgcmVwb3J0RXJyb3IoZXJyb3IpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwQ2xpZW50LnBvc3QodGhpcy5nbG9iYWxDb25maWcuZW5kcG9pbnQsIGVycm9yLCB7XG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiAnQmVhcmVyICcgKyB0aGlzLmdsb2JhbENvbmZpZy5hY2Nlc3NfdG9rZW5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgRXJyb3JIYW5kbGVyLCBJbmplY3RhYmxlLCBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cEVycm9yUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5cbmltcG9ydCB7IEVycm9yTG9nZ2luZ1NlcnZpY2UgfSBmcm9tICcuL2Vycm9yLWxvZ2dpbmcuc2VydmljZSc7XG5cbi8vIG91ciBnbG9iYWwgZXJyb3IgaGFuZGxlclxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEVycm9yTG9nZ2luZ0hhbmRsZXIgZXh0ZW5kcyBFcnJvckhhbmRsZXIge1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yLFxuICAgICkge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIGhhbmRsZUVycm9yKGVycm9yKSB7XG4gICAgICAgIGlmICghKGVycm9yIGluc3RhbmNlb2YgSHR0cEVycm9yUmVzcG9uc2UpKSB7XG4gICAgICAgICAgICBjb25zdCBlcnJvckxvZ2dpbmdTZXJ2aWNlID0gdGhpcy5pbmplY3Rvci5nZXQoRXJyb3JMb2dnaW5nU2VydmljZSk7XG4gICAgICAgICAgICBlcnJvckxvZ2dpbmdTZXJ2aWNlLmJ1aWxkRXJyb3IoZXJyb3IpO1xuICAgICAgICB9XG4gICAgICAgIHN1cGVyLmhhbmRsZUVycm9yKGVycm9yKTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBFdmVudCwgSHR0cEludGVyY2VwdG9yLCBIdHRwSGFuZGxlciwgSHR0cFJlcXVlc3QsIEh0dHBSZXNwb25zZSwgSHR0cEVycm9yUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IEVycm9yTG9nZ2luZ1NlcnZpY2UgfSBmcm9tICcuL2Vycm9yLWxvZ2dpbmcuc2VydmljZSc7XG5pbXBvcnQgeyBFcnJvckxvZ2dpbmdPcHRpb25zIH0gZnJvbSAnLi9lcnJvci1sb2dnaW5nLW9wdGlvbnMnO1xuaW1wb3J0IHsgR0xPQkFMUyB9IGZyb20gJy4vZ2xvYmFscyc7XG5cbi8qKiBQYXNzIHVudG91Y2hlZCByZXF1ZXN0IHRocm91Z2ggdG8gdGhlIG5leHQgcmVxdWVzdCBoYW5kbGVyLiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEVycm9yTG9nZ2luZ0ludGVyY2VwdG9yIGltcGxlbWVudHMgSHR0cEludGVyY2VwdG9yIHtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KEdMT0JBTFMpIHByaXZhdGUgZ2xvYmFsQ29uZmlnOiBFcnJvckxvZ2dpbmdPcHRpb25zLFxuICAgICAgICBwcml2YXRlIGVycm9yTG9nZ2luZ1NlcnZpY2U6IEVycm9yTG9nZ2luZ1NlcnZpY2UsXG4gICAgKSB7XG4gICAgfVxuXG4gICAgaW50ZXJjZXB0KHJlcTogSHR0cFJlcXVlc3Q8YW55PiwgbmV4dDogSHR0cEhhbmRsZXIpOiBPYnNlcnZhYmxlPEh0dHBFdmVudDxhbnk+PiB7XG4gICAgICAgIHJldHVybiBuZXh0LmhhbmRsZShyZXEpXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgICAgdGFwKFxuICAgICAgICAgICAgICAgIC8vIFN1Y2NlZWRzIHdoZW4gdGhlcmUgaXMgYSByZXNwb25zZTsgaWdub3JlIG90aGVyIGV2ZW50c1xuICAgICAgICAgICAgICAgIChldmVudDogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChldmVudCBpbnN0YW5jZW9mIEh0dHBSZXNwb25zZSAmJiBldmVudC5zdGF0dXMgIT09IDIwMCAmJiBldmVudC5zdGF0dXMgIT09IDQwMSAmJiBldmVudC5zdGF0dXMgIT09IDQwMyAmJiByZXEudXJsICE9PSB0aGlzLmdsb2JhbENvbmZpZy5lbmRwb2ludCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lcnJvckxvZ2dpbmdTZXJ2aWNlLmJ1aWxkRXJyb3IobmV3IEVycm9yKGV2ZW50LnN0YXR1cyArICcgIT09IDIwMCcpLCByZXEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAvLyBPcGVyYXRpb24gZmFpbGVkOyBlcnJvciBpcyBhbiBIdHRwRXJyb3JSZXNwb25zZVxuICAgICAgICAgICAgICAgIChlcnJvcjogSHR0cEVycm9yUmVzcG9uc2UpID0+IHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAocmVxLnVybCAhPT0gdGhpcy5nbG9iYWxDb25maWcuZW5kcG9pbnQgJiYgZXJyb3Iuc3RhdHVzICE9PSA0MDEgJiYgZXJyb3Iuc3RhdHVzICE9PSA0MDMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JMb2dnaW5nU2VydmljZS5idWlsZEVycm9yKGVycm9yLCByZXEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzLCBFcnJvckhhbmRsZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEhUVFBfSU5URVJDRVBUT1JTIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuXG5pbXBvcnQgeyBFcnJvckxvZ2dpbmdPcHRpb25zIH0gZnJvbSAnLi9lcnJvci1sb2dnaW5nLW9wdGlvbnMnO1xuaW1wb3J0IHsgRXJyb3JMb2dnaW5nSGFuZGxlciB9IGZyb20gJy4vZXJyb3ItbG9nZ2luZy5oYW5kbGVyJztcbmltcG9ydCB7IEVycm9yTG9nZ2luZ0ludGVyY2VwdG9yIH0gZnJvbSAnLi9lcnJvci1sb2dnaW5nLmludGVyY2VwdG9yJztcbmltcG9ydCB7IEVycm9yTG9nZ2luZ1NlcnZpY2UgfSBmcm9tICcuL2Vycm9yLWxvZ2dpbmcuc2VydmljZSc7XG5pbXBvcnQgeyBHTE9CQUxTIH0gZnJvbSAnLi9nbG9iYWxzJztcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7IHByb3ZpZGU6IEVycm9ySGFuZGxlciwgdXNlQ2xhc3M6IEVycm9yTG9nZ2luZ0hhbmRsZXIgfSxcbiAgICAgICAgeyBwcm92aWRlOiBIVFRQX0lOVEVSQ0VQVE9SUywgdXNlQ2xhc3M6IEVycm9yTG9nZ2luZ0ludGVyY2VwdG9yLCBtdWx0aTogdHJ1ZSB9LFxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgRXJyb3JMb2dnaW5nTW9kdWxlIHtcbiAgICBzdGF0aWMgZm9yUm9vdChnbG9iYWxPcHRpb25zOiBFcnJvckxvZ2dpbmdPcHRpb25zKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuZ01vZHVsZTogRXJyb3JMb2dnaW5nTW9kdWxlLFxuICAgICAgICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgICAgICAgICAgRXJyb3JMb2dnaW5nU2VydmljZSxcbiAgICAgICAgICAgICAgICB7IHByb3ZpZGU6IEdMT0JBTFMsIHVzZVZhbHVlOiBnbG9iYWxPcHRpb25zIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfTtcbiAgICB9XG59XG4iXSwibmFtZXMiOlsiU3RhY2tUcmFjZVBhcnNlci5wYXJzZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzt3QkFJdUIsb0NBQW9DOztDQUMxRDs7Ozs7O0FDTEQ7Ozs7Ozs7OztJQUNJLFlBQ1csTUFDQSxhQUNBLE9BQ0EsTUFDQSxNQUNBO1FBTEEsU0FBSSxHQUFKLElBQUk7UUFDSixnQkFBVyxHQUFYLFdBQVc7UUFDWCxVQUFLLEdBQUwsS0FBSztRQUNMLFNBQUksR0FBSixJQUFJO1FBQ0osU0FBSSxHQUFKLElBQUk7UUFDSixjQUFTLEdBQVQsU0FBUztLQUNoQjtDQUNQOzs7Ozs7QUNSRDtBQUVBLE1BQWEsT0FBTyxHQUF3QyxJQUFJLGNBQWMsQ0FBQyxpQ0FBaUMsQ0FBQzs7Ozs7O0FDSGpIOzs7Ozs7SUFlSSxZQUN5QyxZQUFpQyxFQUM5RCxZQUNBO1FBRjZCLGlCQUFZLEdBQVosWUFBWSxDQUFxQjtR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