import type { ColumnDef, Row } from "@tanstack/react-table"

export type SlotFunction = ( {row, getValue} : {row:Row<{[x:string]:any}>, getValue:()=>any} )=>any
export interface SlotConfigs {
    [idx:number]:( {row, getValue} : {row:{original:{[x:string]:any}}, getValue:()=>any} )=>any
}
export function makeColumns(columns:string[], columnNames:string[], slotConfigs:SlotConfigs, allowSortings?:{[x:number]:boolean}){
    const out:ColumnDef<{[x: string]: any}, any>[] = [];
    columns.forEach((col, idx)=>{
        let def:ColumnDef<{[x: string]: any}, any> = {
            id:col,
            header:columnNames[idx],
            accessorFn: (row)=> {return row[col]},
            enableSorting:allowSortings ? (idx in allowSortings) ? allowSortings[idx] : true : true
        }
        if(slotConfigs[idx]) def.cell = slotConfigs[idx];
        out.push(def);
    });
    return out;
};