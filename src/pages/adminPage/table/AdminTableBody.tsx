import {IconButton, TableBody, TableCell, TableRow} from "@mui/material";
import {Delete, Edit} from "@mui/icons-material";
import type {Column} from "./AdminTable.tsx";
import Typography from "@mui/material/Typography";

type AdminTableBodyProps<T> = {
  data: T[]
  columns: Column[]
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
}

export function AdminTableBody<T>({data, columns, onEdit, onDelete}: AdminTableBodyProps<T>) {
  return (
    <TableBody>
      {data.map((row: any, index) => (
        <TableRow key={row.uid || row.id || index} hover>
          {columns.map((col) => (
            <TableCell key={col.key}>
              {col.render
                ? col.render(row[col.key], row)
                : <Typography fontSize={14}>{row[col.key]}</Typography>
              }
            </TableCell>
          ))}

          <TableCell align="right">
            <IconButton onClick={() => onEdit?.(row)} size="small" color="primary">
              <Edit fontSize="small"/>
            </IconButton>

            <IconButton onClick={() => onDelete?.(row)} size="small" color="error">
              <Delete fontSize="small"/>
            </IconButton>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
