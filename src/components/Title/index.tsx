import { component$, Slot } from '@builder.io/qwik';
import styles from './Title.module.scss';

export default component$(() => {
    return (
        <h1 class={styles.title}>
            <Slot />
        </h1>
    );
});
