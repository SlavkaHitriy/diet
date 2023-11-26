import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import AboutContent from '~/components/AboutContent/AboutContent';

export default component$(() => {
    return <AboutContent />;
});

export const head: DocumentHead = {
    title: 'Про нас',
};
