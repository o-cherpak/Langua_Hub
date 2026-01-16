import {TableCell, TableHead, TableRow} from "@mui/material";
import type {Column} from "./AdminTable.tsx";

type AdminTableHeadProps = {
  columns: Column[]
}

export function AdminTableHead({columns}: AdminTableHeadProps) {
  return (
    <TableHead sx={{bgcolor: "grey.200"}}>
      <TableRow>
        {columns.map((col) => (
          <TableCell key={col.key} sx={{fontWeight: "bold", textTransform: "uppercase", fontSize: "0.75rem"}}>
            {col.label}
          </TableCell>
        ))}
        <TableCell align="right" sx={{fontWeight: "bold"}}>AKCJE</TableCell>
      </TableRow>
    </TableHead>
  );
}
