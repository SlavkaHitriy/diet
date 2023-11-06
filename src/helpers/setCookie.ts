import { CookieOptions } from '@builder.io/qwik-city';




export function setCookie(name: string, value:string, options:CookieOptions = {}) {
    options = {
      path: '/',
      ...options
    };
  
    if (options.expires instanceof Date) {
      options.expires = options.expires.toUTCString();
    }
  
    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
  
    for (let optionKey in options) {
      updatedCookie += "; " + optionKey;
      // @ts-ignore
      let optionValue = options[optionKey] as string;
      // @ts-ignore
      if (optionValue !== true) {
        updatedCookie += "=" + optionValue;
      }
    }
  
    document.cookie = updatedCookie;
}