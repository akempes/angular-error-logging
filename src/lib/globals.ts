import { ErrorLoggingOptions } from './error-logging-options';
import { InjectionToken } from '@angular/core';

export const GLOBALS: InjectionToken<ErrorLoggingOptions> = new InjectionToken('Global config for error-logging');
