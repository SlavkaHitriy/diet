import { component$, QwikIntrinsicElements } from '@builder.io/qwik';
import styles from './FormInput.module.scss';

export default component$<unknown, QwikIntrinsicElements['input']>(
    ({ ...props }) => {
        return <input class={styles.input} {...props} />;
    },
);
