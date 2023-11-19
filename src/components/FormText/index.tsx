import { $, Slot, component$, useSignal } from '@builder.io/qwik';
import { SubmitHandler, useForm } from '@modular-forms/qwik';
import styles from './FormText.module.scss'



export default component$(({...props}) => {
    return (
        <label class={styles.text} {...props}><Slot/></label>
    );
});
