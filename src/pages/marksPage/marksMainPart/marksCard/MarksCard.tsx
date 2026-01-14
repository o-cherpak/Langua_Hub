import { Paper } from "@mui/material";
import type { IMark } from "../../../../interfaces/IMark.ts";
import { MarksCardInfo } from "./MarksCardInfo.tsx";
import { MarksCardResult } from "./MarksCardResult.tsx";

type MarksCardProps = {
  m: IMark;
};

export function MarksCard({ m }: MarksCardProps) {
  return (
    <Paper
      key={m.id}
      elevation={0}
      sx={{
        p: 2,
        borderRadius: 4,
        border: "1px solid #e0e4e8",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        bgcolor: "white",
        transition: "0.2s",
        "&:hover": { borderColor: "primary.main" },
      }}
    >
      <MarksCardInfo m={m} />

      <MarksCardResult result={m.mark} />
    </Paper>
  );
}
