import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import ProfileContent from '~/components/ProfileContent/ProfileContent';

export default component$(() => {
    return <ProfileContent />;
});

export const head: DocumentHead = {
    title: 'Профіль',
};
