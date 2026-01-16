import {IconButton, TableBody, TableCell, TableRow} from "@mui/material";
import {Delete, Edit} from "@mui/icons-material";
import type {Column} from "./AdminTable.tsx";

type AdminTableBodyProps = {
  data: any
  columns: Column[]
  onEdit?: (row: any) => void;
  onDelete?: (row: any) => void;
}

export function AdminTableBody({data, columns, onEdit, onDelete}: AdminTableBodyProps) {
  return (
    <TableBody>
      {data.map((row, index) => (
        <TableRow key={row.id || index} hover>
          {columns.map((col) => (
            <TableCell key={col.key}>
              {row[col.key]}
            </TableCell>
          ))}

          <TableCell align="right">
            <IconButton onClick={() => onEdit?.(row)} size="small" color="primary">
              <Edit fontSize="small" />
            </IconButton>

            <IconButton onClick={() => onDelete?.(row)} size="small" color="error">
              <Delete fontSize="small" />
            </IconButton>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
