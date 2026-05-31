import API from "../api/api";
import { Navigation } from "../components/Navigation";
import Breadcrumb from "../components/Breadcrumb";
import { Nav } from "react-bootstrap";
import CrudComponent, { type CrudComponentAttributes } from "../components/CrudComponent";
import type { FormRows } from "../components/forms/FormComponent";

//========SETUP

const labels = {
    'id': 'ID',
    'nombre': 'Nombre'
}
const formConfig: FormRows = [
    [
        {
            field: 'nombre',
            config: {
                name: 'input',
                type: 'text',
                label: labels['nombre']
            }
        }
    ]
]

const crudAttributes: CrudComponentAttributes = {
    formRows: formConfig,
    createFormPresentation: {
        title: 'Nueva Categoria',
        subtitle: 'Ingrese la informacion'
    },
    updateFormPresentation: {
        title: 'Actualizar Categoria',
        subtitle: 'Ingrese la informacion'
    },
    validators: {
        'nombre': {
            required: "Campo requerido",
            maxLength: { value: 50, message: "No puede superar 50 caracteres" },
            pattern: {
                value: /^[A-Za-z ]+$/,
                message: "No se permiten numeros o caracteres espeiales",
            },
        }
    },
    labelSchema: labels,
    detailLayout: [['id'], ['nombre']],
    detailPresentation: {
        title: 'Detalles de la categoria',
        subtitle: 'Informacion'
    },
    tableColumns: ['nombre'],
    primaryKey: 'id',
    tablePresentation: {
        title: 'Categorias',
        subtitle: 'Listado',
    },

    endpoint: API.CATEGORIAS,
    createMessages: {
        success: 'Categoria creada'
    },
    updateMessages: {
        success: 'Categoria actualizada'
    },
    deleteMessages: {
        confirmation: 'Desea eliminar la categoria? cualquier registro asociado sera eliminado',
        success: 'Categoria eliminada'
    },
    serverErrorMessage: 'Error del servidor, intentelo mas tarde'
}

export function Donador_CategoriasPage() {
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