import { component$, useStore, useVisibleTask$ } from '@builder.io/qwik';
import styles from './ProfileContent.module.scss';
import { api } from '~/api';
import Loader from '~/components/Loader';
import { server$ } from '@builder.io/qwik-city';
import sql from 'mssql/msnodesqlv8';
import { config } from 'mssql';

const sqlConfig: config = {
    port: 1433,
    database: 'VNTUDiet',
    server: 'localhost\\SQLEXPRESS',
    // driver: 'msnodesqlv8',
    options: {
        trustedConnection: true,
    },
};

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

    const getUserDetails = server$(async (id = '') => {
        sql.connect(
            `Data Source=localhost\\SQLEXPRESS;Initial Catalog=VNTUDiet;Integrated Security=True;TrustServerCertificate=True`,
            (err) => {
                if (err) {
                    console.log(err);
                }

                const request = new sql.Request();
                request.query(
                    `SELECT * FROM [AspNetUsers] WHERE Id = ${id}`,
                    (err, result) => {
                        if (err) {
                            console.log('err', err);
                        } else {
                            // @ts-ignore
                            userData.data = result!.recordset[0];
                        }
                    },
                );
            },
        );
    });

    useVisibleTask$(async () => {
        getUserDetails();

        if (!userData.data) {
            const response = await api.getUserDetails(
                {},
                { userId: localStorage.getItem('userId') || '' },
            );

            if (response.data) {
                userData.data = response.data;
                console.log(response.data);
            }
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
