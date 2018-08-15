/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { ErrorLoggingService } from './error-logging.service';
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
export { ErrorLoggingInterceptor };
if (false) {
    /** @type {?} */
    ErrorLoggingInterceptor.prototype.errorLoggingService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3ItbG9nZ2luZy5pbnRlcmNlcHRvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItZXJyb3ItbG9nZ2luZy8iLCJzb3VyY2VzIjpbImxpYi9lcnJvci1sb2dnaW5nLmludGVyY2VwdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBd0QsWUFBWSxFQUFxQixNQUFNLHNCQUFzQixDQUFDO0FBRTdILE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVyQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7Ozs7SUFNMUQsaUNBQ1k7UUFBQSx3QkFBbUIsR0FBbkIsbUJBQW1CO0tBRTlCOzs7Ozs7SUFFRCwyQ0FBUzs7Ozs7SUFBVCxVQUFVLEdBQXFCLEVBQUUsSUFBaUI7UUFBbEQsaUJBa0JDO1FBakJHLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQzthQUN0QixJQUFJLENBQ0QsR0FBRztRQUNDLHlEQUF5RDs7UUFDekQsVUFBQyxLQUFVO1lBQ1AsRUFBRSxDQUFDLENBQUMsS0FBSyxZQUFZLFlBQVksSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxLQUFLLEtBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUN6RyxLQUFJLENBQUMsbUJBQW1CLENBQUMsVUFBVSxDQUFDLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7YUFDbEY7U0FDSjtRQUNELGtEQUFrRDs7UUFDbEQsVUFBQyxLQUF3QjtZQUNyQixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLEtBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNoRCxLQUFJLENBQUMsbUJBQW1CLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQzthQUNuRDtTQUNKLENBQ0osQ0FDSixDQUFDO0tBQ0w7O2dCQTFCSixVQUFVOzs7O2dCQUhGLG1CQUFtQjs7a0NBTDVCOztTQVNhLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBFdmVudCwgSHR0cEludGVyY2VwdG9yLCBIdHRwSGFuZGxlciwgSHR0cFJlcXVlc3QsIEh0dHBSZXNwb25zZSwgSHR0cEVycm9yUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IEVycm9yTG9nZ2luZ1NlcnZpY2UgfSBmcm9tICcuL2Vycm9yLWxvZ2dpbmcuc2VydmljZSc7XG5cbi8qKiBQYXNzIHVudG91Y2hlZCByZXF1ZXN0IHRocm91Z2ggdG8gdGhlIG5leHQgcmVxdWVzdCBoYW5kbGVyLiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEVycm9yTG9nZ2luZ0ludGVyY2VwdG9yIGltcGxlbWVudHMgSHR0cEludGVyY2VwdG9yIHtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGVycm9yTG9nZ2luZ1NlcnZpY2U6IEVycm9yTG9nZ2luZ1NlcnZpY2UsXG4gICAgKSB7XG4gICAgfVxuXG4gICAgaW50ZXJjZXB0KHJlcTogSHR0cFJlcXVlc3Q8YW55PiwgbmV4dDogSHR0cEhhbmRsZXIpOiBPYnNlcnZhYmxlPEh0dHBFdmVudDxhbnk+PiB7XG4gICAgICAgIHJldHVybiBuZXh0LmhhbmRsZShyZXEpXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgICAgdGFwKFxuICAgICAgICAgICAgICAgIC8vIFN1Y2NlZWRzIHdoZW4gdGhlcmUgaXMgYSByZXNwb25zZTsgaWdub3JlIG90aGVyIGV2ZW50c1xuICAgICAgICAgICAgICAgIChldmVudDogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChldmVudCBpbnN0YW5jZW9mIEh0dHBSZXNwb25zZSAmJiBldmVudC5zdGF0dXMgIT09IDIwMCAmJiByZXEudXJsICE9PSB0aGlzLmVycm9yTG9nZ2luZ1NlcnZpY2UuZW5kcG9pbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JMb2dnaW5nU2VydmljZS5idWlsZEVycm9yKG5ldyBFcnJvcihldmVudC5zdGF0dXMgKyAnICE9PSAyMDAnKSwgcmVxKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgLy8gT3BlcmF0aW9uIGZhaWxlZDsgZXJyb3IgaXMgYW4gSHR0cEVycm9yUmVzcG9uc2VcbiAgICAgICAgICAgICAgICAoZXJyb3I6IEh0dHBFcnJvclJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXEudXJsICE9PSB0aGlzLmVycm9yTG9nZ2luZ1NlcnZpY2UuZW5kcG9pbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JMb2dnaW5nU2VydmljZS5idWlsZEVycm9yKGVycm9yLCByZXEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ==