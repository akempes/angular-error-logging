import { Injectable, Inject, Optional } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ErrorLoggingService } from './error-logging.service';
import { ErrorLoggingOptions } from './error-logging-options';
import { GLOBALS } from './globals';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class ErrorLoggingInterceptor implements HttpInterceptor {

    constructor(
        @Optional() @Inject(GLOBALS) private globalConfig: ErrorLoggingOptions,
        private errorLoggingService: ErrorLoggingService,
    ) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
        .pipe(
            tap(
                // Succeeds when there is a response; ignore other events
                (event: any) => {
                    if (
                      event instanceof HttpResponse && event.status !== 200 &&
                      event.status !== 401 &&
                      event.status !== 403 &&
                      req.url !== this.globalConfig.endpoint
                    ) {
                        this.errorLoggingService.buildError(new Error(event.status + ' !== 200'), req);
                    }
                },
                // Operation failed; error is an HttpErrorResponse
                (error: HttpErrorResponse) => {

                    if (req.url !== this.globalConfig.endpoint && error.status !== 401 && error.status !== 403) {
                        this.errorLoggingService.buildError(error, req);
                    }
                }
            )
        );
    }
}
