import { component$, QwikIntrinsicElements, Slot } from '@builder.io/qwik';
import styles from './FormInput.module.scss';
import FormText from '~/components/FormText';

type FormInputProps = QwikIntrinsicElements['input'] & {
    name: string;
    label: string;
};

export default component$<any, FormInputProps>(({ name, label, ...props }) => {
    return (
        <div class={styles.inputWrapper}>
            <FormText for={name}>{label}</FormText>
            <div class={styles.inputBox}>
                <div class={styles.inputIcon}>
                    <Slot />
                </div>
                <input class={styles.input} {...props} />
            </div>
        </div>
    );
});
