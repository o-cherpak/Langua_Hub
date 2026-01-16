import {CircleOutlined, RadioButtonChecked} from "@mui/icons-material";
import {Box, Typography} from "@mui/material";

type StatusHeaderProps = {
  hasLessons?: boolean;
}

export function StatusHeader({hasLessons}: StatusHeaderProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        mb: 2,
        gap: 2,
        color: hasLessons ? "primary.main" : "text.disabled",
      }}
    >
      {hasLessons ? (
        <RadioButtonChecked sx={{ fontSize: 24 }} />
      ) : (
        <CircleOutlined sx={{ fontSize: 24 }} />
      )}
      <Typography
        variant="subtitle1"
        sx={{ fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}
      >
        Status Dnia: {hasLessons ? "Zajęcia" : "Wolne"}
      </Typography>
    </Box>
  );
}
