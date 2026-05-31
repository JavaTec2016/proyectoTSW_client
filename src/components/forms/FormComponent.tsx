import React, { useEffect, useState } from 'react'
import { useForm, type RegisterOptions } from 'react-hook-form';
import { clearPrefix, customValidate, inputName, limpiar, type CustomValidatorResults, type CustomValidatorSchema } from './FormActions';
import { Form } from 'react-bootstrap';
import type { FormInputConfig, FormSelectConfig, FormTextAreaConfig } from './FormField';
import FormField from './FormField';

export type FormPresentation = {
    title: string;
    subtitle: string;
}
export type FormRows = {
    [x: string]: any;
    field: string;
    config: FormInputConfig | FormSelectConfig | FormTextAreaConfig;
}[][]
export type FormValidators = { [x: string]: RegisterOptions };
export type FormComponentAttributes = {
    id: string;
    presentation: FormPresentation;
    onSubmit: (data: { [x: string]: any }) => any;
    values?: { [x: string]: any };
    hidden?: boolean;
    onchange?: () => any;
    onClose?: () => any;
    validators: FormValidators;
    body: FormRows;
    customValidatorSchema?: CustomValidatorSchema,
    closeButton?: React.ReactNode
}
function FormComponent({
    id,
    presentation,
    onSubmit,
    values = {},
    hidden = false,
    onchange = () => { },
    onClose,
    closeButton,
    validators,
    customValidatorSchema = {},
    body,
}: FormComponentAttributes) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({ criteriaMode: "all" });
    const [customValidation, setCustomValidation] = useState<CustomValidatorResults>({})

    const submit = handleSubmit((data) => {
        if(!verifyCustomValidation()) return;
        
        const cleared = clearPrefix(data);
        console.log(cleared)
        onSubmit(cleared);
    });

    function validate(){
        if(!customValidatorSchema) return;
        setCustomValidation(customValidate(customValidatorSchema, id));
    }
    function verifyCustomValidation(){
        return Object.keys(customValidation).length == 0;
    }
    useEffect(() => {
        if (values.id) delete values.id;
        for (const field in values) {
            setValue(inputName(id, field), values[field]);
        }
    }, [values]);
    return (
        <Form onSubmit={submit} hidden={hidden} className="form-panel" id={id}>
            <div className="panel-header d-flex justify-content-between">
                <div className='w-50'>
                    <p className="panel-title">{presentation.title || "Informacion de la Coproración"}</p>
                    <p className="panel-subtitle">{presentation.subtitle}</p>
                </div>
                {closeButton}
                {!closeButton && onClose && (
                    <button className='btn-close' type="button" onClick={onClose} aria-label="Close"></button>
                )}
            </div>
            <div className="panel-divider"></div>
            <div className="form-scroll">
                {body.map((row, index) => {
                    //
                    return (
                        <div className='form-row' key={index}>
                            {row.map(field => {
                                const fieldId = inputName(id, field.field);
                                return (
                                    <div className='form-group' key={fieldId}>
                                        <FormField
                                            formId={id}
                                            id={field.field}
                                            config={field.config}
                                            register={register}
                                            errors={errors}
                                            validation={validators}
                                            customValidation={customValidation}
                                            onChange={() => {validate(); onchange()}} />
                                    </div>
                                )
                            })}

                        </div>
                    )
                })}
            </div>
            <input
                type="submit"
                className="btn-primary-custom"
                value="Guardar registro"
            ></input>
            

            <button className="btn-secondary-custom" type='button' role='button' onClick={() => {limpiar(id); setCustomValidation({})}}>
                Limpiar campos
            </button>
        </Form>
    )
}

export default FormComponent