import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    flexRender,
} from "@tanstack/react-table";

import type {
    ColumnDef,
    SortingState,
} from "@tanstack/react-table";

import { useEffect, useState } from "react";
import TableHeader from "./TableHeader";
import TableBodier from "./TableBodier";
import { makeColumns, type SlotConfigs } from "./TableActions";

export type TablePresentation = {
    title: string;
    subtitle: string;
}

export type TablerAttributes = {
    data: { [x: string]: any }[];
    columns: string[], columNames: string[];
    primaryField: string, onDetail: (id: string) => any;
    onEdit: (id: string) => any;
    onDelete: (id: string) => any;
    onSearchToggle?: (state: boolean) => any;
    headerData: TablePresentation;
    editButtonAttributes?: {[x:string]:any};
    detailButtonAttributes?: {[x:string]:any};
    deleteButtonAttributes?: {[x:string]:any};
}
export function Tabler({ data, columns, columNames, primaryField, onDetail, onEdit, onDelete, onSearchToggle = () => { }, headerData, editButtonAttributes, detailButtonAttributes, deleteButtonAttributes }: TablerAttributes) {
    const [listing, setListing] = useState<{ [x: string]: any }[]>([])
    const [sorting, setSorting] = useState<SortingState>([]);
    async function load() {
        setListing(data)
        console.log(data)
    }
    useEffect(() => {
        load();
    }, [data])

    //config acciones
    const slotConfig: SlotConfigs = {};
    const sortings: { [x: number]: boolean } = {};
    slotConfig[columns.length] = ({ row, getValue }) => (
        <>
            <button onClick={(ev) => { onDelete(row.original[primaryField]) }} className="btn btn-danger mx-2 my-2" {...deleteButtonAttributes}>Eliminar</button>
            <button onClick={(ev) => { onDetail(row.original[primaryField]) }} className="btn btn-info mx-2 my-2" {...detailButtonAttributes}>Detalles</button>
            <button onClick={(ev) => { onEdit(row.original[primaryField]) }} className="btn btn-warning mx-2 my-2" {...editButtonAttributes}>Modificar</button>
        </>
    )
    sortings[columns.length] = false;
    const cols = makeColumns([...columns, 'acciones'], [...columNames, 'Acciones'], slotConfig, sortings);
    //tabla
    const table = useReactTable<{ [x: string]: any }>({
        data: listing!,
        columns: cols,
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: { pageSize: 10 }
        }
    })
    const { pageIndex } = table.getState().pagination;

    useEffect(() => {
    }, [])

    return (
        //arriba iria el filtro pero yo no lo descargo pq ya lo tengo
        <>
            <div className="table-panel-header justify-content-between align-items-center">
                <div className="d-flex justify-content-center align-items-center form-group">
                    <p className="panel-title pe-2">{headerData.title}</p>
                    <label htmlFor="paginationSelect" className="w-100 px-4">Registros por página:{" "}</label>
                    <select className="form-control" name="paginationSelect" id="paginationSelect" onChange={(ev) => {
                        table.setPageSize(parseInt(ev.target.value))
                    }}>
                        <option value={5}>5</option>
                        <option value={10} selected>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                    </select>
                </div>

                <div className="search-box">
                    <label htmlFor="toggleSearch">Busqueda automática</label>
                    <input type="checkbox" id='toggleSearch' name="toggleSearch" onInput={(e) => {
                        let state = (e.target as HTMLInputElement).checked;
                        onSearchToggle(state);
                    }} />
                </div>
            </div>
            <div className="table-scroll">
                <table className="data-table">
                    <TableHeader headerGroups={table.getHeaderGroups()} />
                    <TableBodier data={table.getRowModel().rows} />
                </table>
                {table.getRowModel().rows.length == 0 && (
                    <div className="table-empty">
                        Sin resultados.
                    </div>
                )}
            </div>
            <div className="table-footer">
                <span>
                    Mostrando{" "}
                    {pageIndex * table.getState().pagination.pageSize + 1} - {Math.min(table.getRowCount(), (pageIndex + 1) * table.getState().pagination.pageSize)}{" "} de {table.getRowCount()} registros
                </span>

                {/* botoncitos con clases dinamicas */}
                <div className="pagination">
                    <button className="page-btn" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>‹</button>
                    {table.getPageOptions().map(page => (
                        <button key={page} className={`page-btn ${pageIndex == page ? "active" : ""}`} onClick={() => table.setPageIndex(page)}>{page + 1}</button>
                    ))}
                    <button className="page-btn" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>›</button>
                </div>

            </div>
        </>
    )
}