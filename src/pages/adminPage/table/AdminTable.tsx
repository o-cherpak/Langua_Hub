import {Table, TableContainer, Paper} from "@mui/material";
import {AdminTableHead} from "./AdminTableHead.tsx";
import {AdminTableBody} from "./AdminTableBody.tsx";
import type { ReactNode } from "react";

export interface Column<T = any> {
  key: string;
  label: string;
  render?: (value: any, row: T) => ReactNode;
}

interface AdminTableProps<T> {
  title?: string;
  columns: Column<T>[];
  data: T[];
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
}

export function AdminTable<T>({columns, data, onEdit, onDelete}: AdminTableProps<T>) {
  return (
    <TableContainer component={Paper} elevation={0} sx={{border: "1px solid", borderColor: "divider"}}>
      <Table>
        <AdminTableHead columns={columns}/>

        <AdminTableBody
          data={data}
          columns={columns}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </Table>
    </TableContainer>
  );
}