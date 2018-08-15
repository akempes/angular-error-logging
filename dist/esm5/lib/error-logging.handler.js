/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorLoggingService } from './error-logging.service';
var ErrorLoggingHandler = /** @class */ (function (_super) {
    tslib_1.__extends(ErrorLoggingHandler, _super);
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
export { ErrorLoggingHandler };
if (false) {
    /** @type {?} */
    ErrorLoggingHandler.prototype.injector;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3ItbG9nZ2luZy5oYW5kbGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1lcnJvci1sb2dnaW5nLyIsInNvdXJjZXMiOlsibGliL2Vycm9yLWxvZ2dpbmcuaGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUV6RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7SUFJckIsK0NBQVk7SUFFakQsNkJBQ1k7UUFEWixZQUdJLGlCQUFPLFNBQ1Y7UUFIVyxjQUFRLEdBQVIsUUFBUTs7S0FHbkI7Ozs7O0lBRUQseUNBQVc7Ozs7SUFBWCxVQUFZLEtBQUs7UUFDYixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxZQUFZLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDOztZQUN4QyxJQUFNLG1CQUFtQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7WUFDbkUsbUJBQW1CLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3pDO1FBQ0QsaUJBQU0sV0FBVyxZQUFDLEtBQUssQ0FBQyxDQUFDO0tBQzVCOztnQkFmSixVQUFVOzs7O2dCQU53QixRQUFROzs4QkFBM0M7RUFPeUMsWUFBWTtTQUF4QyxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFcnJvckhhbmRsZXIsIEluamVjdGFibGUsIEluamVjdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwRXJyb3JSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcblxuaW1wb3J0IHsgRXJyb3JMb2dnaW5nU2VydmljZSB9IGZyb20gJy4vZXJyb3ItbG9nZ2luZy5zZXJ2aWNlJztcblxuLy8gb3VyIGdsb2JhbCBlcnJvciBoYW5kbGVyXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRXJyb3JMb2dnaW5nSGFuZGxlciBleHRlbmRzIEVycm9ySGFuZGxlciB7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgaGFuZGxlRXJyb3IoZXJyb3IpIHtcbiAgICAgICAgaWYgKCEoZXJyb3IgaW5zdGFuY2VvZiBIdHRwRXJyb3JSZXNwb25zZSkpIHtcbiAgICAgICAgICAgIGNvbnN0IGVycm9yTG9nZ2luZ1NlcnZpY2UgPSB0aGlzLmluamVjdG9yLmdldChFcnJvckxvZ2dpbmdTZXJ2aWNlKTtcbiAgICAgICAgICAgIGVycm9yTG9nZ2luZ1NlcnZpY2UuYnVpbGRFcnJvcihlcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgc3VwZXIuaGFuZGxlRXJyb3IoZXJyb3IpO1xuICAgIH1cblxufVxuIl19