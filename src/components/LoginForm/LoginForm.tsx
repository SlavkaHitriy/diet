import {
    $,
    component$,
    FunctionComponent,
    JSXNode,
    useSignal,
} from '@builder.io/qwik';
import { SubmitHandler, useForm } from '@modular-forms/qwik';
import { LoginForm, useFormLoader } from '~/routes/auth/login';
import styles from './LoginForm.module.scss';
import FormText from '../FormText';
import FormInput from '../FormInput';
import AuthBG from '../../assets/auth-bg.jpg?jsx';
import EmailIcon from '../../assets/icon/email.svg?jsx';
import PassWordIcon from '../../assets/icon/PassWord.svg?jsx';
import { useAuth } from '~/hooks/useAuth';

type LoginFormKeys = keyof LoginForm;
interface LoginFormFields {
    icon: JSXNode<string | FunctionComponent<Record<string, any>>>;
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
    const auth = useAuth();
    const [loginForm, { Form, Field, FieldArray }] = useForm<LoginForm>({
        loader: useFormLoader(),
    });

    const error = useSignal('');

    const handleSubmit = $<SubmitHandler<LoginForm>>(async (values) => {
        const response = await auth.loginUser(values);

        if (response.isError) {
            error.value = response.error?.message ?? 'Error';
        }
    });

    return (
        <>
            <AuthBG class={styles.imgBG} />
            <Form onSubmit$={handleSubmit}>
                {formFields.map((fields) => (
                    <Field name={fields.fieldName} key={fields.fieldName}>
                        {(field, props) => {
                            return (
                                <div class={styles.wrapper}>
                                    <FormText for={fields.fieldName}>
                                        {fields.label}
                                    </FormText>
                                    <div class={styles.imgIcon}>
                                        {fields.icon}
                                    </div>
                                    <FormInput
                                        {...props}
                                        type={fields.type}
                                        value={field.value}
                                    />
                                </div>
                            );
                        }}
                    </Field>
                ))}
                <button type="submit">Увійти</button>
                {error.value && <div>{error.value}</div>}
            </Form>
        </>
    );
});
