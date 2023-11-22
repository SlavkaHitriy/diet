import { component$, QwikIntrinsicElements, Slot } from '@builder.io/qwik';
import styles from './FormInput.module.scss';
import FormText from '~/components/FormText';

type FormInputProps = QwikIntrinsicElements['input'] & {
    name: string;
    label: string;
    withIcon?: boolean;
};

export default component$<any, FormInputProps & { helperText?: string }>(
    ({ name, label, withIcon, helperText, ...props }) => {
        return (
            <div class={styles.inputWrapper}>
                <FormText for={name}>{label}</FormText>
                <div class={styles.inputBox}>
                    {withIcon && (
                        <div class={styles.inputIcon}>
                            <Slot />
                        </div>
                    )}
                    {helperText && (
                        <div class={styles.inputHelperText}>{helperText}</div>
                    )}
                    <input
                        class={`${styles.input} ${
                            withIcon && styles.inputWithIcon
                        } ${helperText && styles.inputWithHelperText}`}
                        {...props}
                    />
                </div>
            </div>
        );
    },
);
