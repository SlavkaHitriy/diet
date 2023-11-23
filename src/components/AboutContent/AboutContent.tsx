import { component$ } from '@builder.io/qwik';
import styles from './AboutContent.module.scss';
import Title from '~/components/Title';

export default component$(() => {
    return (
        <div class={'container ' + styles.dietWrapper}>
            <Title>Про нас</Title>
        </div>
    );
});
