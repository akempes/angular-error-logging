export class JsError {
    constructor(
        public type: 'JS http' | 'JS runtime',
        public status_code: string,
        public error: string,
        public file?: string,
        public line?: string,
        public stacktrac?: string,
    ) {}
}
