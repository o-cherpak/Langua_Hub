import type {ReactNode} from "react";
import {Paper} from "@mui/material";

type SectionCardProps = {
  children: ReactNode;
}

export function SectionCard({children}: SectionCardProps) {
  return (
    <Paper elevation={0} sx={{p: 4, borderRadius: 4, border: '1px solid #e0e0e0'}}>
      {children}
    </Paper>
  )
}