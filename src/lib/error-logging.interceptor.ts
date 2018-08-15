import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ErrorLoggingService } from './error-logging.service';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class ErrorLoggingInterceptor implements HttpInterceptor {

    constructor(
        private errorLoggingService: ErrorLoggingService,
    ) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
        .pipe(
            tap(
                // Succeeds when there is a response; ignore other events
                (event: any) => {
                    if (event instanceof HttpResponse && event.status !== 200 && req.url !== this.errorLoggingService.endpoint) {
                        this.errorLoggingService.buildError(new Error(event.status + ' !== 200'), req);
                    }
                },
                // Operation failed; error is an HttpErrorResponse
                (error: HttpErrorResponse) => {
                    if (req.url !== this.errorLoggingService.endpoint) {
                        this.errorLoggingService.buildError(error, req);
                    }
                }
            )
        );
    }
}
