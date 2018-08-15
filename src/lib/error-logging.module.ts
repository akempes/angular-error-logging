import { NgModule, ModuleWithProviders, ErrorHandler } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ErrorLoggingOptions } from './error-logging-options';
import { ErrorLoggingHandler } from './error-logging.handler';
import { ErrorLoggingInterceptor } from './error-logging.interceptor';
import { ErrorLoggingService } from './error-logging.service';
import { GLOBALS } from './globals';

@NgModule({
    imports: [],
    declarations: [
    ],
    exports: [
    ],
    providers: [
        { provide: ErrorHandler, useClass: ErrorLoggingHandler },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorLoggingInterceptor, multi: true },
    ]
})
export class ErrorLoggingModule {
    static forRoot(globalOptions: ErrorLoggingOptions): ModuleWithProviders {
        return {
            ngModule: ErrorLoggingModule,
            providers: [
                ErrorLoggingService,
                { provide: GLOBALS, useValue: globalOptions }
            ]
        };
    }
}
