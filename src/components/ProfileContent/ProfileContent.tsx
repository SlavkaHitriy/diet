import { component$, useStore, useVisibleTask$ } from '@builder.io/qwik';
import styles from './ProfileContent.module.scss';
import { api } from '~/api';
import Loader from '~/components/Loader';

interface UseStoreData {
    data: UserData | null;
}

interface UserData {
    name?: string;
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
            console.log(response.data);
        }
    });

    return (
        <div class={styles.profile}>
            <div class={'container'}>
                {userData.data ? (
                    <div class={styles.profileInner}>{userData.data.name}</div>
                ) : (
                    <Loader size={64} />
                )}
            </div>
        </div>
    );
});
