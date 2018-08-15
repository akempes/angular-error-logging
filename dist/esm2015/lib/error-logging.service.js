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
export class ErrorLoggingService {
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
        const stacktrace = error instanceof HttpErrorResponse ? 'No stack available' : StackTraceParser.parse(error);
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
/** @nocollapse */ ErrorLoggingService.ngInjectableDef = i0.defineInjectable({ factory: function ErrorLoggingService_Factory() { return new ErrorLoggingService(i0.inject(i1.GLOBALS, 8), i0.inject(i2.HttpClient), i0.inject(i3.LocationStrategy)); }, token: ErrorLoggingService, providedIn: "root" });
if (false) {
    /** @type {?} */
    ErrorLoggingService.prototype.globalConfig;
    /** @type {?} */
    ErrorLoggingService.prototype.httpClient;
    /** @type {?} */
    ErrorLoggingService.prototype.locationStrategy;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3ItbG9nZ2luZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1lcnJvci1sb2dnaW5nLyIsInNvdXJjZXMiOlsibGliL2Vycm9yLWxvZ2dpbmcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdELE9BQU8sRUFBRSxVQUFVLEVBQWUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RSxPQUFPLEtBQUssZ0JBQWdCLE1BQU0sb0JBQW9CLENBQUM7QUFHdkQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDOUQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLFdBQVcsQ0FBQzs7Ozs7QUFNcEMsTUFBTTs7Ozs7O0lBRUYsWUFDeUMsWUFBaUMsRUFDOUQsWUFDQTtRQUY2QixpQkFBWSxHQUFaLFlBQVksQ0FBcUI7UUFDOUQsZUFBVSxHQUFWLFVBQVU7UUFDVixxQkFBZ0IsR0FBaEIsZ0JBQWdCO0tBQ3hCOzs7Ozs7SUFFSixVQUFVLENBQUMsS0FBSyxFQUFFLEdBQXNCOztRQUVwQyxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQzs7UUFDdEMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUM7O1FBQzFDLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsWUFBWSxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQzs7UUFDcEgsTUFBTSxVQUFVLEdBQUcsS0FBSyxZQUFZLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQzs7UUFDbkcsTUFBTSxPQUFPLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQzs7UUFDN0QsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sSUFBSSxLQUFLLENBQUMsUUFBUSxFQUFFLElBQUksYUFBYSxDQUFDOztRQUNuRSxNQUFNLFVBQVUsR0FBUSxLQUFLLFlBQVksaUJBQWlCLENBQUMsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7O1FBQ2xILE1BQU0sSUFBSSxHQUFHLEtBQUssWUFBWSxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7O1FBQzVGLE1BQU0sSUFBSSxHQUFHLEtBQUssWUFBWSxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUM7O1FBRTlGLE1BQU0sV0FBVyxHQUFHO1lBQ2hCLElBQUksRUFBRSxJQUFJO1lBQ1YsS0FBSztZQUNMLEdBQUc7WUFDSCxHQUFHO1lBQ0gsV0FBVyxFQUFFLFVBQVU7WUFDdkIsT0FBTztZQUNQLEtBQUssRUFBRSxPQUFPO1lBQ2QsSUFBSTtZQUNKLElBQUk7WUFDSixVQUFVLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUM7U0FDekMsQ0FBQztRQUVGLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7S0FDN0M7Ozs7O0lBRUQsV0FBVyxDQUFDLEtBQUs7UUFDYixNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFO1lBQzNELE9BQU8sRUFBRTtnQkFDTCxlQUFlLEVBQUUsU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWTthQUM5RDtTQUNKLENBQUMsQ0FBQztLQUNOOzs7WUE5Q0osVUFBVSxTQUFDO2dCQUNSLFVBQVUsRUFBRSxNQUFNO2FBQ3JCOzs7O1lBTFEsbUJBQW1CLHVCQVVuQixRQUFRLFlBQUksTUFBTSxTQUFDLE9BQU87WUFmMUIsVUFBVTtZQUNWLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE9wdGlvbmFsLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBSZXF1ZXN0LCBIdHRwRXJyb3JSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IExvY2F0aW9uU3RyYXRlZ3ksIFBhdGhMb2NhdGlvblN0cmF0ZWd5IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCAqIGFzIFN0YWNrVHJhY2VQYXJzZXIgZnJvbSAnZXJyb3Itc3RhY2stcGFyc2VyJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgRXJyb3JMb2dnaW5nT3B0aW9ucyB9IGZyb20gJy4vZXJyb3ItbG9nZ2luZy1vcHRpb25zJztcbmltcG9ydCB7IEdMT0JBTFMgfSBmcm9tICcuL2dsb2JhbHMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuXG5leHBvcnQgY2xhc3MgRXJyb3JMb2dnaW5nU2VydmljZSB7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChHTE9CQUxTKSBwcml2YXRlIGdsb2JhbENvbmZpZzogRXJyb3JMb2dnaW5nT3B0aW9ucyxcbiAgICAgICAgcHJpdmF0ZSBodHRwQ2xpZW50OiBIdHRwQ2xpZW50LFxuICAgICAgICBwcml2YXRlIGxvY2F0aW9uU3RyYXRlZ3k6IExvY2F0aW9uU3RyYXRlZ3ksXG4gICAgKSB7fVxuXG4gICAgYnVpbGRFcnJvcihlcnJvciwgcmVxPzogSHR0cFJlcXVlc3Q8YW55Pikge1xuXG4gICAgICAgIGNvbnN0IGFwcElkID0gdGhpcy5nbG9iYWxDb25maWcuYXBwSWQ7XG4gICAgICAgIGNvbnN0IGVudiA9IHRoaXMuZ2xvYmFsQ29uZmlnLmVudmlyb25tZW50O1xuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmxvY2F0aW9uU3RyYXRlZ3kgaW5zdGFuY2VvZiBQYXRoTG9jYXRpb25TdHJhdGVneSA/IHRoaXMubG9jYXRpb25TdHJhdGVneS5wYXRoKCkgOiAnTm90IGFwcGxpY2FibGUnO1xuICAgICAgICBjb25zdCBzdGF0dXNDb2RlID0gZXJyb3IgaW5zdGFuY2VvZiBIdHRwRXJyb3JSZXNwb25zZSA/IGVycm9yLnN0YXR1cy50b1N0cmluZygpIDogJ05vdCBhcHBsaWNhYmxlJztcbiAgICAgICAgY29uc3QgcmVxdWVzdCA9IHJlcSA/IEpTT04uc3RyaW5naWZ5KHJlcSkgOiAnTm90IGFwcGxpY2FibGUnO1xuICAgICAgICBjb25zdCBtZXNzYWdlID0gZXJyb3IubWVzc2FnZSB8fCBlcnJvci50b1N0cmluZygpIHx8ICdOb3QgZGVmaW5lZCc7XG4gICAgICAgIGNvbnN0IHN0YWNrdHJhY2U6IGFueSA9IGVycm9yIGluc3RhbmNlb2YgSHR0cEVycm9yUmVzcG9uc2UgPyAnTm8gc3RhY2sgYXZhaWxhYmxlJyA6IFN0YWNrVHJhY2VQYXJzZXIucGFyc2UoZXJyb3IpO1xuICAgICAgICBjb25zdCBmaWxlID0gZXJyb3IgaW5zdGFuY2VvZiBIdHRwRXJyb3JSZXNwb25zZSA/ICdOb3QgYXBwbGljYWJsZScgOiBzdGFja3RyYWNlWzBdLmZpbGVOYW1lO1xuICAgICAgICBjb25zdCBsaW5lID0gZXJyb3IgaW5zdGFuY2VvZiBIdHRwRXJyb3JSZXNwb25zZSA/ICdOb3QgYXBwbGljYWJsZScgOiBzdGFja3RyYWNlWzBdLmxpbmVOdW1iZXI7XG5cbiAgICAgICAgY29uc3QgZXJyb3JUb1NlbmQgPSB7XG4gICAgICAgICAgICB0eXBlOiAnSlMnLFxuICAgICAgICAgICAgYXBwSWQsXG4gICAgICAgICAgICBlbnYsXG4gICAgICAgICAgICB1cmwsXG4gICAgICAgICAgICBzdGF0dXNfY29kZTogc3RhdHVzQ29kZSxcbiAgICAgICAgICAgIHJlcXVlc3QsXG4gICAgICAgICAgICBlcnJvcjogbWVzc2FnZSxcbiAgICAgICAgICAgIGZpbGUsXG4gICAgICAgICAgICBsaW5lLFxuICAgICAgICAgICAgc3RhY2t0cmFjZTogSlNPTi5zdHJpbmdpZnkoc3RhY2t0cmFjZSksXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5yZXBvcnRFcnJvcihlcnJvclRvU2VuZCkuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgcmVwb3J0RXJyb3IoZXJyb3IpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwQ2xpZW50LnBvc3QodGhpcy5nbG9iYWxDb25maWcuZW5kcG9pbnQsIGVycm9yLCB7XG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiAnQmVhcmVyICcgKyB0aGlzLmdsb2JhbENvbmZpZy5hY2Nlc3NfdG9rZW5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl19