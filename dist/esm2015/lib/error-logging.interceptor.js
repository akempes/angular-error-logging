/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable, Inject, Optional } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { ErrorLoggingService } from './error-logging.service';
import { ErrorLoggingOptions } from './error-logging-options';
import { GLOBALS } from './globals';
/**
 * Pass untouched request through to the next request handler.
 */
export class ErrorLoggingInterceptor {
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
if (false) {
    /** @type {?} */
    ErrorLoggingInterceptor.prototype.globalConfig;
    /** @type {?} */
    ErrorLoggingInterceptor.prototype.errorLoggingService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3ItbG9nZ2luZy5pbnRlcmNlcHRvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItZXJyb3ItbG9nZ2luZy8iLCJzb3VyY2VzIjpbImxpYi9lcnJvci1sb2dnaW5nLmludGVyY2VwdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0QsT0FBTyxFQUF3RCxZQUFZLEVBQXFCLE1BQU0sc0JBQXNCLENBQUM7QUFFN0gsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXJDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzlELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzlELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxXQUFXLENBQUM7Ozs7QUFJcEMsTUFBTTs7Ozs7SUFFRixZQUN5QyxZQUFpQyxFQUM5RDtRQUQ2QixpQkFBWSxHQUFaLFlBQVksQ0FBcUI7UUFDOUQsd0JBQW1CLEdBQW5CLG1CQUFtQjtLQUU5Qjs7Ozs7O0lBRUQsU0FBUyxDQUFDLEdBQXFCLEVBQUUsSUFBaUI7UUFDOUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDO2FBQ3RCLElBQUksQ0FDRCxHQUFHOztRQUVDLENBQUMsS0FBVSxFQUFFLEVBQUU7WUFDWCxFQUFFLENBQUMsQ0FBQyxLQUFLLFlBQVksWUFBWSxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssR0FBRyxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssR0FBRyxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLEtBQUssSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNsSixJQUFJLENBQUMsbUJBQW1CLENBQUMsVUFBVSxDQUFDLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7YUFDbEY7U0FDSjs7UUFFRCxDQUFDLEtBQXdCLEVBQUUsRUFBRTtZQUV6QixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssR0FBRyxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDekYsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7YUFDbkQ7U0FDSixDQUNKLENBQ0osQ0FBQztLQUNMOzs7WUE1QkosVUFBVTs7OztZQUpGLG1CQUFtQix1QkFRbkIsUUFBUSxZQUFJLE1BQU0sU0FBQyxPQUFPO1lBVDFCLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBFdmVudCwgSHR0cEludGVyY2VwdG9yLCBIdHRwSGFuZGxlciwgSHR0cFJlcXVlc3QsIEh0dHBSZXNwb25zZSwgSHR0cEVycm9yUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IEVycm9yTG9nZ2luZ1NlcnZpY2UgfSBmcm9tICcuL2Vycm9yLWxvZ2dpbmcuc2VydmljZSc7XG5pbXBvcnQgeyBFcnJvckxvZ2dpbmdPcHRpb25zIH0gZnJvbSAnLi9lcnJvci1sb2dnaW5nLW9wdGlvbnMnO1xuaW1wb3J0IHsgR0xPQkFMUyB9IGZyb20gJy4vZ2xvYmFscyc7XG5cbi8qKiBQYXNzIHVudG91Y2hlZCByZXF1ZXN0IHRocm91Z2ggdG8gdGhlIG5leHQgcmVxdWVzdCBoYW5kbGVyLiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEVycm9yTG9nZ2luZ0ludGVyY2VwdG9yIGltcGxlbWVudHMgSHR0cEludGVyY2VwdG9yIHtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KEdMT0JBTFMpIHByaXZhdGUgZ2xvYmFsQ29uZmlnOiBFcnJvckxvZ2dpbmdPcHRpb25zLFxuICAgICAgICBwcml2YXRlIGVycm9yTG9nZ2luZ1NlcnZpY2U6IEVycm9yTG9nZ2luZ1NlcnZpY2UsXG4gICAgKSB7XG4gICAgfVxuXG4gICAgaW50ZXJjZXB0KHJlcTogSHR0cFJlcXVlc3Q8YW55PiwgbmV4dDogSHR0cEhhbmRsZXIpOiBPYnNlcnZhYmxlPEh0dHBFdmVudDxhbnk+PiB7XG4gICAgICAgIHJldHVybiBuZXh0LmhhbmRsZShyZXEpXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgICAgdGFwKFxuICAgICAgICAgICAgICAgIC8vIFN1Y2NlZWRzIHdoZW4gdGhlcmUgaXMgYSByZXNwb25zZTsgaWdub3JlIG90aGVyIGV2ZW50c1xuICAgICAgICAgICAgICAgIChldmVudDogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChldmVudCBpbnN0YW5jZW9mIEh0dHBSZXNwb25zZSAmJiBldmVudC5zdGF0dXMgIT09IDIwMCAmJiBldmVudC5zdGF0dXMgIT09IDQwMSAmJiBldmVudC5zdGF0dXMgIT09IDQwMyAmJiByZXEudXJsICE9PSB0aGlzLmdsb2JhbENvbmZpZy5lbmRwb2ludCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lcnJvckxvZ2dpbmdTZXJ2aWNlLmJ1aWxkRXJyb3IobmV3IEVycm9yKGV2ZW50LnN0YXR1cyArICcgIT09IDIwMCcpLCByZXEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAvLyBPcGVyYXRpb24gZmFpbGVkOyBlcnJvciBpcyBhbiBIdHRwRXJyb3JSZXNwb25zZVxuICAgICAgICAgICAgICAgIChlcnJvcjogSHR0cEVycm9yUmVzcG9uc2UpID0+IHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAocmVxLnVybCAhPT0gdGhpcy5nbG9iYWxDb25maWcuZW5kcG9pbnQgJiYgZXJyb3Iuc3RhdHVzICE9PSA0MDEgJiYgZXJyb3Iuc3RhdHVzICE9PSA0MDMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JMb2dnaW5nU2VydmljZS5idWlsZEVycm9yKGVycm9yLCByZXEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ==