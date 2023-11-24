import { component$, useSignal } from '@builder.io/qwik';
import styles from './BurgerMenu.module.scss';
import { Link } from '@builder.io/qwik-city';
import Logo from '~/assets/icons/logo.svg?jsx';

const menu = [
    {
        title: 'Актуальність',
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

interface ItemProps {
    active: boolean;
    isActive: () => void;
}


export default component$<unknown, ItemProps>((props) => {
    return (
        <div class={props.active ? styles.active : styles.burgerMenu}>
            <div class={styles.burgerClose} onClick$={props.isActive}></div>
                <div class={styles.burgerInner}>
                    <Link class={styles.burgerLogo} href="/">
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
                </div>
        </div>
    );
});

