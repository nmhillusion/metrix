interface CookieModel {
  name: string;
  value: string;
  path?: string;
  domain?: string;
  maxAgeInSeconds?: number;
  expires?: Date;
  secure?: boolean;
  samesite?: "lax" | "strict" | "none";
}

export class CookieMix {
  static setCookie(cookie: CookieModel): string {
    const cookieStatementArray = [`${cookie.name}=${cookie.value}`];

    if (cookie.path) {
      cookieStatementArray.push(`path=${cookie.path}`);
    }

    if (cookie.domain) {
      cookieStatementArray.push(`domain=${cookie.domain}`);
    }

    if (cookie.maxAgeInSeconds) {
      cookieStatementArray.push(`max-age=${cookie.maxAgeInSeconds}`);
    }

    if (cookie.expires) {
      cookieStatementArray.push(
        `expires=${new Date(cookie.expires).toUTCString()}`
      );
    }

    if (cookie.secure) {
      cookieStatementArray.push(`secure`);
    }

    if (cookie.samesite) {
      cookieStatementArray.push(`samesite=${cookie.samesite}`);
    }

    const combinedCookieStatement = cookieStatementArray.join(";");
    if ("object" == typeof document) {
      document.cookie = combinedCookieStatement;
    }
    return combinedCookieStatement;
  }
}
