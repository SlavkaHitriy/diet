import { component$, QwikIntrinsicElements, Slot } from '@builder.io/qwik';
import styles from './Button.module.scss';

export default component$<unknown, QwikIntrinsicElements['button']>(
    ({ ...props }) => {
        return (
            <button {...props} class={`${styles.button} ${props.class}`}>
                <Slot />
            </button>
        );
    },
);
