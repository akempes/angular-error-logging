/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable, Optional, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import * as StackTraceParser from 'error-stack-parser';
import { GLOBALS } from './globals';
import * as i0 from "@angular/core";
import * as i1 from "./globals";
import * as i2 from "@angular/common/http";
import * as i3 from "@angular/common";
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
        var stacktrace = error instanceof HttpErrorResponse ? 'No stack available' : StackTraceParser.parse(error);
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
    /** @nocollapse */ ErrorLoggingService.ngInjectableDef = i0.defineInjectable({ factory: function ErrorLoggingService_Factory() { return new ErrorLoggingService(i0.inject(i1.GLOBALS, 8), i0.inject(i2.HttpClient), i0.inject(i3.LocationStrategy)); }, token: ErrorLoggingService, providedIn: "root" });
    return ErrorLoggingService;
}());
export { ErrorLoggingService };
if (false) {
    /** @type {?} */
    ErrorLoggingService.prototype.endpoint;
    /** @type {?} */
    ErrorLoggingService.prototype.globalConfig;
    /** @type {?} */
    ErrorLoggingService.prototype.httpClient;
    /** @type {?} */
    ErrorLoggingService.prototype.locationStrategy;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3ItbG9nZ2luZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1lcnJvci1sb2dnaW5nLyIsInNvdXJjZXMiOlsibGliL2Vycm9yLWxvZ2dpbmcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdELE9BQU8sRUFBRSxVQUFVLEVBQWUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RSxPQUFPLEtBQUssZ0JBQWdCLE1BQU0sb0JBQW9CLENBQUM7QUFJdkQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLFdBQVcsQ0FBQzs7Ozs7O0lBVWhDLDZCQUN5QyxZQUFpQyxFQUM5RCxZQUNBO1FBRjZCLGlCQUFZLEdBQVosWUFBWSxDQUFxQjtRQUM5RCxlQUFVLEdBQVYsVUFBVTtRQUNWLHFCQUFnQixHQUFoQixnQkFBZ0I7d0JBTFYsb0NBQW9DO0tBTWxEOzs7Ozs7SUFFSix3Q0FBVTs7Ozs7SUFBVixVQUFXLEtBQUssRUFBRSxHQUFzQjs7UUFFcEMsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUM7O1FBQ3RDLElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDOztRQUMxQyxJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLFlBQVksb0JBQW9CLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUM7O1FBQ3BILElBQU0sVUFBVSxHQUFHLEtBQUssWUFBWSxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUM7O1FBQ25HLElBQU0sT0FBTyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUM7O1FBQzdELElBQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLElBQUksS0FBSyxDQUFDLFFBQVEsRUFBRSxJQUFJLGFBQWEsQ0FBQzs7UUFDbkUsSUFBTSxVQUFVLEdBQVEsS0FBSyxZQUFZLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDOztRQUNsSCxJQUFNLElBQUksR0FBRyxLQUFLLFlBQVksaUJBQWlCLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDOztRQUM1RixJQUFNLElBQUksR0FBRyxLQUFLLFlBQVksaUJBQWlCLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDOztRQUU5RixJQUFNLFdBQVcsR0FBRztZQUNoQixJQUFJLEVBQUUsSUFBSTtZQUNWLEtBQUssT0FBQTtZQUNMLEdBQUcsS0FBQTtZQUNILEdBQUcsS0FBQTtZQUNILFdBQVcsRUFBRSxVQUFVO1lBQ3ZCLE9BQU8sU0FBQTtZQUNQLEtBQUssRUFBRSxPQUFPO1lBQ2QsSUFBSSxNQUFBO1lBQ0osSUFBSSxNQUFBO1lBQ0osVUFBVSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDO1NBQ3pDLENBQUM7UUFFRixJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO0tBQzdDOzs7OztJQUVELHlDQUFXOzs7O0lBQVgsVUFBWSxLQUFLO1FBQ2IsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFO1lBQzlDLE9BQU8sRUFBRTtnQkFDTCxlQUFlLEVBQUUsU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWTthQUM5RDtTQUNKLENBQUMsQ0FBQztLQUNOOztnQkFoREosVUFBVSxTQUFDO29CQUNSLFVBQVUsRUFBRSxNQUFNO2lCQUNyQjs7OztnREFPUSxRQUFRLFlBQUksTUFBTSxTQUFDLE9BQU87Z0JBakIxQixVQUFVO2dCQUNWLGdCQUFnQjs7OzhCQUZ6Qjs7U0FhYSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBPcHRpb25hbCwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwUmVxdWVzdCwgSHR0cEVycm9yUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBMb2NhdGlvblN0cmF0ZWd5LCBQYXRoTG9jYXRpb25TdHJhdGVneSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgKiBhcyBTdGFja1RyYWNlUGFyc2VyIGZyb20gJ2Vycm9yLXN0YWNrLXBhcnNlcic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IEVycm9yTG9nZ2luZ09wdGlvbnMgfSBmcm9tICcuL2Vycm9yLWxvZ2dpbmctb3B0aW9ucyc7XG5pbXBvcnQgeyBHTE9CQUxTIH0gZnJvbSAnLi9nbG9iYWxzJztcblxuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290J1xufSlcblxuZXhwb3J0IGNsYXNzIEVycm9yTG9nZ2luZ1NlcnZpY2Uge1xuXG4gICAgcHVibGljIGVuZHBvaW50ID0gJ2h0dHBzOi8vZGFzaGJvYXJkLjdkZXYubmwvYXBpL2xvZ3MnO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoR0xPQkFMUykgcHJpdmF0ZSBnbG9iYWxDb25maWc6IEVycm9yTG9nZ2luZ09wdGlvbnMsXG4gICAgICAgIHByaXZhdGUgaHR0cENsaWVudDogSHR0cENsaWVudCxcbiAgICAgICAgcHJpdmF0ZSBsb2NhdGlvblN0cmF0ZWd5OiBMb2NhdGlvblN0cmF0ZWd5LFxuICAgICkge31cblxuICAgIGJ1aWxkRXJyb3IoZXJyb3IsIHJlcT86IEh0dHBSZXF1ZXN0PGFueT4pIHtcblxuICAgICAgICBjb25zdCBhcHBJZCA9IHRoaXMuZ2xvYmFsQ29uZmlnLmFwcElkO1xuICAgICAgICBjb25zdCBlbnYgPSB0aGlzLmdsb2JhbENvbmZpZy5lbnZpcm9ubWVudDtcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5sb2NhdGlvblN0cmF0ZWd5IGluc3RhbmNlb2YgUGF0aExvY2F0aW9uU3RyYXRlZ3kgPyB0aGlzLmxvY2F0aW9uU3RyYXRlZ3kucGF0aCgpIDogJ05vdCBhcHBsaWNhYmxlJztcbiAgICAgICAgY29uc3Qgc3RhdHVzQ29kZSA9IGVycm9yIGluc3RhbmNlb2YgSHR0cEVycm9yUmVzcG9uc2UgPyBlcnJvci5zdGF0dXMudG9TdHJpbmcoKSA6ICdOb3QgYXBwbGljYWJsZSc7XG4gICAgICAgIGNvbnN0IHJlcXVlc3QgPSByZXEgPyBKU09OLnN0cmluZ2lmeShyZXEpIDogJ05vdCBhcHBsaWNhYmxlJztcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IGVycm9yLm1lc3NhZ2UgfHwgZXJyb3IudG9TdHJpbmcoKSB8fCAnTm90IGRlZmluZWQnO1xuICAgICAgICBjb25zdCBzdGFja3RyYWNlOiBhbnkgPSBlcnJvciBpbnN0YW5jZW9mIEh0dHBFcnJvclJlc3BvbnNlID8gJ05vIHN0YWNrIGF2YWlsYWJsZScgOiBTdGFja1RyYWNlUGFyc2VyLnBhcnNlKGVycm9yKTtcbiAgICAgICAgY29uc3QgZmlsZSA9IGVycm9yIGluc3RhbmNlb2YgSHR0cEVycm9yUmVzcG9uc2UgPyAnTm90IGFwcGxpY2FibGUnIDogc3RhY2t0cmFjZVswXS5maWxlTmFtZTtcbiAgICAgICAgY29uc3QgbGluZSA9IGVycm9yIGluc3RhbmNlb2YgSHR0cEVycm9yUmVzcG9uc2UgPyAnTm90IGFwcGxpY2FibGUnIDogc3RhY2t0cmFjZVswXS5saW5lTnVtYmVyO1xuXG4gICAgICAgIGNvbnN0IGVycm9yVG9TZW5kID0ge1xuICAgICAgICAgICAgdHlwZTogJ0pTJyxcbiAgICAgICAgICAgIGFwcElkLFxuICAgICAgICAgICAgZW52LFxuICAgICAgICAgICAgdXJsLFxuICAgICAgICAgICAgc3RhdHVzX2NvZGU6IHN0YXR1c0NvZGUsXG4gICAgICAgICAgICByZXF1ZXN0LFxuICAgICAgICAgICAgZXJyb3I6IG1lc3NhZ2UsXG4gICAgICAgICAgICBmaWxlLFxuICAgICAgICAgICAgbGluZSxcbiAgICAgICAgICAgIHN0YWNrdHJhY2U6IEpTT04uc3RyaW5naWZ5KHN0YWNrdHJhY2UpLFxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMucmVwb3J0RXJyb3IoZXJyb3JUb1NlbmQpLnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIHJlcG9ydEVycm9yKGVycm9yKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cENsaWVudC5wb3N0KHRoaXMuZW5kcG9pbnQsIGVycm9yLCB7XG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiAnQmVhcmVyICcgKyB0aGlzLmdsb2JhbENvbmZpZy5hY2Nlc3NfdG9rZW5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl19