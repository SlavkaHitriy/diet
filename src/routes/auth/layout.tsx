import { component$, Slot } from '@builder.io/qwik';
import AuthBG from '~/assets/auth-bg.jpg?jsx';
import Logo from '~/assets/logo.png?jsx';

export default component$(() => {
    return (
        <>
            <AuthBG class={'authBg'} />
            <div class={'authContent'}>
                <Logo class={'authLogo'} />
                <Slot />
            </div>
        </>
    );
});
