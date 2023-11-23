import { component$ } from '@builder.io/qwik';
import styles from './Header.module.scss';
import { Link } from '@builder.io/qwik-city';
import Logo from '~/assets/icons/logo.svg?jsx';
import ProfileAvatar from '~/assets/avatar.png?jsx';

const menu = [
    {
        title: 'Про нас',
        url: '/about',
    },
    {
        title: 'Моя дієта',
        url: '/my-diets',
    },
    {
        title: 'Моє тренування',
        url: '/my-trainings',
    },
    {
        title: 'Обране',
        url: '/favorites',
    },
];

export const Header = component$(() => {
    return (
        <header class={styles.header}>
            <div class={'container'}>
                <div class={styles.headerInner}>
                    <Link class={styles.headerLogo} href="/">
                        <Logo />
                    </Link>
                    <nav class={styles.menu}>
                        <ul class={styles.menuList}>
                            {menu.map((item, idx) => (
                                <li key={idx}>
                                    <Link
                                        class={styles.menuLink}
                                        href={item.url}
                                    >
                                        {item.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <Link href={'/profile'} class={styles.profile}>
                        <div class={styles.profileText}>В профіль</div>
                        <div class={styles.profileAvatar}>
                            <ProfileAvatar />
                        </div>
                    </Link>
                </div>
            </div>
        </header>
    );
});
