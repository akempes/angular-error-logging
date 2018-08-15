export declare class JsError {
    type: 'JS http' | 'JS runtime';
    status_code: string;
    error: string;
    file: string;
    line: string;
    stacktrac: string;
    constructor(type: 'JS http' | 'JS runtime', status_code: string, error: string, file?: string, line?: string, stacktrac?: string);
}
