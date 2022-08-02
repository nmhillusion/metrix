export interface UrlParserResult {
    readonly protocal: string;
    readonly host: string;
    readonly path: string;
    readonly paramMap: Map<string, string[]>;
}
export declare class UrlParser {
    static parse(url: string): UrlParserResult | undefined;
    static mergeParams(url?: string, params?: {
        [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
    }): string | undefined;
}
//# sourceMappingURL=url.parser.d.ts.map