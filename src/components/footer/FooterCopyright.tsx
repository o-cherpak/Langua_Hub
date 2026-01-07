import {Stack, Typography} from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";

export function FooterCopyright() {
  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      justifyContent="space-between"
      alignItems="center"
      spacing={2}
    >
      <Typography variant="caption" color="text.secondary">
        Szkoła Językowa. Wszelkie prawa zastrzeżone. Langua_Hub © 2026
      </Typography>

      <Stack direction="row" alignItems="center" spacing={1}>
        <LanguageIcon sx={{ fontSize: 16, color: "grey.500" }} />

        <Typography variant="caption" color="text.secondary">
          PL | EN | UA
        </Typography>
      </Stack>
    </Stack>
  );
}
