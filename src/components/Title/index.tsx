import { $, Slot, component$, useSignal } from '@builder.io/qwik';
import { SubmitHandler, useForm } from '@modular-forms/qwik';
import styles from './Title.module.scss';

export default component$(() => {
    return (
        <h1 class={styles.title}>
            <Slot />
        </h1>
    );
});
