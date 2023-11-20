import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { routeLoader$ } from '@builder.io/qwik-city';
import { type InitialValues } from '@modular-forms/qwik';
import LoginForm from '~/components/LoginForm/LoginForm';
import Title from '~/components/Title';

export type LoginForm = {
    email: string;
    password: string;
};

export const useFormLoader = routeLoader$<InitialValues<LoginForm>>(() => ({
    email: '',
    password: '',
}));

export default component$(() => {
    return (
        <>
            <Title>Login</Title>
            <LoginForm />
        </>
    );
});

export const head: DocumentHead = {
    title: 'Welcome to login',
};
