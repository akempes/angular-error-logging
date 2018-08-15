import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { ErrorLoggingService } from './error-logging.service';

// our global error handler
@Injectable()
export class ErrorLoggingHandler extends ErrorHandler {

    constructor(
        private injector: Injector,
    ) {
        super();
    }

    handleError(error) {
        if (!(error instanceof HttpErrorResponse)) {
            const errorLoggingService = this.injector.get(ErrorLoggingService);
            errorLoggingService.buildError(error);
        }
        super.handleError(error);
    }

}
