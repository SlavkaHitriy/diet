import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import DietContent from '~/components/DietContent/DietContent';

export default component$(() => {
    return <DietContent />;
});

export const head: DocumentHead = {
    title: 'Моя дієта',
};
