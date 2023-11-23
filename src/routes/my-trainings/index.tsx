import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import TrainingContent from '~/components/TrainingContent/TrainingContent';

export default component$(() => {
    return <TrainingContent />;
});

export const head: DocumentHead = {
    title: 'Моє тренування',
};
