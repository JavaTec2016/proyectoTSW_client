import API from "../api/api";
import { Navigation } from "../components/Navigation";
import Breadcrumb from "../components/Breadcrumb";
import type { CrudComponentAttributes } from "../components/CrudComponent";
import type { FormRows } from "../components/forms/FormComponent";
import CrudComponent from "../components/CrudComponent";
import { Nav } from "react-bootstrap";
import type { CustomValidatorSchema } from "../components/forms/FormActions";

//========SETUP

const labels = {
    id: 'ID',
    nombre: 'Nombre',
    fecha_inicio: 'Fecha de inicio',
    fecha_fin: 'Fecha de fin',
    tipo: 'Tipo de evento',
    descripcion: 'Descripcion',
}
const formConfig: FormRows = [
    [{
        field: 'nombre',
        config: {
            name: 'input',
            type: 'text',
            label: labels['nombre']
        }
    }],
    [{
        field: 'fecha_inicio',
        config: {
            name: 'input',
            type: 'date',
            label: labels['fecha_inicio']
        }
    },
    {
        field: 'fecha_fin',
        config: {
            name: 'input',
            type: 'date',
            label: labels['fecha_fin']
        }
    }],
    [{
        field: 'tipo',
        config: {
            name: 'select',
            label: labels['tipo'],
            options: {
                '': 'Seleccionar...',
                'fonoton': 'Fonoton',
                'reunion': 'Reunion',
                'festival': 'Festival',
            }
        }
    }],
    [{
        field: 'descripcion',
        config: {
            name: 'textarea',
            label: labels['descripcion'],
        }
    }],
]
const crudAttributes: CrudComponentAttributes = {
    formRows: formConfig,
    createFormPresentation: {
        title: 'Nuevo Evento',
        subtitle: 'Ingrese la informacion'
    },
    updateFormPresentation: {
        title: 'Actualizar Evento',
        subtitle: 'Ingrese la informacion'
    },
    validators: {
        nombre: {
            required: "Campo requerido",
            maxLength: { value: 100, message: "No puede superar 100 caracteres" },
            pattern: {
                value: /^[0-9A-Za-z ]+$/,
                message: "Solo se permiten numeros, espacios y letras",
            }
        },
        fecha_inicio: {
            required: "Campo requerido",
        },
        fecha_fin: {
            required: "Campo requerido",
        },
        tipo: {
            required: "Campo requerido",
            maxLength: { value: 50, message: "No puede superar 50 caracteres" },
            pattern: {
                value: /^[A-Za-z ]+$/,
                message: "No se permiten numeros o caracteres espeiales",
            },
        },
        descripcion: {
            required: "Campo requerido",
            maxLength: { value: 1000, message: "No puede superar 1000 caracteres" },
        }
    },
    labelSchema: labels,
    detailLayout: [['id', 'nombre'], ['fecha_inicio', 'fecha_fin', 'tipo'], ['descripcion']],
    detailPresentation: {
        title: 'Detalles del evento',
        subtitle: 'Informacion'
    },
    tableColumns: ['nombre', 'tipo', 'fecha_inicio'],
    primaryKey: 'id',
    tablePresentation: {
        title: 'Eventos',
        subtitle: 'Listado',
    },

    endpoint: API.EVENTOS,
    createMessages: {
        success: 'Evento creado'
    },
    updateMessages: {
        success: 'Evento actualizado'
    },
    deleteMessages: {
        confirmation: 'Desea eliminar el evento? cualquier registro asociado sera eliminado',
        success: 'Evento eliminado'
    },
    serverErrorMessage: 'Error del servidor, intentelo mas tarde'
}
const customValidationSchema: CustomValidatorSchema = {
    'fecha_fin':{
        'lesser_than_fecha_inicio': (data)=>{
            const fin = Date.parse(data['fecha_fin']);
            const inicio = Date.parse(data['fecha_inicio'])
            console.log(fin < inicio)
            if(fin < inicio) return 'La fecha de fin no puede ser antes de la fecha de inicio'
        }
    }
}
export function EventosPage() {
    return (
        <div className="app-shell">
            <Navigation includeSidebar={true}>
                <Nav>
                    <Nav.Link href="#top">Inicio</Nav.Link>
                    <Nav.Link href="/colectas">Colectas</Nav.Link>
                </Nav>
            </Navigation>
            <Breadcrumb path="/eventos" />

            <main className="page-content">
                <CrudComponent
                    attributes={crudAttributes}
                    customValidatorSchema={customValidationSchema}
                />
            </main>
        </div>
    );
}