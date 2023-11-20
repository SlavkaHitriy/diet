import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { routeLoader$ } from '@builder.io/qwik-city';
import { type InitialValues } from '@modular-forms/qwik';
import RegisterForm from '~/components/RegisterForm/RegisterForm';

export type RegisterForm = {
    name: string;
    email: string;
    password: string;
    repeatPassword: string;
};

export const useFormLoader = routeLoader$<InitialValues<RegisterForm>>(() => ({
    name: '',
    email: '',
    password: '',
    repeatPassword: '',
}));

export default component$(() => {
    return <RegisterForm />;
});

export const head: DocumentHead = {
    title: 'Welcome to register',
};
