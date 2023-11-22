import {
    component$,
    QwikIntrinsicElements,
    useSignal,
    useVisibleTask$,
} from '@builder.io/qwik';
import styles from './DietContent.module.scss';

export default component$<unknown, QwikIntrinsicElements['label']>(() => {
    const dietContent = useSignal('');

    useVisibleTask$(() => {
        dietContent.value = localStorage.getItem('diet') ?? '';
    });

    return (
        <div class={'container'}>
            <div
                class={styles.diet}
                dangerouslySetInnerHTML={dietContent.value}
            />
        </div>
    );
});
