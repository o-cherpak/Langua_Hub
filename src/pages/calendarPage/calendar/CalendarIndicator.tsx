import {Box} from "@mui/material";

export function CalendarIndicator() {
  return (
    <Box sx={{
      position: 'absolute',
      top: 8,
      right: 8,
      width: 6,
      height: 6,
      borderRadius: '50%',
      bgcolor: 'primary.dark'
    }}/>
  );
}
