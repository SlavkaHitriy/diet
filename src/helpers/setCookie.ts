import { CookieOptions } from '@builder.io/qwik-city';

export function setCookie(
    name: string,
    value: string,
    options: CookieOptions = {},
) {
    options = {
        path: '/',
        ...options,
    };

    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }

    let updatedCookie =
        encodeURIComponent(name) + '=' + encodeURIComponent(value);

    for (let optionKey in options) {
        if (options.hasOwnProperty(optionKey)) {
            updatedCookie += '; ' + optionKey;

            // @ts-ignore
            if (options[optionKey] !== true) {
                // @ts-ignore
                updatedCookie += '=' + options[optionKey];
            }
        }
    }

    document.cookie = updatedCookie;
}
