import {
    useForm,
    type ErrorOption,
    type RegisterOptions,
} from "react-hook-form";
import { printErrors } from "./printErrors";
import { useEffect } from "react";
import { Form, FormControl, FormLabel } from "react-bootstrap";
import { limpiar, clearPrefix, inputName } from "./FormActions";
import FormField from "./FormField";
import FormTextArea from "./FormTextArea";
import FormSelectField from "./FormSelectField";

function EventoForm({
    id,
    title,
    subtitle,
    onSubmit,
    autofill,
    hidden = false,
    setHidden = (val: boolean) => { },
    onchange = () => { },
    closable = false,
}: {
    id: string;
    title?: string;
    subtitle?: string;
    onSubmit: (data: { [x: string]: any }) => any;
    autofill: { [x: string]: any };
    hidden?: boolean;
    setHidden?: (val: boolean) => any,
    onchange?: () => any;

    closable?: boolean,
}) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({ criteriaMode: "all" });

    const validation: { [x: string]: RegisterOptions } = {};
    validation[inputName(id, "nombre")] = {
        required: "Campo requerido",
        maxLength: { value: 100, message: "No puede superar 100 caracteres" },
        pattern: {
            value: /^[0-9A-Za-z ]+$/,
            message: "Solo se permiten numeros, espacios y letras",
        },
    };
    validation[inputName(id, "fecha_inicio")] = {
        required: "Campo requerido",
    };
    validation[inputName(id, "fecha_fin")] = {
        required: "Campo requerido",
    };
    validation[inputName(id, "tipo")] = {
        required: "Campo requerido",
        maxLength: { value: 50, message: "No puede superar 50 caracteres" },
        pattern: {
            value: /^[A-Za-z ]+$/,
            message: "No se permiten numeros o caracteres espeiales",
        },
    };
    validation[inputName(id, "descripcion")] = {
        required: "Campo requerido",
        maxLength: { value: 1000, message: "No puede superar 1000 caracteres" },
    };

    const submit = handleSubmit((data) => {
        const cleared = clearPrefix(data);
        onSubmit(cleared);
    });
    useEffect(() => {
        if (autofill.id) delete autofill.id;
        for (const field in autofill) {
            setValue(inputName(id, field), autofill[field]);
        }
    }, [autofill]);

    return (
        <Form onSubmit={submit} hidden={hidden} className="form-panel" id={id}>
            <div className="panel-header justify-content-between">
                <div>
                    <p className="panel-title">{title || "Informacion del Evento"}</p>
                    <p className="panel-subtitle">{subtitle}</p>
                </div>
                {closable && (
                    <button className='btn panel-close' type="button" onClick={() => { setHidden(true) }}>X</button>
                )}
            </div>

            <div className="panel-divider"></div>
            <div className="form-scroll">
                <div className="form-row">
                    <FormField
                        formId={id}
                        inputId="nombre"
                        type="text"
                        label="Nombre: "
                        register={register}
                        errors={errors}
                        validation={validation}
                        onInput={onchange} />
                </div>
                <div className="form-row">
                    <FormField
                        formId={id}
                        inputId="fecha_inicio"
                        type="date"
                        label="Fecha de inicio: "
                        register={register}
                        errors={errors}
                        validation={validation}
                        onInput={onchange} />

                    <FormField
                        formId={id}
                        inputId="fecha_fin"
                        type="date"
                        label="Fecha de fin: "
                        register={register}
                        errors={errors}
                        validation={validation}
                        onInput={onchange} />
                </div>
                <div className="form-row">
                    <FormSelectField
                        formId={id}
                        inputId="tipo"
                        options={{ '': 'Seleccionar...', 'fonoton': 'Fonoton', 'festival': 'Festival', 'reunion': 'Reunion'/**placeholder */ }}
                        label="Tipo de evento: "
                        register={register}
                        errors={errors}
                        validation={validation}
                        onInput={onchange} />
                </div>
                <div className="form-row">
                    <FormTextArea
                        formId={id}
                        inputId="descripcion"
                        label="Descripción: "
                        register={register}
                        errors={errors}
                        validation={validation}
                        onInput={onchange} />
                </div>
            </div>

            <input
                type="submit"
                className="btn-primary-custom"
                value="Guardar registro"
            ></input>
            <button className="btn-secondary-custom" onClick={() => limpiar(id)}>
                Limpiar campos
            </button>
        </Form>
    );
}

export default EventoForm;
