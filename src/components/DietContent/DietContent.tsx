import {
    component$,
    QwikIntrinsicElements,
    useSignal,
    useStore,
    useVisibleTask$,
} from '@builder.io/qwik';
import styles from './DietContent.module.scss';
import { api } from '~/api';
import Title from '~/components/Title';

interface UseStoreData {
    data: UserData | null;
}

interface UserData {
    diet?: string;
}

export default component$<unknown, QwikIntrinsicElements['label']>(() => {
    const userData = useStore<UseStoreData>({
        data: null,
    });
    const isLiked = useSignal(false);
    const dietContent = useSignal('');

    useVisibleTask$(() => {
        dietContent.value = localStorage.getItem('diet') ?? '';
    });

    useVisibleTask$(async ({ track }) => {
        track(() => isLiked.value);

        if (isLiked.value) {
            await api.saveDiet({
                userId: localStorage.getItem('userId') || '',
                diet: dietContent.value,
            });
        }
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
        <div class={'container ' + styles.dietWrapper}>
            <Title>Моя дієта</Title>
            {!dietContent.value && !userData.data?.diet ? (
                'Немає згенерованої дієти'
            ) : isLiked.value ? (
                <svg
                    class={`${styles.dietIconActive} ${styles.dietIcon}`}
                    onClick$={() => (isLiked.value = !isLiked.value)}
                    width="512"
                    height="456"
                    viewBox="0 0 512 456"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g clip-path="url(#clip0_250_17)">
                        <path d="M471.383 44.578C444.879 15.832 408.512 0 368.973 0C339.418 0 312.352 9.344 288.523 27.77C276.5 37.07 265.605 48.45 256 61.73C246.398 48.453 235.5 37.07 223.473 27.77C199.648 9.344 172.582 0 143.027 0C103.488 0 67.117 15.832 40.613 44.578C14.426 72.988 0 111.801 0 153.871C0 197.171 16.137 236.809 50.781 278.613C81.773 316.008 126.316 353.969 177.898 397.926C195.512 412.938 215.477 429.953 236.207 448.078C241.684 452.875 248.719 455.519 256 455.516C263.285 455.516 270.316 452.875 275.785 448.086C296.515 429.957 316.492 412.934 334.113 397.914C385.688 353.964 430.23 316.008 461.223 278.609C495.867 236.81 512 197.172 512 153.867C512 111.801 497.574 72.988 471.383 44.578Z" />
                    </g>
                    <defs>
                        <clipPath id="clip0_250_17">
                            <rect width="512" height="456" />
                        </clipPath>
                    </defs>
                </svg>
            ) : (
                <svg
                    class={styles.dietIcon}
                    onClick$={() => (isLiked.value = !isLiked.value)}
                    width="512"
                    height="456"
                    viewBox="0 0 512 456"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g clip-path="url(#clip0_250_21)">
                        <path
                            d="M255.999 455.516C248.71 455.516 241.684 452.875 236.207 448.078C215.523 429.992 195.582 412.996 177.988 398.004L177.898 397.926C126.316 353.969 81.7728 316.008 50.7809 278.613C16.137 236.81 0 197.172 0 153.871C0 111.801 14.426 72.9883 40.6169 44.5784C67.1209 15.8325 103.488 0.000488281 143.031 0.000488281C172.586 0.000488281 199.652 9.34447 223.477 27.7704C235.5 37.0704 246.398 48.4534 255.999 61.7304C265.604 48.4534 276.499 37.0704 288.526 27.7704C312.351 9.34447 339.417 0.000488281 368.972 0.000488281C408.511 0.000488281 444.882 15.8325 471.386 44.5784C497.577 72.9883 511.999 111.801 511.999 153.871C511.999 197.171 495.866 236.809 461.222 278.609C430.229 316.008 385.69 353.965 334.116 397.918C316.491 412.934 296.519 429.957 275.788 448.086C270.31 452.877 263.278 455.518 255.999 455.516ZM143.031 29.9924C111.965 29.9924 83.4258 42.3914 62.6639 64.9064C41.5939 87.7623 29.9879 119.356 29.9879 153.871C29.9879 190.289 43.5229 222.859 73.8709 259.477C103.203 294.871 146.832 332.051 197.348 375.102L197.441 375.18C215.101 390.23 235.121 407.293 255.956 425.512C276.917 407.258 296.968 390.168 314.663 375.094C365.175 332.043 408.8 294.871 438.132 259.477C468.476 222.859 482.011 190.289 482.011 153.871C482.011 119.355 470.405 87.7613 449.335 64.9064C428.577 42.3914 400.035 29.9924 368.972 29.9924C346.214 29.9924 325.319 37.2274 306.87 51.4924C290.429 64.2114 278.976 80.2893 272.26 91.5393C268.808 97.3243 262.73 100.777 255.999 100.777C249.269 100.777 243.191 97.3243 239.738 91.5393C233.028 80.2893 221.574 64.2114 205.128 51.4924C186.68 37.2274 165.785 29.9924 143.031 29.9924Z"
                            fill="black"
                        />
                    </g>
                    <defs>
                        <clipPath id="clip0_250_21">
                            <rect width="512" height="456" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
            )}

            <div
                class={styles.diet}
                dangerouslySetInnerHTML={
                    dietContent.value || userData.data?.diet
                }
            />
        </div>
    );
});
