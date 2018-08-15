import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ErrorLoggingService } from './error-logging.service';
/** Pass untouched request through to the next request handler. */
export declare class ErrorLoggingInterceptor implements HttpInterceptor {
    private errorLoggingService;
    constructor(errorLoggingService: ErrorLoggingService);
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
}
