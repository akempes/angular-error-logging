/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorLoggingService } from './error-logging.service';
export class ErrorLoggingHandler extends ErrorHandler {
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
if (false) {
    /** @type {?} */
    ErrorLoggingHandler.prototype.injector;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3ItbG9nZ2luZy5oYW5kbGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1lcnJvci1sb2dnaW5nLyIsInNvdXJjZXMiOlsibGliL2Vycm9yLWxvZ2dpbmcuaGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25FLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRXpELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBSTlELE1BQU0sMEJBQTJCLFNBQVEsWUFBWTs7OztJQUVqRCxZQUNZO1FBRVIsS0FBSyxFQUFFLENBQUM7UUFGQSxhQUFRLEdBQVIsUUFBUTtLQUduQjs7Ozs7SUFFRCxXQUFXLENBQUMsS0FBSztRQUNiLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLFlBQVksaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUM7O1lBQ3hDLE1BQU0sbUJBQW1CLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUNuRSxtQkFBbUIsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDekM7UUFDRCxLQUFLLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQzVCOzs7WUFmSixVQUFVOzs7O1lBTndCLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFcnJvckhhbmRsZXIsIEluamVjdGFibGUsIEluamVjdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwRXJyb3JSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcblxuaW1wb3J0IHsgRXJyb3JMb2dnaW5nU2VydmljZSB9IGZyb20gJy4vZXJyb3ItbG9nZ2luZy5zZXJ2aWNlJztcblxuLy8gb3VyIGdsb2JhbCBlcnJvciBoYW5kbGVyXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRXJyb3JMb2dnaW5nSGFuZGxlciBleHRlbmRzIEVycm9ySGFuZGxlciB7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgaGFuZGxlRXJyb3IoZXJyb3IpIHtcbiAgICAgICAgaWYgKCEoZXJyb3IgaW5zdGFuY2VvZiBIdHRwRXJyb3JSZXNwb25zZSkpIHtcbiAgICAgICAgICAgIGNvbnN0IGVycm9yTG9nZ2luZ1NlcnZpY2UgPSB0aGlzLmluamVjdG9yLmdldChFcnJvckxvZ2dpbmdTZXJ2aWNlKTtcbiAgICAgICAgICAgIGVycm9yTG9nZ2luZ1NlcnZpY2UuYnVpbGRFcnJvcihlcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgc3VwZXIuaGFuZGxlRXJyb3IoZXJyb3IpO1xuICAgIH1cblxufVxuIl19