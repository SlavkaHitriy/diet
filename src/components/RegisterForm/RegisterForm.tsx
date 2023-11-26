import { $, component$, JSXNode, useSignal } from '@builder.io/qwik';
import { SubmitHandler, useForm } from '@modular-forms/qwik';
import { RegisterForm, useFormLoader } from '~/routes/auth/register';
import { useAuth } from '~/hooks/useAuth';
import { api } from '~/api';
import styles from '~/components/LoginForm/LoginForm.module.scss';
import Button from '~/components/Button';
import Title from '~/components/Title';
import Loader from '~/components/Loader';
import FormInput from '~/components/FormInput';
import { Link } from '@builder.io/qwik-city';
import EmailIcon from '~/assets/icons/email.svg?jsx';
import PassWordIcon from '~/assets/icons/password.svg?jsx';
import PassWordRepeatIcon from '~/assets/icons/password-repeat.svg?jsx';
import NameIcon from '~/assets/icons/name.svg?jsx';

type RegisterFormKeys = keyof RegisterForm;
interface RegisterFormFields {
    icon: JSXNode;
    label: string;
    fieldName: RegisterFormKeys;
    type: 'text' | 'email' | 'password';
}

const formFields: RegisterFormFields[] = [
    {
        icon: <NameIcon />,
        label: 'Введіть ваше ім’я:',
        fieldName: 'name',
        type: 'text',
    },
    {
        icon: <EmailIcon />,
        label: 'Введіть ваш email:',
        fieldName: 'email',
        type: 'email',
    },
    {
        icon: <PassWordIcon />,
        label: 'Придумайте пароль:',
        fieldName: 'password',
        type: 'password',
    },
    {
        icon: <PassWordRepeatIcon />,
        label: 'Повторіть пароль:',
        fieldName: 'repeatPassword',
        type: 'password',
    },
];

export default component$(() => {
    const isLoading = useSignal(false);
    const error = useSignal('');
    const auth = useAuth();
    const [, { Form, Field }] = useForm<RegisterForm>({
        loader: useFormLoader(),
    });

    const handleSubmit = $<SubmitHandler<RegisterForm>>(async (values) => {
        if (values.password === values.repeatPassword) {
            isLoading.value = true;
            const response = await api.registerUser(values);
            isLoading.value = false;

            if (response.isError) {
                // @ts-ignore
                error.value = response.error?.message ?? 'Error';
                return;
            }

            const loginResponse = await auth.loginUser({
                email: values.email,
                password: values.password,
            });

            if (loginResponse.isError) {
                // @ts-ignore
                error.value = loginResponse.error?.message ?? 'Error';
                return;
            }
        } else {
            error.value = 'Паролі не співпадають';
        }
    });

    return (
        <>
            <div class={styles.form}>
                <div class={styles.blockTitle}>
                    <Title>Реєстрація</Title>
                    <p class={styles.titleText}>Створіть новий аккаунт</p>
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
                        Зареєструватись
                    </Button>
                    {error.value && (
                        <div class={styles.formError}>{error.value}</div>
                    )}
                </Form>
            </div>
            <p class={styles.lastText}>
                Маєте аккаунт?{' '}
                <Link href="/auth/login" class={styles.link}>
                    Увійти
                </Link>
            </p>
        </>
    );
});
