import { component$, QwikIntrinsicElements, Slot } from '@builder.io/qwik';
import styles from './FormText.module.scss';

export default component$<unknown, QwikIntrinsicElements['label']>(
    ({ ...props }) => {
        return (
            <label class={styles.text} {...props}>
                <Slot />
            </label>
        );
    },
);
