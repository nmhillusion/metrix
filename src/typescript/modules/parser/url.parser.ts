export interface UrlParserResult {
  readonly protocal: string;
  readonly host: string;
  readonly path: string;
  readonly paramMap: Map<string, string[]>;
}

function parseQueryParams(queryParams: string | null): Map<string, string[]> {
  const resultMap: Map<string, string[]> = new Map();

  if (queryParams) {
    const pairs = queryParams.split("&");
    for (const pair of pairs) {
      const [key, value] = pair.split("=");

      if (key.trim() && value.trim()) {
        const cKey = key.trim();
        const cValue = value.trim();

        if (!resultMap.has(cKey)) {
          resultMap.set(cKey, [cValue]);
        } else {
          const itemList = resultMap.get(cKey);
          itemList.push(cValue);
        }
      }
    }
  }

  return resultMap;
}

export class UrlParser {
  static parse(url: string): UrlParserResult | undefined {
    const parserPattern = /^(http|https):\/\/(.+?)(?:\/(.*?))?(?:\?(.*?))?$/;
    if (parserPattern.test(url)) {
      const [matched, protocal, host, path, paramQuery] =
        url.match(parserPattern);

      return {
        protocal,
        host,
        path,
        paramMap: parseQueryParams(paramQuery),
      };
    }
  }
}
