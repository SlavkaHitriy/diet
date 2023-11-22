import { component$, Slot } from '@builder.io/qwik';
import AuthBG from '~/assets/auth-bg.jpg?jsx';
import Logo from '~/assets/icons/logo.svg?jsx';

export default component$(() => {
    return (
        <>
            <AuthBG class={'authBg'} />
            <div class={'authBar'} />
            <div class={'authContent'}>
                <Logo class={'authLogo'} />
                <Slot />
            </div>
        </>
    );
});
