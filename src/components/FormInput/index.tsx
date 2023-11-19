import { $, Slot, component$, useSignal } from '@builder.io/qwik';
import { SubmitHandler, useForm } from '@modular-forms/qwik';
import styles from './FormInput.module.scss'



export default component$(({...props}) => {
    return (
        <input class={styles.input} {...props} />
    );
});
