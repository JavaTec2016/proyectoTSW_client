import { useForm, type ErrorOption, type RegisterOptions } from 'react-hook-form';
import { printErrors } from './printErrors';
import { useEffect } from 'react';
import { Form, FormControl, FormLabel } from 'react-bootstrap';
import { limpiar, clearPrefix, inputName } from './FormActions';

function Donador_CategoriaForm({
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
  const { register, handleSubmit, formState: { errors }, setValue } = useForm({ criteriaMode: 'all' });

  const validation: { [x: string]: RegisterOptions } = {}
  validation[inputName(id, "nombre")] = {
    required: "Campo requerido",
    maxLength: { value: 50, message: "No puede superar 50 caracteres" },
    pattern: {
      value: /^[A-Za-z ]+$/,
      message: "No se permiten numeros o caracteres espeiales",
    },
  };

  const submit = handleSubmit(data => {
    const cleared = clearPrefix(data);
    onSubmit(cleared);
  })
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
      <div className='form-scroll'>
        <div className="form-row">
          <div className="form-group">
            <FormLabel htmlFor={id + "_nombre"}>Nombre: </FormLabel>
            <FormControl
              type="text"
              id={inputName(id, 'nombre')}
              {...register(inputName(id, 'nombre'), validation[inputName(id, 'nombre')])}
              onInput={() => onchange()}
            />
            {errors[inputName(id, 'nombre')] && errors[inputName(id, 'nombre')]!.types && printErrors(errors[inputName(id, 'nombre')] as ErrorOption)}
          </div>
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

export default Donador_CategoriaForm