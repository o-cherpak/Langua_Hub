import {EventBusy} from "@mui/icons-material";
import {Stack, Typography} from "@mui/material";

export function EmptyCourses() {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{
        py: 4,
        textAlign: "center",
        border: "2px dashed",
        borderColor: "grey.200",
        borderRadius: 2,
      }}
    >
      <EventBusy sx={{fontSize: 48, color: "grey.300", mb: 1}}/>

      <Typography
        variant="body1"
        sx={{color: "text.secondary", fontWeight: 500}}
      >
        Brak zaplanowanych zajęć
      </Typography>
    </Stack>
  );
}
