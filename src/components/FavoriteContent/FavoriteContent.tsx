import { component$, useStore, useVisibleTask$ } from '@builder.io/qwik';
import styles from './FavoriteContent.module.scss';
import { api } from '~/api';
import Loader from '~/components/Loader';
import Title from '~/components/Title';

interface UseStoreData {
    data: UserData | null;
}

interface UserData {
    diet?: string;
    training?: string;
}

export default component$(() => {
    const userData = useStore<UseStoreData>({
        data: null,
    });

    useVisibleTask$(async () => {
        const response = await api.getUserDetails(
            {},
            { userId: localStorage.getItem('userId') || '' },
        );

        if (response.data) {
            userData.data = response.data;
        }
    });

    return (
        <div class={styles.favorite}>
            <div class={'container'}>
                {userData.data ? (
                    <div class={styles.favoriteInner}>
                        <Title>Збережена дієта</Title>
                        <div
                            class={styles.favoriteContent}
                            dangerouslySetInnerHTML={
                                userData.data.diet || 'Немає збереженої дієти'
                            }
                        />
                        <Title>Збережене тренування</Title>
                        <div
                            class={styles.favoriteContent}
                            dangerouslySetInnerHTML={
                                userData.data.training ||
                                'Немає збереженого тренування'
                            }
                        />
                    </div>
                ) : (
                    <Loader class={styles.favoriteLoader} size={64} />
                )}
            </div>
        </div>
    );
});
