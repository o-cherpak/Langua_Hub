import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        textAlign: 'center',
        borderTop: '1px solid gray'
      }}
    >
      <Typography>
        © 2025 Lingua Hub
      </Typography>
    </Box>
  );
}
