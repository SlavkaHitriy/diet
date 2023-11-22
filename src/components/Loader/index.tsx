import { component$ } from '@builder.io/qwik';
import styles from './Loader.module.scss';

interface LoaderProps {
    size?: number;
    class?: string;
}

export default component$<unknown, LoaderProps>(({ size = 24, ...props }) => {
    return (
        <div
            style={{
                width: `${size}px`,
                height: `${size}px`,
            }}
            class={`${styles.loader} ${props.class}`}
        >
            <span
                style={{
                    width: `${size * 1.25}px`,
                    height: `${size * 1.25}px`,
                }}
            ></span>
        </div>
    );
});
