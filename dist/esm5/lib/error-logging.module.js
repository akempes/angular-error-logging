/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule, ErrorHandler } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorLoggingHandler } from './error-logging.handler';
import { ErrorLoggingInterceptor } from './error-logging.interceptor';
import { ErrorLoggingService } from './error-logging.service';
import { GLOBALS } from './globals';
var ErrorLoggingModule = /** @class */ (function () {
    function ErrorLoggingModule() {
    }
    /**
     * @param {?} globalOptions
     * @return {?}
     */
    ErrorLoggingModule.forRoot = /**
     * @param {?} globalOptions
     * @return {?}
     */
    function (globalOptions) {
        return {
            ngModule: ErrorLoggingModule,
            providers: [
                ErrorLoggingService,
                { provide: GLOBALS, useValue: globalOptions }
            ]
        };
    };
    ErrorLoggingModule.decorators = [
        { type: NgModule, args: [{
                    imports: [],
                    declarations: [],
                    exports: [],
                    providers: [
                        { provide: ErrorHandler, useClass: ErrorLoggingHandler },
                        { provide: HTTP_INTERCEPTORS, useClass: ErrorLoggingInterceptor, multi: true },
                    ]
                },] },
    ];
    return ErrorLoggingModule;
}());
export { ErrorLoggingModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3ItbG9nZ2luZy5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWVycm9yLWxvZ2dpbmcvIiwic291cmNlcyI6WyJsaWIvZXJyb3ItbG9nZ2luZy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQXVCLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM1RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUd6RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUN0RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sV0FBVyxDQUFDOzs7Ozs7OztJQWN6QiwwQkFBTzs7OztJQUFkLFVBQWUsYUFBa0M7UUFDN0MsTUFBTSxDQUFDO1lBQ0gsUUFBUSxFQUFFLGtCQUFrQjtZQUM1QixTQUFTLEVBQUU7Z0JBQ1AsbUJBQW1CO2dCQUNuQixFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLGFBQWEsRUFBRTthQUNoRDtTQUNKLENBQUM7S0FDTDs7Z0JBcEJKLFFBQVEsU0FBQztvQkFDTixPQUFPLEVBQUUsRUFBRTtvQkFDWCxZQUFZLEVBQUUsRUFDYjtvQkFDRCxPQUFPLEVBQUUsRUFDUjtvQkFDRCxTQUFTLEVBQUU7d0JBQ1AsRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxtQkFBbUIsRUFBRTt3QkFDeEQsRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsUUFBUSxFQUFFLHVCQUF1QixFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUU7cUJBQ2pGO2lCQUNKOzs2QkFuQkQ7O1NBb0JhLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzLCBFcnJvckhhbmRsZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEhUVFBfSU5URVJDRVBUT1JTIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuXG5pbXBvcnQgeyBFcnJvckxvZ2dpbmdPcHRpb25zIH0gZnJvbSAnLi9lcnJvci1sb2dnaW5nLW9wdGlvbnMnO1xuaW1wb3J0IHsgRXJyb3JMb2dnaW5nSGFuZGxlciB9IGZyb20gJy4vZXJyb3ItbG9nZ2luZy5oYW5kbGVyJztcbmltcG9ydCB7IEVycm9yTG9nZ2luZ0ludGVyY2VwdG9yIH0gZnJvbSAnLi9lcnJvci1sb2dnaW5nLmludGVyY2VwdG9yJztcbmltcG9ydCB7IEVycm9yTG9nZ2luZ1NlcnZpY2UgfSBmcm9tICcuL2Vycm9yLWxvZ2dpbmcuc2VydmljZSc7XG5pbXBvcnQgeyBHTE9CQUxTIH0gZnJvbSAnLi9nbG9iYWxzJztcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7IHByb3ZpZGU6IEVycm9ySGFuZGxlciwgdXNlQ2xhc3M6IEVycm9yTG9nZ2luZ0hhbmRsZXIgfSxcbiAgICAgICAgeyBwcm92aWRlOiBIVFRQX0lOVEVSQ0VQVE9SUywgdXNlQ2xhc3M6IEVycm9yTG9nZ2luZ0ludGVyY2VwdG9yLCBtdWx0aTogdHJ1ZSB9LFxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgRXJyb3JMb2dnaW5nTW9kdWxlIHtcbiAgICBzdGF0aWMgZm9yUm9vdChnbG9iYWxPcHRpb25zOiBFcnJvckxvZ2dpbmdPcHRpb25zKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuZ01vZHVsZTogRXJyb3JMb2dnaW5nTW9kdWxlLFxuICAgICAgICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgICAgICAgICAgRXJyb3JMb2dnaW5nU2VydmljZSxcbiAgICAgICAgICAgICAgICB7IHByb3ZpZGU6IEdMT0JBTFMsIHVzZVZhbHVlOiBnbG9iYWxPcHRpb25zIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfTtcbiAgICB9XG59XG4iXX0=