import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ErrorLoggingService } from './error-logging.service';
import { ErrorLoggingOptions } from './error-logging-options';
/** Pass untouched request through to the next request handler. */
export declare class ErrorLoggingInterceptor implements HttpInterceptor {
    private globalConfig;
    private errorLoggingService;
    constructor(globalConfig: ErrorLoggingOptions, errorLoggingService: ErrorLoggingService);
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
}
