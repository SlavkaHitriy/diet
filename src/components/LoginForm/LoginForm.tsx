import { $, component$, JSXNode, useSignal } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { SubmitHandler, useForm } from '@modular-forms/qwik';
import { LoginForm, useFormLoader } from '~/routes/auth/login';
import styles from './LoginForm.module.scss';
import FormInput from '../FormInput';
import EmailIcon from '~/assets/icons/email.svg?jsx';
import PassWordIcon from '~/assets/icons/PassWord.svg?jsx';
import { useAuth } from '~/hooks/useAuth';
import Title from '../Title';
import Button from '~/components/Button';
import Loader from '~/components/Loader';

type LoginFormKeys = keyof LoginForm;

interface LoginFormFields {
    icon: JSXNode;
    label: string;
    fieldName: LoginFormKeys;
    type: 'text' | 'email' | 'password';
}

const formFields: LoginFormFields[] = [
    {
        icon: <EmailIcon />,
        label: 'Введіть ваш email:',
        fieldName: 'email',
        type: 'email',
    },
    {
        icon: <PassWordIcon />,
        label: 'Введіть ваш пароль:',
        fieldName: 'password',
        type: 'password',
    },
];

export default component$(() => {
    const isLoading = useSignal(false);
    const error = useSignal('');
    const auth = useAuth();

    const [, { Form, Field }] = useForm<LoginForm>({
        loader: useFormLoader(),
    });

    const handleSubmit = $<SubmitHandler<LoginForm>>(async (values) => {
        isLoading.value = true;
        const response = await auth.loginUser(values);
        isLoading.value = false;

        if (response.isError) {
            error.value = response.error ?? 'Error';
        }
    });

    return (
        <>
            <div class={styles.form}>
                <div class={styles.blockTitle}>
                    <Title>Вхід</Title>
                    <p class={styles.titleText}>Увійдіть в ваш акаунт</p>
                </div>
                {isLoading.value && <Loader class={styles.loader} size={36} />}
                <Form class={styles.formWrapper} onSubmit$={handleSubmit}>
                    {formFields.map((fields) => (
                        <Field name={fields.fieldName} key={fields.fieldName}>
                            {(field, props) => {
                                return (
                                    <FormInput
                                        {...props}
                                        name={fields.fieldName}
                                        label={fields.label}
                                        type={fields.type}
                                        value={field.value}
                                    >
                                        {fields.icon}
                                    </FormInput>
                                );
                            }}
                        </Field>
                    ))}
                    <Button type="submit" class={styles.formButton}>
                        Увійти
                    </Button>
                    {error.value && (
                        <div class={styles.formError}>{error.value}</div>
                    )}
                </Form>
            </div>
            <p class={styles.lastText}>
                Ще не маєте акаунту?{' '}
                <Link href="/auth/register" class={styles.link}>
                    Зареєструватись
                </Link>
            </p>
        </>
    );
});
