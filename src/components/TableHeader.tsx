import { flexRender, type HeaderGroup } from "@tanstack/react-table";

function TableHeader({ headerGroups }: { headerGroups: HeaderGroup<{ [x: string]: any; }>[]}) {
  return (
    <thead>
      {headerGroups.map(group => (
        //ay ama
        <tr key={group.id}>
          {group.headers.map(header=>(

            <th key={header.id} onClick={header.column.getToggleSortingHandler()}
              style={{cursor: header.column.getCanSort() ? 'pointer' : 'default', userSelect:'none'}} scope="col">

              {header.isPlaceholder ? null : (  
                <>
                {flexRender(header.column.columnDef.header, header.getContext())}
                {{asc:  " ↑", desc: " ↓",}[header.column.getIsSorted() as string] ?? ""}
                </>
              )}

            </th>
          ))}
        </tr>
      ))}

    </thead>
  )
}
export default TableHeader