import Typography from "@mui/material/Typography";
import { Box, Stack } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

type MarksSideBarTopProps = {
  avg: string;
};

export function MarksSideBarTop({ avg }: MarksSideBarTopProps) {
  return (
    <Box>
      <Typography
        variant="caption"
        color="text.secondary"
        fontWeight="800"
        sx={{ textTransform: "uppercase" }}
      >
        Średnia ocen
      </Typography>

      <Stack direction="row" alignItems="baseline" spacing={1}>
        <Typography variant="h4" fontWeight="800" color="primary.main">
          {avg}
        </Typography>

        <TrendingUpIcon sx={{ color: "success.main", fontSize: 24 }} />
      </Stack>
    </Box>
  );
}
