import { ErrorHandler, Injector } from '@angular/core';
export declare class ErrorLoggingHandler extends ErrorHandler {
    private injector;
    constructor(injector: Injector);
    handleError(error: any): void;
}
