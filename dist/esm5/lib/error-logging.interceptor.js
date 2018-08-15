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
var ErrorLoggingInterceptor = /** @class */ (function () {
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
            .pipe(tap(
        // Succeeds when there is a response; ignore other events
        // Succeeds when there is a response; ignore other events
        function (event) {
            if (event instanceof HttpResponse && event.status !== 200 && event.status !== 401 && event.status !== 403 && req.url !== _this.globalConfig.endpoint) {
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
        { type: Injectable },
    ];
    /** @nocollapse */
    ErrorLoggingInterceptor.ctorParameters = function () { return [
        { type: ErrorLoggingOptions, decorators: [{ type: Optional }, { type: Inject, args: [GLOBALS,] }] },
        { type: ErrorLoggingService }
    ]; };
    return ErrorLoggingInterceptor;
}());
export { ErrorLoggingInterceptor };
if (false) {
    /** @type {?} */
    ErrorLoggingInterceptor.prototype.globalConfig;
    /** @type {?} */
    ErrorLoggingInterceptor.prototype.errorLoggingService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3ItbG9nZ2luZy5pbnRlcmNlcHRvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItZXJyb3ItbG9nZ2luZy8iLCJzb3VyY2VzIjpbImxpYi9lcnJvci1sb2dnaW5nLmludGVyY2VwdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0QsT0FBTyxFQUF3RCxZQUFZLEVBQXFCLE1BQU0sc0JBQXNCLENBQUM7QUFFN0gsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXJDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzlELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzlELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxXQUFXLENBQUM7Ozs7O0lBTWhDLGlDQUN5QyxZQUFpQyxFQUM5RDtRQUQ2QixpQkFBWSxHQUFaLFlBQVksQ0FBcUI7UUFDOUQsd0JBQW1CLEdBQW5CLG1CQUFtQjtLQUU5Qjs7Ozs7O0lBRUQsMkNBQVM7Ozs7O0lBQVQsVUFBVSxHQUFxQixFQUFFLElBQWlCO1FBQWxELGlCQW1CQztRQWxCRyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUM7YUFDdEIsSUFBSSxDQUNELEdBQUc7UUFDQyx5REFBeUQ7O1FBQ3pELFVBQUMsS0FBVTtZQUNQLEVBQUUsQ0FBQyxDQUFDLEtBQUssWUFBWSxZQUFZLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxHQUFHLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxHQUFHLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsS0FBSyxLQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xKLEtBQUksQ0FBQyxtQkFBbUIsQ0FBQyxVQUFVLENBQUMsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQzthQUNsRjtTQUNKO1FBQ0Qsa0RBQWtEOztRQUNsRCxVQUFDLEtBQXdCO1lBRXJCLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssS0FBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxHQUFHLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUN6RixLQUFJLENBQUMsbUJBQW1CLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQzthQUNuRDtTQUNKLENBQ0osQ0FDSixDQUFDO0tBQ0w7O2dCQTVCSixVQUFVOzs7O2dCQUpGLG1CQUFtQix1QkFRbkIsUUFBUSxZQUFJLE1BQU0sU0FBQyxPQUFPO2dCQVQxQixtQkFBbUI7O2tDQUw1Qjs7U0FXYSx1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwRXZlbnQsIEh0dHBJbnRlcmNlcHRvciwgSHR0cEhhbmRsZXIsIEh0dHBSZXF1ZXN0LCBIdHRwUmVzcG9uc2UsIEh0dHBFcnJvclJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBFcnJvckxvZ2dpbmdTZXJ2aWNlIH0gZnJvbSAnLi9lcnJvci1sb2dnaW5nLnNlcnZpY2UnO1xuaW1wb3J0IHsgRXJyb3JMb2dnaW5nT3B0aW9ucyB9IGZyb20gJy4vZXJyb3ItbG9nZ2luZy1vcHRpb25zJztcbmltcG9ydCB7IEdMT0JBTFMgfSBmcm9tICcuL2dsb2JhbHMnO1xuXG4vKiogUGFzcyB1bnRvdWNoZWQgcmVxdWVzdCB0aHJvdWdoIHRvIHRoZSBuZXh0IHJlcXVlc3QgaGFuZGxlci4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBFcnJvckxvZ2dpbmdJbnRlcmNlcHRvciBpbXBsZW1lbnRzIEh0dHBJbnRlcmNlcHRvciB7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChHTE9CQUxTKSBwcml2YXRlIGdsb2JhbENvbmZpZzogRXJyb3JMb2dnaW5nT3B0aW9ucyxcbiAgICAgICAgcHJpdmF0ZSBlcnJvckxvZ2dpbmdTZXJ2aWNlOiBFcnJvckxvZ2dpbmdTZXJ2aWNlLFxuICAgICkge1xuICAgIH1cblxuICAgIGludGVyY2VwdChyZXE6IEh0dHBSZXF1ZXN0PGFueT4sIG5leHQ6IEh0dHBIYW5kbGVyKTogT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8YW55Pj4ge1xuICAgICAgICByZXR1cm4gbmV4dC5oYW5kbGUocmVxKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICAgIHRhcChcbiAgICAgICAgICAgICAgICAvLyBTdWNjZWVkcyB3aGVuIHRoZXJlIGlzIGEgcmVzcG9uc2U7IGlnbm9yZSBvdGhlciBldmVudHNcbiAgICAgICAgICAgICAgICAoZXZlbnQ6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiBIdHRwUmVzcG9uc2UgJiYgZXZlbnQuc3RhdHVzICE9PSAyMDAgJiYgZXZlbnQuc3RhdHVzICE9PSA0MDEgJiYgZXZlbnQuc3RhdHVzICE9PSA0MDMgJiYgcmVxLnVybCAhPT0gdGhpcy5nbG9iYWxDb25maWcuZW5kcG9pbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JMb2dnaW5nU2VydmljZS5idWlsZEVycm9yKG5ldyBFcnJvcihldmVudC5zdGF0dXMgKyAnICE9PSAyMDAnKSwgcmVxKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgLy8gT3BlcmF0aW9uIGZhaWxlZDsgZXJyb3IgaXMgYW4gSHR0cEVycm9yUmVzcG9uc2VcbiAgICAgICAgICAgICAgICAoZXJyb3I6IEh0dHBFcnJvclJlc3BvbnNlKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcS51cmwgIT09IHRoaXMuZ2xvYmFsQ29uZmlnLmVuZHBvaW50ICYmIGVycm9yLnN0YXR1cyAhPT0gNDAxICYmIGVycm9yLnN0YXR1cyAhPT0gNDAzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVycm9yTG9nZ2luZ1NlcnZpY2UuYnVpbGRFcnJvcihlcnJvciwgcmVxKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9XG59XG4iXX0=