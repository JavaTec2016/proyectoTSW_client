import API from "../api/api";
import { Navigation } from "../components/Navigation";
import Breadcrumb from "../components/Breadcrumb";
import { Nav } from "react-bootstrap";
import type { CrudComponentAttributes } from "../components/CrudComponent";
import type { FormRows } from "../components/forms/FormComponent";
import CrudComponent from "../components/CrudComponent";

//========SETUP

const labels = {
    id: 'ID',
    nombre: 'Nombre',
    direccion: 'Direccion',
    telefono: 'Telefono',
    email: 'Correo electronico',
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
        field: 'direccion',
        config: {
            name: 'input',
            type: 'text',
            label: labels['direccion']
        }
    }],
    [{
        field: 'telefono',
        config: {
            name: 'input',
            type: 'number',
            label: labels['telefono']
        }
    },
    {
        field: 'email',
        config: {
            name: 'input',
            type: 'email',
            label: labels['email'],
        }
    }],
]
const crudAttributes: CrudComponentAttributes = {
    formRows: formConfig,
    createFormPresentation: {
        title: 'Nueva Corporacion',
        subtitle: 'Ingrese la informacion'
    },
    updateFormPresentation: {
        title: 'Actualizar Corporacion',
        subtitle: 'Ingrese la informacion'
    },
    validators: {
        nombre: {
            required: "Campo requerido",
            maxLength: { value: 50, message: "No puede superar 50 caracteres" },
            pattern: {
                value: /^[A-Za-z ]+$/,
                message: "No se permiten numeros o caracteres espeiales",
            },
        },
        direccion: {
            required: "Campo requerido",
            maxLength: { value: 100, message: "No puede superar 100 caracteres" },
        },
        telefono: {
            required: "Campo requerido",
            maxLength: { value: 10, message: "No puede superar 10 dígitos" },
            minLength: { value: 10, message: "Debe ser menor a 10 dígitos" },
            pattern: {
                value: /^[0-9]+$/,
                message: "Sólo se permiten números",
            },
        },
        email: {
            required: "Campo requerido",
            maxLength: { value: 100, message: "No puede superar 100 caracteres" },
            pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Debe ser un correo electrónico válido",
            },
        },
    },
    labelSchema: labels,
    detailLayout: [['id', 'nombre'], ['direccion'], ['telefono', 'email']],
    detailPresentation: {
        title: 'Detalles de la corporacion',
        subtitle: 'Informacion'
    },
    tableColumns: ['nombre', 'telefono', 'email'],
    primaryKey: 'id',
    tablePresentation: {
        title: 'Corporaciones',
        subtitle: 'Listado',
    },
    endpoint: API.CORPORACONES,
    createMessages: {
        success: 'Corporacion creada'
    },
    updateMessages: {
        success: 'Corporacion actualizada'
    },
    deleteMessages: {
        confirmation: 'Desea eliminar la corporacion? cualquier registro asociado sera eliminado',
        success: 'Evento eliminado'
    },
    serverErrorMessage: 'Error del servidor, intentelo mas tarde'
}

export function CorporacionesPage() {
    return (
        <div className="app-shell">
            <Navigation includeSidebar={true}>
                <Nav>
                    <Nav.Link href="#top">Inicio</Nav.Link>
                    <Nav.Link href="/colectas">Colectas</Nav.Link>
                </Nav>
            </Navigation>
            <Breadcrumb path="/categorias" />

            <main className="page-content">
                <CrudComponent
                    attributes={crudAttributes}
                />
            </main>
        </div>
    );
}