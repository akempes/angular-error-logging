/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable, Optional, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import * as StackTraceParser from 'error-stack-parser';
import { ErrorLoggingOptions } from './error-logging-options';
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
        return this.httpClient.post(this.globalConfig.endpoint, error, {
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
        { type: ErrorLoggingOptions, decorators: [{ type: Optional }, { type: Inject, args: [GLOBALS,] }] },
        { type: HttpClient },
        { type: LocationStrategy }
    ]; };
    /** @nocollapse */ ErrorLoggingService.ngInjectableDef = i0.defineInjectable({ factory: function ErrorLoggingService_Factory() { return new ErrorLoggingService(i0.inject(i1.GLOBALS, 8), i0.inject(i2.HttpClient), i0.inject(i3.LocationStrategy)); }, token: ErrorLoggingService, providedIn: "root" });
    return ErrorLoggingService;
}());
export { ErrorLoggingService };
if (false) {
    /** @type {?} */
    ErrorLoggingService.prototype.globalConfig;
    /** @type {?} */
    ErrorLoggingService.prototype.httpClient;
    /** @type {?} */
    ErrorLoggingService.prototype.locationStrategy;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3ItbG9nZ2luZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1lcnJvci1sb2dnaW5nLyIsInNvdXJjZXMiOlsibGliL2Vycm9yLWxvZ2dpbmcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdELE9BQU8sRUFBRSxVQUFVLEVBQWUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RSxPQUFPLEtBQUssZ0JBQWdCLE1BQU0sb0JBQW9CLENBQUM7QUFHdkQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDOUQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLFdBQVcsQ0FBQzs7Ozs7O0lBUWhDLDZCQUN5QyxZQUFpQyxFQUM5RCxZQUNBO1FBRjZCLGlCQUFZLEdBQVosWUFBWSxDQUFxQjtRQUM5RCxlQUFVLEdBQVYsVUFBVTtRQUNWLHFCQUFnQixHQUFoQixnQkFBZ0I7S0FDeEI7Ozs7OztJQUVKLHdDQUFVOzs7OztJQUFWLFVBQVcsS0FBSyxFQUFFLEdBQXNCOztRQUVwQyxJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQzs7UUFDdEMsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUM7O1FBQzFDLElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsWUFBWSxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQzs7UUFDcEgsSUFBTSxVQUFVLEdBQUcsS0FBSyxZQUFZLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQzs7UUFDbkcsSUFBTSxPQUFPLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQzs7UUFDN0QsSUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sSUFBSSxLQUFLLENBQUMsUUFBUSxFQUFFLElBQUksYUFBYSxDQUFDOztRQUNuRSxJQUFNLFVBQVUsR0FBUSxLQUFLLFlBQVksaUJBQWlCLENBQUMsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7O1FBQ2xILElBQU0sSUFBSSxHQUFHLEtBQUssWUFBWSxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7O1FBQzVGLElBQU0sSUFBSSxHQUFHLEtBQUssWUFBWSxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUM7O1FBRTlGLElBQU0sV0FBVyxHQUFHO1lBQ2hCLElBQUksRUFBRSxJQUFJO1lBQ1YsS0FBSyxPQUFBO1lBQ0wsR0FBRyxLQUFBO1lBQ0gsR0FBRyxLQUFBO1lBQ0gsV0FBVyxFQUFFLFVBQVU7WUFDdkIsT0FBTyxTQUFBO1lBQ1AsS0FBSyxFQUFFLE9BQU87WUFDZCxJQUFJLE1BQUE7WUFDSixJQUFJLE1BQUE7WUFDSixVQUFVLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUM7U0FDekMsQ0FBQztRQUVGLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7S0FDN0M7Ozs7O0lBRUQseUNBQVc7Ozs7SUFBWCxVQUFZLEtBQUs7UUFDYixNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFO1lBQzNELE9BQU8sRUFBRTtnQkFDTCxlQUFlLEVBQUUsU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWTthQUM5RDtTQUNKLENBQUMsQ0FBQztLQUNOOztnQkE5Q0osVUFBVSxTQUFDO29CQUNSLFVBQVUsRUFBRSxNQUFNO2lCQUNyQjs7OztnQkFMUSxtQkFBbUIsdUJBVW5CLFFBQVEsWUFBSSxNQUFNLFNBQUMsT0FBTztnQkFmMUIsVUFBVTtnQkFDVixnQkFBZ0I7Ozs4QkFGekI7O1NBYWEsbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT3B0aW9uYWwsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cFJlcXVlc3QsIEh0dHBFcnJvclJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgTG9jYXRpb25TdHJhdGVneSwgUGF0aExvY2F0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0ICogYXMgU3RhY2tUcmFjZVBhcnNlciBmcm9tICdlcnJvci1zdGFjay1wYXJzZXInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBFcnJvckxvZ2dpbmdPcHRpb25zIH0gZnJvbSAnLi9lcnJvci1sb2dnaW5nLW9wdGlvbnMnO1xuaW1wb3J0IHsgR0xPQkFMUyB9IGZyb20gJy4vZ2xvYmFscyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5cbmV4cG9ydCBjbGFzcyBFcnJvckxvZ2dpbmdTZXJ2aWNlIHtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KEdMT0JBTFMpIHByaXZhdGUgZ2xvYmFsQ29uZmlnOiBFcnJvckxvZ2dpbmdPcHRpb25zLFxuICAgICAgICBwcml2YXRlIGh0dHBDbGllbnQ6IEh0dHBDbGllbnQsXG4gICAgICAgIHByaXZhdGUgbG9jYXRpb25TdHJhdGVneTogTG9jYXRpb25TdHJhdGVneSxcbiAgICApIHt9XG5cbiAgICBidWlsZEVycm9yKGVycm9yLCByZXE/OiBIdHRwUmVxdWVzdDxhbnk+KSB7XG5cbiAgICAgICAgY29uc3QgYXBwSWQgPSB0aGlzLmdsb2JhbENvbmZpZy5hcHBJZDtcbiAgICAgICAgY29uc3QgZW52ID0gdGhpcy5nbG9iYWxDb25maWcuZW52aXJvbm1lbnQ7XG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMubG9jYXRpb25TdHJhdGVneSBpbnN0YW5jZW9mIFBhdGhMb2NhdGlvblN0cmF0ZWd5ID8gdGhpcy5sb2NhdGlvblN0cmF0ZWd5LnBhdGgoKSA6ICdOb3QgYXBwbGljYWJsZSc7XG4gICAgICAgIGNvbnN0IHN0YXR1c0NvZGUgPSBlcnJvciBpbnN0YW5jZW9mIEh0dHBFcnJvclJlc3BvbnNlID8gZXJyb3Iuc3RhdHVzLnRvU3RyaW5nKCkgOiAnTm90IGFwcGxpY2FibGUnO1xuICAgICAgICBjb25zdCByZXF1ZXN0ID0gcmVxID8gSlNPTi5zdHJpbmdpZnkocmVxKSA6ICdOb3QgYXBwbGljYWJsZSc7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBlcnJvci5tZXNzYWdlIHx8IGVycm9yLnRvU3RyaW5nKCkgfHwgJ05vdCBkZWZpbmVkJztcbiAgICAgICAgY29uc3Qgc3RhY2t0cmFjZTogYW55ID0gZXJyb3IgaW5zdGFuY2VvZiBIdHRwRXJyb3JSZXNwb25zZSA/ICdObyBzdGFjayBhdmFpbGFibGUnIDogU3RhY2tUcmFjZVBhcnNlci5wYXJzZShlcnJvcik7XG4gICAgICAgIGNvbnN0IGZpbGUgPSBlcnJvciBpbnN0YW5jZW9mIEh0dHBFcnJvclJlc3BvbnNlID8gJ05vdCBhcHBsaWNhYmxlJyA6IHN0YWNrdHJhY2VbMF0uZmlsZU5hbWU7XG4gICAgICAgIGNvbnN0IGxpbmUgPSBlcnJvciBpbnN0YW5jZW9mIEh0dHBFcnJvclJlc3BvbnNlID8gJ05vdCBhcHBsaWNhYmxlJyA6IHN0YWNrdHJhY2VbMF0ubGluZU51bWJlcjtcblxuICAgICAgICBjb25zdCBlcnJvclRvU2VuZCA9IHtcbiAgICAgICAgICAgIHR5cGU6ICdKUycsXG4gICAgICAgICAgICBhcHBJZCxcbiAgICAgICAgICAgIGVudixcbiAgICAgICAgICAgIHVybCxcbiAgICAgICAgICAgIHN0YXR1c19jb2RlOiBzdGF0dXNDb2RlLFxuICAgICAgICAgICAgcmVxdWVzdCxcbiAgICAgICAgICAgIGVycm9yOiBtZXNzYWdlLFxuICAgICAgICAgICAgZmlsZSxcbiAgICAgICAgICAgIGxpbmUsXG4gICAgICAgICAgICBzdGFja3RyYWNlOiBKU09OLnN0cmluZ2lmeShzdGFja3RyYWNlKSxcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLnJlcG9ydEVycm9yKGVycm9yVG9TZW5kKS5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICByZXBvcnRFcnJvcihlcnJvcik6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBDbGllbnQucG9zdCh0aGlzLmdsb2JhbENvbmZpZy5lbmRwb2ludCwgZXJyb3IsIHtcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6ICdCZWFyZXIgJyArIHRoaXMuZ2xvYmFsQ29uZmlnLmFjY2Vzc190b2tlblxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=