import { $, component$, useSignal } from '@builder.io/qwik';
import { SubmitHandler, useForm } from '@modular-forms/qwik';
import { RegisterForm, useFormLoader } from '~/routes/auth/register';
import { registerUser } from '~/api/auth/register';
import { loginUser } from '~/api/auth/login';
import { setCookie } from '~/helpers/setCookie';


type RegisterFormKeys = keyof RegisterForm;
interface RegisterFormFields {
    fieldName: RegisterFormKeys;
    type: 'text' | 'email' | 'password';
}

const formFields: RegisterFormFields[] = [
    {
        fieldName: 'name',
        type: 'text',
    },
    {
        fieldName: 'email',
        type: 'email',
    },
    {
        fieldName: 'password',
        type: 'password',
    },
    {
        fieldName: 'repeatPassword',
        type: 'password',
    },
];

export default component$(() => {
    const [registerForm, { Form, Field, FieldArray }] = useForm<RegisterForm>({
        loader: useFormLoader(),
    });

    const error = useSignal('');

    const handleSubmit = $<SubmitHandler<RegisterForm>>(
        async (values, event) => {
            if (values.password === values.repeatPassword) {
                const response = await registerUser(values);

                if (response.isError) {
                    error.value = response.error?.message ?? 'Error';
                    return;
                }
                const loginResponse = await loginUser({
                    email: values.email,
                    password: values.password,
                });
                if (loginResponse.isError) {
                    error.value = loginResponse.error?.message ?? 'Error';
                    return;
                }

                if (loginResponse.data) {
                    setCookie(
                        'accessToken',
                        loginResponse.data.accessToken
                    );
                }
            } else {
                error.value = 'Паролі не співпадають';
            }
        },
    );

    return (
        <Form onSubmit$={handleSubmit}>
            {formFields.map((fields) => (
                <Field name={fields.fieldName} key={fields.fieldName}>
                    {(field, props) => {
                        return (
                            <>
                                <label for={fields.fieldName}>
                                    {fields.fieldName}
                                </label>
                                <input
                                    {...props}
                                    type={fields.type}
                                    value={field.value}
                                />
                            </>
                        );
                    }}
                </Field>
            ))}
            <button type="submit">Підвердити</button>
            {error.value && <div>{error.value}</div>}
        </Form>
    );
});
