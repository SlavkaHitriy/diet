import { component$ } from '@builder.io/qwik';
import styles from './Footer.module.scss';
import { Link } from '@builder.io/qwik-city';
import Logo from '~/assets/icons/logo.svg?jsx';

export default component$(() => {
    return (
        <footer class={styles.footer}>
            <div class="container">
                <div class={styles.footerInner}>
                    <Link class={styles.footerLink} href={'/about'}>
                        Загальне
                    </Link>
                    <Link class={styles.footerLink} href={'/my-diets'}>
                        Моя дієта
                    </Link>
                    <Logo class={styles.footerLogo} />
                    <Link class={styles.footerLink} href={'/my-trainings'}>
                        Моє тренування
                    </Link>
                    <Link class={styles.footerLink} href={'/favorites'}>
                        Обране
                    </Link>
                </div>
            </div>
        </footer>
    );
});
