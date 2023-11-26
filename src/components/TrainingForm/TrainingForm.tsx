import { $, component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { SubmitHandler, useForm } from '@modular-forms/qwik';
import styles from './MainForm.module.scss';
import FormInput from '../FormInput';
import Button from '~/components/Button';
import Loader from '~/components/Loader';
import { api } from '~/api';
import { AdditionalForm, PersonalForm } from '~/routes';
import RadioButton from '~/components/RadioButton/RadioButton';
import { Link, useNavigate } from '@builder.io/qwik-city';
import { useAdditionalFormLoader, useFormLoader } from '~/routes/training';

type PersonalFormKeys = keyof PersonalForm;
type AdditionalFormKeys = keyof AdditionalForm;

interface PersonalFormFields {
    label: string;
    fieldName: PersonalFormKeys;
    type: 'text' | 'email' | 'password' | 'number';
    helperText?: string;
}

interface AdditionalFormFields {
    label: string;
    fieldName: AdditionalFormKeys;
}

const formFields: PersonalFormFields[] = [
    {
        label: 'Введіть ваш вік:',
        fieldName: 'age',
        type: 'number',
    },
    {
        label: 'Введіть ваш ріст:',
        fieldName: 'height',
        type: 'number',
        helperText: 'см',
    },
    {
        label: 'Введіть вашу вагу:',
        fieldName: 'weight',
        type: 'number',
        helperText: 'кг',
    },
    {
        label: 'Опишіть рівень вашої активності:',
        fieldName: 'physicalActivity',
        type: 'text',
    },
];

const additionalFormFields: AdditionalFormFields[] = [
    {
        label: 'Перечисліть ваші алергії:',
        fieldName: 'allergies',
    },
    {
        label: 'Перечисліть ваші вподобання в їжі:',
        fieldName: 'foodPreferences',
    },
    {
        label: 'Перечисліть їжу, якої має бути мінімум в раціоні:',
        fieldName: 'dislikeFood',
    },
    {
        label: 'Перечисліть їжу, яку хочете виключити з раціону:',
        fieldName: 'foodRestrictions',
    },
];

interface FormGenders {
    label: string;
    value: 0 | 1;
}

const formGenders: FormGenders[] = [
    {
        label: 'Чоловік',
        value: 0,
    },
    {
        label: 'Жінка',
        value: 1,
    },
];

interface FormGoal {
    label: string;
    value: 0 | 1 | 2;
}

const formGoals: FormGoal[] = [
    {
        label: 'Схуднення',
        value: 0,
    },
    {
        label: 'Підтримка ваги',
        value: 1,
    },
    {
        label: 'Набір ваги',
        value: 2,
    },
];

export default component$(() => {
    const navigate = useNavigate();
    const isPersonalFormCompleted = useSignal(false);
    const isLoading = useSignal(false);
    const error = useSignal('');

    const [personalForm, { Form, Field }] = useForm<PersonalForm>({
        loader: useFormLoader(),
    });

    const [additionalForm, { Form: AdditionalForm, Field: AdditionalField }] =
        useForm<AdditionalForm>({
            loader: useAdditionalFormLoader(),
        });

    const handleSubmitDiet = $<SubmitHandler<AdditionalForm>>(
        async (values) => {
            error.value = '';
            isLoading.value = true;

            const response = await api.addAdditionalData({
                userId: localStorage.getItem('userId'),
                ...values,
            });

            if (response.isError) {
                isLoading.value = false;
                return (error.value = response.error ?? 'Error');
            }

            const responseDiet = await api.generateTraining(
                {},
                { userId: localStorage.getItem('userId') || '' },
            );

            if (responseDiet.isError) {
                isLoading.value = false;
                return (error.value = response.error ?? 'Error');
            }

            localStorage.setItem(
                'training',
                responseDiet.data.choices[0].message.content
                    .replaceAll('\n\n', '<br /> <br />')
                    .replaceAll('/\\*\\*(.*?)\\*\\*/g', '<h4>$1</h4>'),
            );

            navigate('/my-trainings');

            isLoading.value = false;
        },
    );

    const handleSubmit = $<SubmitHandler<PersonalForm>>(async (values) => {
        error.value = '';

        if (!values.physicalActivity)
            return (error.value = 'Опишіть рівень вашої активності');

        isLoading.value = true;

        const response = await api.addDietData({
            userId: localStorage.getItem('userId'),
            ...values,
        });

        isLoading.value = false;

        if (response.isError) {
            return (error.value = response.error ?? 'Error');
        }

        isPersonalFormCompleted.value = true;
    });

    useVisibleTask$(async () => {
        const response = await api.getUserDetails(
            {},
            { userId: localStorage.getItem('userId') || '' },
        );

        if (response.data) {
            personalForm.internal.fields.age!.value = response.data.age || '';
            personalForm.internal.fields.height!.value =
                response.data.height || '';
            personalForm.internal.fields.physicalActivity!.value =
                response.data.physicalActivity || '';
            personalForm.internal.fields.weight!.value =
                response.data.weight || '';
            personalForm.internal.fields.goal!.value = response.data.goal || 0;
            personalForm.internal.fields.gender!.value =
                response.data.gender || 0;
            additionalForm.internal.fields.allergies!.value =
                response.data.allergies || '';
            additionalForm.internal.fields.dislikeFood!.value =
                response.data.dislikeFood || '';
            additionalForm.internal.fields.foodPreferences!.value =
                response.data.foodPreferences || '';
            additionalForm.internal.fields.foodRestrictions!.value =
                response.data.foodRestrictions || '';
        }
    });

    return (
        <div class={styles.mainForm}>
            <h1 class={styles.title}>Створіть ваше тренування</h1>
            <div class={styles.description}>
                Отримайте ваш план тренувань згідно тренера ChatGPT, або{' '}
                <Link href={'/'}>створіть дієту</Link>
            </div>
            {isPersonalFormCompleted.value ? (
                <div class={styles.mainFormInner}>
                    <h4 class={styles.subtitle}>Додаткова інформація</h4>
                    {isLoading.value && (
                        <Loader class={styles.loader} size={36} />
                    )}
                    <AdditionalForm
                        class={styles.formWrapper}
                        onSubmit$={handleSubmitDiet}
                    >
                        {additionalFormFields.map((fields) => (
                            <AdditionalField
                                name={fields.fieldName}
                                key={fields.fieldName}
                            >
                                {(field, props) => {
                                    return (
                                        <FormInput
                                            {...props}
                                            name={fields.fieldName}
                                            label={fields.label}
                                            value={field.value}
                                        />
                                    );
                                }}
                            </AdditionalField>
                        ))}

                        {error.value && (
                            <div class={styles.mainFormError}>
                                {error.value}
                            </div>
                        )}
                        <Button type="submit" class={styles.formButton}>
                            Створити план тренування
                        </Button>
                    </AdditionalForm>
                </div>
            ) : (
                <div class={styles.mainFormInner}>
                    <h4 class={styles.subtitle}>Персональна інформація</h4>
                    {isLoading.value && (
                        <Loader class={styles.loader} size={36} />
                    )}
                    <Form class={styles.formWrapper} onSubmit$={handleSubmit}>
                        {formFields.map((fields) => (
                            <Field
                                name={fields.fieldName}
                                key={fields.fieldName}
                                type={
                                    fields.type === 'text' ? 'string' : 'number'
                                }
                            >
                                {(field, props) => {
                                    return (
                                        <FormInput
                                            {...props}
                                            name={fields.fieldName}
                                            label={fields.label}
                                            type={fields.type}
                                            value={field.value}
                                            helperText={fields.helperText}
                                        />
                                    );
                                }}
                            </Field>
                        ))}

                        <div class={styles.mainFormField}>
                            <div class={styles.mainFormFieldLabel}>
                                Виберіть вашу стать:
                            </div>
                            <div class={styles.mainFormFieldInner}>
                                <Field name={'gender'} type={'number'}>
                                    {(field, props) => {
                                        return (
                                            <>
                                                {formGenders.map(
                                                    (gender, idx) => (
                                                        <RadioButton
                                                            key={idx}
                                                            label={gender.label}
                                                            isActive={
                                                                gender.value ===
                                                                field.value
                                                            }
                                                            {...props}
                                                            onInput$={() => {
                                                                field.value =
                                                                    gender.value;
                                                            }}
                                                            onChange$={() => {
                                                                field.value =
                                                                    gender.value;
                                                            }}
                                                            type="radio"
                                                            checked={
                                                                field.value ===
                                                                gender.value
                                                            }
                                                        />
                                                    ),
                                                )}
                                            </>
                                        );
                                    }}
                                </Field>
                            </div>
                        </div>

                        <div class={styles.mainFormField}>
                            <div class={styles.mainFormFieldLabel}>
                                Виберіть вашу ціль:
                            </div>
                            <div class={styles.mainFormFieldInner}>
                                <Field name={'goal'} type={'number'}>
                                    {(field, props) => {
                                        return (
                                            <>
                                                {formGoals.map((goal, idx) => (
                                                    <RadioButton
                                                        key={idx}
                                                        label={goal.label}
                                                        isActive={
                                                            goal.value ===
                                                            field.value
                                                        }
                                                        {...props}
                                                        onInput$={() => {
                                                            field.value =
                                                                goal.value;
                                                        }}
                                                        onChange$={() => {
                                                            field.value =
                                                                goal.value;
                                                        }}
                                                        type="radio"
                                                        checked={
                                                            field.value ===
                                                            goal.value
                                                        }
                                                    />
                                                ))}
                                            </>
                                        );
                                    }}
                                </Field>
                            </div>
                        </div>
                        {error.value && (
                            <div class={styles.mainFormError}>
                                {error.value}
                            </div>
                        )}
                        <Button type="submit" class={styles.formButton}>
                            Далі
                        </Button>
                    </Form>
                </div>
            )}
        </div>
    );
});
