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
        this.endpoint = 'https://dashboard.7dev.nl/api/logs';
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
        return this.httpClient.post(this.endpoint, error, {
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
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [GLOBALS,] }] },
    { type: HttpClient },
    { type: LocationStrategy }
];
/** @nocollapse */ ErrorLoggingService.ngInjectableDef = i0.defineInjectable({ factory: function ErrorLoggingService_Factory() { return new ErrorLoggingService(i0.inject(i1.GLOBALS, 8), i0.inject(i2.HttpClient), i0.inject(i3.LocationStrategy)); }, token: ErrorLoggingService, providedIn: "root" });
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3ItbG9nZ2luZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1lcnJvci1sb2dnaW5nLyIsInNvdXJjZXMiOlsibGliL2Vycm9yLWxvZ2dpbmcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdELE9BQU8sRUFBRSxVQUFVLEVBQWUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RSxPQUFPLEtBQUssZ0JBQWdCLE1BQU0sb0JBQW9CLENBQUM7QUFJdkQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLFdBQVcsQ0FBQzs7Ozs7QUFNcEMsTUFBTTs7Ozs7O0lBSUYsWUFDeUMsWUFBaUMsRUFDOUQsWUFDQTtRQUY2QixpQkFBWSxHQUFaLFlBQVksQ0FBcUI7UUFDOUQsZUFBVSxHQUFWLFVBQVU7UUFDVixxQkFBZ0IsR0FBaEIsZ0JBQWdCO3dCQUxWLG9DQUFvQztLQU1sRDs7Ozs7O0lBRUosVUFBVSxDQUFDLEtBQUssRUFBRSxHQUFzQjs7UUFFcEMsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUM7O1FBQ3RDLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDOztRQUMxQyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLFlBQVksb0JBQW9CLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUM7O1FBQ3BILE1BQU0sVUFBVSxHQUFHLEtBQUssWUFBWSxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUM7O1FBQ25HLE1BQU0sT0FBTyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUM7O1FBQzdELE1BQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLElBQUksS0FBSyxDQUFDLFFBQVEsRUFBRSxJQUFJLGFBQWEsQ0FBQzs7UUFDbkUsTUFBTSxVQUFVLEdBQVEsS0FBSyxZQUFZLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDOztRQUNsSCxNQUFNLElBQUksR0FBRyxLQUFLLFlBQVksaUJBQWlCLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDOztRQUM1RixNQUFNLElBQUksR0FBRyxLQUFLLFlBQVksaUJBQWlCLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDOztRQUU5RixNQUFNLFdBQVcsR0FBRztZQUNoQixJQUFJLEVBQUUsSUFBSTtZQUNWLEtBQUs7WUFDTCxHQUFHO1lBQ0gsR0FBRztZQUNILFdBQVcsRUFBRSxVQUFVO1lBQ3ZCLE9BQU87WUFDUCxLQUFLLEVBQUUsT0FBTztZQUNkLElBQUk7WUFDSixJQUFJO1lBQ0osVUFBVSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDO1NBQ3pDLENBQUM7UUFFRixJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO0tBQzdDOzs7OztJQUVELFdBQVcsQ0FBQyxLQUFLO1FBQ2IsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFO1lBQzlDLE9BQU8sRUFBRTtnQkFDTCxlQUFlLEVBQUUsU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWTthQUM5RDtTQUNKLENBQUMsQ0FBQztLQUNOOzs7WUFoREosVUFBVSxTQUFDO2dCQUNSLFVBQVUsRUFBRSxNQUFNO2FBQ3JCOzs7OzRDQU9RLFFBQVEsWUFBSSxNQUFNLFNBQUMsT0FBTztZQWpCMUIsVUFBVTtZQUNWLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE9wdGlvbmFsLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBSZXF1ZXN0LCBIdHRwRXJyb3JSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IExvY2F0aW9uU3RyYXRlZ3ksIFBhdGhMb2NhdGlvblN0cmF0ZWd5IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCAqIGFzIFN0YWNrVHJhY2VQYXJzZXIgZnJvbSAnZXJyb3Itc3RhY2stcGFyc2VyJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgRXJyb3JMb2dnaW5nT3B0aW9ucyB9IGZyb20gJy4vZXJyb3ItbG9nZ2luZy1vcHRpb25zJztcbmltcG9ydCB7IEdMT0JBTFMgfSBmcm9tICcuL2dsb2JhbHMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuXG5leHBvcnQgY2xhc3MgRXJyb3JMb2dnaW5nU2VydmljZSB7XG5cbiAgICBwdWJsaWMgZW5kcG9pbnQgPSAnaHR0cHM6Ly9kYXNoYm9hcmQuN2Rldi5ubC9hcGkvbG9ncyc7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChHTE9CQUxTKSBwcml2YXRlIGdsb2JhbENvbmZpZzogRXJyb3JMb2dnaW5nT3B0aW9ucyxcbiAgICAgICAgcHJpdmF0ZSBodHRwQ2xpZW50OiBIdHRwQ2xpZW50LFxuICAgICAgICBwcml2YXRlIGxvY2F0aW9uU3RyYXRlZ3k6IExvY2F0aW9uU3RyYXRlZ3ksXG4gICAgKSB7fVxuXG4gICAgYnVpbGRFcnJvcihlcnJvciwgcmVxPzogSHR0cFJlcXVlc3Q8YW55Pikge1xuXG4gICAgICAgIGNvbnN0IGFwcElkID0gdGhpcy5nbG9iYWxDb25maWcuYXBwSWQ7XG4gICAgICAgIGNvbnN0IGVudiA9IHRoaXMuZ2xvYmFsQ29uZmlnLmVudmlyb25tZW50O1xuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmxvY2F0aW9uU3RyYXRlZ3kgaW5zdGFuY2VvZiBQYXRoTG9jYXRpb25TdHJhdGVneSA/IHRoaXMubG9jYXRpb25TdHJhdGVneS5wYXRoKCkgOiAnTm90IGFwcGxpY2FibGUnO1xuICAgICAgICBjb25zdCBzdGF0dXNDb2RlID0gZXJyb3IgaW5zdGFuY2VvZiBIdHRwRXJyb3JSZXNwb25zZSA/IGVycm9yLnN0YXR1cy50b1N0cmluZygpIDogJ05vdCBhcHBsaWNhYmxlJztcbiAgICAgICAgY29uc3QgcmVxdWVzdCA9IHJlcSA/IEpTT04uc3RyaW5naWZ5KHJlcSkgOiAnTm90IGFwcGxpY2FibGUnO1xuICAgICAgICBjb25zdCBtZXNzYWdlID0gZXJyb3IubWVzc2FnZSB8fCBlcnJvci50b1N0cmluZygpIHx8ICdOb3QgZGVmaW5lZCc7XG4gICAgICAgIGNvbnN0IHN0YWNrdHJhY2U6IGFueSA9IGVycm9yIGluc3RhbmNlb2YgSHR0cEVycm9yUmVzcG9uc2UgPyAnTm8gc3RhY2sgYXZhaWxhYmxlJyA6IFN0YWNrVHJhY2VQYXJzZXIucGFyc2UoZXJyb3IpO1xuICAgICAgICBjb25zdCBmaWxlID0gZXJyb3IgaW5zdGFuY2VvZiBIdHRwRXJyb3JSZXNwb25zZSA/ICdOb3QgYXBwbGljYWJsZScgOiBzdGFja3RyYWNlWzBdLmZpbGVOYW1lO1xuICAgICAgICBjb25zdCBsaW5lID0gZXJyb3IgaW5zdGFuY2VvZiBIdHRwRXJyb3JSZXNwb25zZSA/ICdOb3QgYXBwbGljYWJsZScgOiBzdGFja3RyYWNlWzBdLmxpbmVOdW1iZXI7XG5cbiAgICAgICAgY29uc3QgZXJyb3JUb1NlbmQgPSB7XG4gICAgICAgICAgICB0eXBlOiAnSlMnLFxuICAgICAgICAgICAgYXBwSWQsXG4gICAgICAgICAgICBlbnYsXG4gICAgICAgICAgICB1cmwsXG4gICAgICAgICAgICBzdGF0dXNfY29kZTogc3RhdHVzQ29kZSxcbiAgICAgICAgICAgIHJlcXVlc3QsXG4gICAgICAgICAgICBlcnJvcjogbWVzc2FnZSxcbiAgICAgICAgICAgIGZpbGUsXG4gICAgICAgICAgICBsaW5lLFxuICAgICAgICAgICAgc3RhY2t0cmFjZTogSlNPTi5zdHJpbmdpZnkoc3RhY2t0cmFjZSksXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5yZXBvcnRFcnJvcihlcnJvclRvU2VuZCkuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgcmVwb3J0RXJyb3IoZXJyb3IpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwQ2xpZW50LnBvc3QodGhpcy5lbmRwb2ludCwgZXJyb3IsIHtcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6ICdCZWFyZXIgJyArIHRoaXMuZ2xvYmFsQ29uZmlnLmFjY2Vzc190b2tlblxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=