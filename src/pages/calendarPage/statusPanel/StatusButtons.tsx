import {IconButton, Stack, Typography} from "@mui/material";
import {ChevronLeft, ChevronRight} from "@mui/icons-material";
import {format} from "date-fns";
import {pl} from "date-fns/locale";

type StatusButtonsProps = {
  handlePrevMonth: () => void;
  handleNextMonth: () => void;
  date: Date
}

export function StatusButtons({handlePrevMonth, handleNextMonth, date}: StatusButtonsProps) {
  return (
    <Stack direction="row" alignItems="end" justifyContent="space-between">
      <IconButton onClick={handlePrevMonth} sx={{color: "primary.dark"}}>
        <ChevronLeft fontSize="large"/>
      </IconButton>

      <Typography
        fontSize={24}
        fontWeight={600}
        sx={{color: "primary.main", mb: 1}}
      >
        {format(date, "dd MMMM, eeee", {locale: pl})}
      </Typography>

      <IconButton onClick={handleNextMonth} sx={{color: "primary.dark"}}>
        <ChevronRight fontSize="large"/>
      </IconButton>
    </Stack>
  );
}
