import {Box, Chip, Stack, Typography} from "@mui/material";
import AssignmentCheckIcon from "@mui/icons-material/AssignmentTurnedIn";
import {format} from "date-fns";
import {pl} from "date-fns/locale";
import type {IMark} from "../../../../interfaces/IMark.ts";

type MarksCardInfoProps = {
  m: IMark;
}

export function MarksCardInfo({m}: MarksCardInfoProps) {
  return (
    <Box>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Typography variant="subtitle1" fontWeight="800">
          {m.language.subject}
        </Typography>

        <Chip
          label={m.language.level}
          size="small" variant="outlined"
          sx={{height: 20, fontWeight: 700}}
        />
      </Stack>

      <Typography
        variant="caption"
        color="text.secondary"
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 0.6
        }}
      >
        <AssignmentCheckIcon sx={{fontSize: 12}}/>

        {format(new Date(m.date), "d MMMM yyyy 'o' HH:mm", {locale: pl})}
      </Typography>
    </Box>
  );
}
