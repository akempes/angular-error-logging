import { Injectable, Optional, Inject } from '@angular/core';
import { HttpClient, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import * as StackTraceParser from 'error-stack-parser';
import { Observable } from 'rxjs';

import { ErrorLoggingOptions } from './error-logging-options';
import { GLOBALS } from './globals';

@Injectable({
    providedIn: 'root'
})

export class ErrorLoggingService {

    public endpoint = 'https://dashboard.7dev.nl/api/logs';

    constructor(
        @Optional() @Inject(GLOBALS) private globalConfig: ErrorLoggingOptions,
        private httpClient: HttpClient,
        private locationStrategy: LocationStrategy,
    ) {}

    buildError(error, req?: HttpRequest<any>) {

        const appId = this.globalConfig.appId;
        const env = this.globalConfig.environment;
        const url = this.locationStrategy instanceof PathLocationStrategy ? this.locationStrategy.path() : 'Not applicable';
        const statusCode = error instanceof HttpErrorResponse ? error.status.toString() : 'Not applicable';
        const request = req ? JSON.stringify(req) : 'Not applicable';
        const message = error.message || error.toString() || 'Not defined';
        const stacktrace: any = error instanceof HttpErrorResponse ? 'No stack available' : StackTraceParser.parse(error);
        const file = error instanceof HttpErrorResponse ? 'Not applicable' : stacktrace[0].fileName;
        const line = error instanceof HttpErrorResponse ? 'Not applicable' : stacktrace[0].lineNumber;

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

    reportError(error): Observable<any> {
        return this.httpClient.post(this.endpoint, error, {
            headers: {
                'Authorization': 'Bearer ' + this.globalConfig.access_token
            }
        });
    }
}
