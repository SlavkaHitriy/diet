import { component$, useSignal } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { routeLoader$ } from '@builder.io/qwik-city';
import { type InitialValues, useForm } from '@modular-forms/qwik';
import LoginForm from '~/components/LoginForm/LoginForm';
import type { RequestHandler } from '@builder.io/qwik-city';
import Title from '~/components/Title';

export const onRequest: RequestHandler = async ({redirect, url, cookie}) => {
    if(cookie.get('Refresh-Token')){
      throw redirect(308, new URL('/', url).toString());
    }
  };


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