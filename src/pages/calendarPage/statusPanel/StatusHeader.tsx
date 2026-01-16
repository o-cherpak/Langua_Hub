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
        mb: 1,
        gap: 1,
        color: hasLessons ? "primary.main" : "text.secondary",
      }}
    >
      {hasLessons ? (
        <RadioButtonChecked sx={{fontSize: 20}}/>
      ) : (
        <CircleOutlined sx={{fontSize: 20, color: "divider"}}/>
      )}
      <Typography
        variant="overline"
        sx={{
          fontWeight: 700,
          letterSpacing: "1px",
          color: hasLessons ? "primary.main" : "text.secondary"
        }}
      >
        {hasLessons ? "Zajęcia zaplanowane" : "Brak zajęć"}
      </Typography>
    </Box>
  );
}
