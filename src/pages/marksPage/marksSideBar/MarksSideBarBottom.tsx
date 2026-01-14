import { Box, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";

type MarksSideBarBottomProps = {
  count: number;
  activeFilter: string;
};

export function MarksSideBarBottom({
  activeFilter,
  count,
}: MarksSideBarBottomProps) {
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

      <Box sx={{ textAlign: "right" }}>
        <Typography variant="caption" color="text.secondary" fontWeight="600">
          Język
        </Typography>

        <Typography variant="h6" fontWeight="700">
          {activeFilter === "All" ? "Wszyskie" : activeFilter}
        </Typography>
      </Box>
    </Stack>
  );
}
