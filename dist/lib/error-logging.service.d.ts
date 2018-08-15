import { HttpClient, HttpRequest } from '@angular/common/http';
import { LocationStrategy } from '@angular/common';
import { Observable } from 'rxjs';
import { ErrorLoggingOptions } from './error-logging-options';
export declare class ErrorLoggingService {
    private globalConfig;
    private httpClient;
    private locationStrategy;
    endpoint: string;
    constructor(globalConfig: ErrorLoggingOptions, httpClient: HttpClient, locationStrategy: LocationStrategy);
    buildError(error: any, req?: HttpRequest<any>): void;
    reportError(error: any): Observable<any>;
}
