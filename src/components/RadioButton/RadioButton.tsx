import { component$, QwikIntrinsicElements } from '@builder.io/qwik';
import styles from './RadioButton.module.scss';

export default component$<
    unknown,
    QwikIntrinsicElements['input'] & { label: string; isActive: boolean }
>(({ label, isActive, ...props }) => {
    return (
        <label class={styles.radio}>
            <div
                class={`${styles.radioEl} ${isActive && styles.radioElActive}`}
            />
            <div class={styles.radioText}>{label}</div>
            <input {...props} hidden />
        </label>
    );
});
