import {Table, TableContainer, Paper} from "@mui/material";
import {AdminTableHead} from "./AdminTableHead.tsx";
import {AdminTableBody} from "./AdminTableBody.tsx";

export interface Column {
  key: string;
  label: string;
}

interface AdminTableProps {
  columns: Column[];
  data: any[];
  onEdit?: (row: any) => void;
  onDelete?: (row: any) => void;
}

export function AdminTable({columns, data, onEdit, onDelete}: AdminTableProps) {
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