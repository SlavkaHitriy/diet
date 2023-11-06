import { component$, useSignal } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { routeLoader$ } from '@builder.io/qwik-city';
import { type InitialValues, useForm } from '@modular-forms/qwik';
import RegisterForm from '~/components/RegisterForm/RegisterForm';
import type { RequestHandler } from '@builder.io/qwik-city';
 
export const onRequest: RequestHandler = async ({redirect, url, cookie}) => {
  if(cookie.get('Refresh-Token')){
    throw redirect(308, new URL('/auth/login/', url).toString());
  }
};


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
