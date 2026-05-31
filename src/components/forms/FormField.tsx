import React from 'react'
import FormInput from './FormInput';
import type { ErrorOption, FieldErrors, FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form';
import FormSelectField from './FormSelectField';
import FormTextArea from './FormTextArea';
import { inputName, type CustomValidatorResults } from './FormActions';
import { printCustomErrors, printErrors } from './printErrors';
export type FormInputConfig = {
    name: 'input';
    type: React.HTMLInputTypeAttribute;
    label: string;
}
export type FormSelectConfig = {
    name: 'select';
    label: string;
    options: { [x: string]: any }
}
export type FormTextAreaConfig = {
    name: 'textarea';
    label: string;
}
function FormField({ formId, id, register, errors, validation, customValidation = {}, onChange, config }: { formId: string, id: string, config: FormInputConfig | FormSelectConfig | FormTextAreaConfig, register: UseFormRegister<FieldValues>, errors: FieldErrors<FieldValues>, validation: { [x: string]: RegisterOptions }, customValidation: CustomValidatorResults, onChange: () => any }) {
    function printAllErrors() {
        
        const ide = inputName(formId, id);
        console.log(customValidation)
        return (
            <div>
                {errors[ide] && errors[ide]!.types && printErrors(errors[ide] as ErrorOption)}
                {customValidation[id] && printCustomErrors(customValidation[id])}
            </div>
        )
    }
    if (config.name.toLowerCase() == 'input') {
        const conf = config as FormInputConfig;
        return (
            <FormInput
                formId={formId}
                inputId={id}
                type={conf.type}
                label={conf.label}
                register={register}
                validation={validation}
                onInput={onChange}
                customErrors={printAllErrors()}
                />
        )
    }
    if (config.name == 'select') {
        const conf = config as FormSelectConfig;
        return (
            <FormSelectField
                formId={formId}
                inputId={id}
                options={conf.options}
                label={conf.label}
                register={register}
                validation={validation}
                onInput={onChange}
                customErrors={printAllErrors()}
                />
        )
    }
    if (config.name == 'textarea') {
        const conf = config as FormTextAreaConfig;
        return (
            <FormTextArea
                formId={formId}
                inputId={id}
                label={conf.label}
                register={register}
                validation={validation}
                onInput={onChange}
                customErrors={printAllErrors()}
                />
        )
    }
    return <div className='text text-danger'>Input desconocido: {id + ": " + config.name}</div>
}

export default FormField