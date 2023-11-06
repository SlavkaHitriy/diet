import { $, component$, useSignal } from '@builder.io/qwik';
import { SubmitHandler, useForm } from '@modular-forms/qwik';
import { LoginForm, useFormLoader } from '~/routes/auth/login';
import { loginUser } from '~/api/auth/login';
import { setCookie } from '~/helpers/setCookie';

type LoginFormKeys = keyof LoginForm;
interface LoginFormFields {
    fieldName: LoginFormKeys;
    type: 'text' | 'email' | 'password';
}
const formFields: LoginFormFields[] = [
    {
        fieldName: 'email',
        type: 'email',
    },
    {
        fieldName: 'password',
        type: 'password',
    },
];

export default component$(() => {
    const [loginForm, { Form, Field, FieldArray }] = useForm<LoginForm>({
        loader: useFormLoader(),
    });

    const error = useSignal('');

    const handleSubmit = $<SubmitHandler<LoginForm>>(
        async (values, event) => {
            const response = await loginUser(values);
            if (response.isError) {
                error.value = response.error?.message ?? 'Error';
                return
            }
            if (response.data) {
                // setCookie(
                //     'accessToken',
                //     response.data.accessToken
                // );
            }
        }
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
            <button type="submit">Увійти</button>
            {error.value && <div>{error.value}</div>}
        </Form>
    );
});
