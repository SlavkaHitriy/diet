import { component$, Slot } from '@builder.io/qwik';
import type { RequestHandler } from '@builder.io/qwik-city';
import { useLocation } from '@builder.io/qwik-city';
import { Header } from '~/components/Header/Header';

export const onRequest: RequestHandler = async ({ redirect, url, cookie }) => {
    if (cookie.get('accessToken') && url.pathname.includes('auth')) {
        throw redirect(308, new URL('/', url).toString());
    } else if (!cookie.get('accessToken') && !url.pathname.includes('auth')) {
        throw redirect(308, new URL('/auth/login', url).toString());
    }
};

export default component$(() => {
    const location = useLocation();

    return (
        <>
            {!location.url.pathname.includes('auth') && <Header />}
            <Slot />
        </>
    );
});
