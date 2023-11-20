import { component$, Slot } from '@builder.io/qwik';
import type { RequestHandler } from '@builder.io/qwik-city';

export const onRequest: RequestHandler = async ({ redirect, url, cookie }) => {
    if (cookie.get('accessToken') && url.pathname.includes('auth')) {
        throw redirect(308, new URL('/', url).toString());
    } else if (!cookie.get('accessToken') && !url.pathname.includes('auth')) {
        throw redirect(308, new URL('/auth/login', url).toString());
    }
};

export default component$(() => {
    return <Slot />;
});
