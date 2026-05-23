import { flexRender, type Row } from "@tanstack/react-table"

function TableBodier({data}:{data:Row<{[x:string]:any}>[]}) {
  
  return (
    <tbody>
        {data.map(row=>{
          
          return(
          <tr key={row.id}>
            {row.getVisibleCells().map(cell=>{
              return(
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            )})}
          </tr>
        )})}
    </tbody>
  )
}

export default TableBodier