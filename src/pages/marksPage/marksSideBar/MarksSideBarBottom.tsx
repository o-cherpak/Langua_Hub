import {Box, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import type { IStudent } from "../../../interfaces/IStudent";

type MarksSideBarBottomProps = {
  count: number;
  activeFilter: string;
  currentStudent?: IStudent;
}

export function MarksSideBarBottom({activeFilter, currentStudent, count}: MarksSideBarBottomProps) {
  return (
    <Stack direction="row" justifyContent="space-between">
      <Box>
        <Typography variant="caption" color="text.secondary" fontWeight="600">
          Liczba testów
        </Typography>

        <Typography variant="h6" fontWeight="700">
          {count}
        </Typography>
      </Box>

      <Box sx={{textAlign: 'right'}}>
        <Typography variant="caption" color="text.secondary" fontWeight="600">
          Język
        </Typography>

        <Typography variant="h6" fontWeight="700">
          {activeFilter === 'All' ? currentStudent?.languages[0]?.subject : activeFilter}
        </Typography>
      </Box>
    </Stack>
  );
}
