import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import FavoriteContent from '~/components/FavoriteContent/FavoriteContent';

export default component$(() => {
    return <FavoriteContent />;
});

export const head: DocumentHead = {
    title: 'Обране',
};
