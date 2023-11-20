import { $, component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { api } from '~/api';

export default component$(() => {
    const testApi = $(async () => {
        const response = await api.addDietData({
            userId: localStorage.getItem('userId'),
            age: 22,
            height: 175,
            weight: 82,
            gender: 0,
            goal: 1,
            physicalActivity: 'Сидячий спосіб життя',
        });

        console.log(response);
    });

    return (
        <>
            <button onClick$={testApi}>Test API</button>
        </>
    );
});

export const head: DocumentHead = {
    title: 'Welcome to Qwik',
    meta: [
        {
            name: 'description',
            content: 'Qwik site description',
        },
    ],
};
