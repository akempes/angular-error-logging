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
export class ErrorLoggingInterceptor {
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
if (false) {
    /** @type {?} */
    ErrorLoggingInterceptor.prototype.errorLoggingService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3ItbG9nZ2luZy5pbnRlcmNlcHRvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItZXJyb3ItbG9nZ2luZy8iLCJzb3VyY2VzIjpbImxpYi9lcnJvci1sb2dnaW5nLmludGVyY2VwdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBd0QsWUFBWSxFQUFxQixNQUFNLHNCQUFzQixDQUFDO0FBRTdILE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVyQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7OztBQUk5RCxNQUFNOzs7O0lBRUYsWUFDWTtRQUFBLHdCQUFtQixHQUFuQixtQkFBbUI7S0FFOUI7Ozs7OztJQUVELFNBQVMsQ0FBQyxHQUFxQixFQUFFLElBQWlCO1FBQzlDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQzthQUN0QixJQUFJLENBQ0QsR0FBRzs7UUFFQyxDQUFDLEtBQVUsRUFBRSxFQUFFO1lBQ1gsRUFBRSxDQUFDLENBQUMsS0FBSyxZQUFZLFlBQVksSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxLQUFLLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUN6RyxJQUFJLENBQUMsbUJBQW1CLENBQUMsVUFBVSxDQUFDLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7YUFDbEY7U0FDSjs7UUFFRCxDQUFDLEtBQXdCLEVBQUUsRUFBRTtZQUN6QixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNoRCxJQUFJLENBQUMsbUJBQW1CLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQzthQUNuRDtTQUNKLENBQ0osQ0FDSixDQUFDO0tBQ0w7OztZQTFCSixVQUFVOzs7O1lBSEYsbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cEV2ZW50LCBIdHRwSW50ZXJjZXB0b3IsIEh0dHBIYW5kbGVyLCBIdHRwUmVxdWVzdCwgSHR0cFJlc3BvbnNlLCBIdHRwRXJyb3JSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgRXJyb3JMb2dnaW5nU2VydmljZSB9IGZyb20gJy4vZXJyb3ItbG9nZ2luZy5zZXJ2aWNlJztcblxuLyoqIFBhc3MgdW50b3VjaGVkIHJlcXVlc3QgdGhyb3VnaCB0byB0aGUgbmV4dCByZXF1ZXN0IGhhbmRsZXIuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRXJyb3JMb2dnaW5nSW50ZXJjZXB0b3IgaW1wbGVtZW50cyBIdHRwSW50ZXJjZXB0b3Ige1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgZXJyb3JMb2dnaW5nU2VydmljZTogRXJyb3JMb2dnaW5nU2VydmljZSxcbiAgICApIHtcbiAgICB9XG5cbiAgICBpbnRlcmNlcHQocmVxOiBIdHRwUmVxdWVzdDxhbnk+LCBuZXh0OiBIdHRwSGFuZGxlcik6IE9ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+IHtcbiAgICAgICAgcmV0dXJuIG5leHQuaGFuZGxlKHJlcSlcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICB0YXAoXG4gICAgICAgICAgICAgICAgLy8gU3VjY2VlZHMgd2hlbiB0aGVyZSBpcyBhIHJlc3BvbnNlOyBpZ25vcmUgb3RoZXIgZXZlbnRzXG4gICAgICAgICAgICAgICAgKGV2ZW50OiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50IGluc3RhbmNlb2YgSHR0cFJlc3BvbnNlICYmIGV2ZW50LnN0YXR1cyAhPT0gMjAwICYmIHJlcS51cmwgIT09IHRoaXMuZXJyb3JMb2dnaW5nU2VydmljZS5lbmRwb2ludCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lcnJvckxvZ2dpbmdTZXJ2aWNlLmJ1aWxkRXJyb3IobmV3IEVycm9yKGV2ZW50LnN0YXR1cyArICcgIT09IDIwMCcpLCByZXEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAvLyBPcGVyYXRpb24gZmFpbGVkOyBlcnJvciBpcyBhbiBIdHRwRXJyb3JSZXNwb25zZVxuICAgICAgICAgICAgICAgIChlcnJvcjogSHR0cEVycm9yUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcS51cmwgIT09IHRoaXMuZXJyb3JMb2dnaW5nU2VydmljZS5lbmRwb2ludCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lcnJvckxvZ2dpbmdTZXJ2aWNlLmJ1aWxkRXJyb3IoZXJyb3IsIHJlcSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgfVxufVxuIl19