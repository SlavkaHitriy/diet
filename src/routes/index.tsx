import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import MainForm from '~/components/MainForm/MainForm';
import { routeLoader$ } from '@builder.io/qwik-city';
import { InitialValues } from '@modular-forms/qwik';

export type PersonalForm = {
    age: number | null;
    height: number | null;
    weight: number | null;
    physicalActivity: string;
    gender: 0 | 1;
    goal: 0 | 1 | 2;
};

export type AdditionalForm = {
    allergies: string;
    foodRestrictions: string;
    foodPreferences: string;
    dislikeFood: string;
};

export const useFormLoader = routeLoader$<InitialValues<PersonalForm>>(() => ({
    age: null,
    height: null,
    weight: null,
    physicalActivity: '',
    gender: 0,
    goal: 0,
}));

export const useAdditionalFormLoader = routeLoader$<
    InitialValues<AdditionalForm>
>(() => ({
    allergies: '',
    foodRestrictions: '',
    foodPreferences: '',
    dislikeFood: '',
}));

export default component$(() => {
    return (
        <div class={'container'}>
            <MainForm />
        </div>
    );
});

export const head: DocumentHead = {
    title: 'Створення дієти',
    meta: [
        {
            name: 'description',
            content: 'Qwik site description',
        },
    ],
};
