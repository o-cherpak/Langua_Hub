import {Box, Typography} from "@mui/material";

type MarksCardResultProps = {
  result: number
}

export function MarksCardResult({result}: MarksCardResultProps) {
  return (
    <Box sx={{textAlign: 'right'}}>
      <Typography
        variant="h5"
        fontWeight="800"
        color="primary.main"
      >
        {result}
      </Typography>

      <Typography
        variant="caption"
        fontWeight="700"
        color="text.secondary"
        sx={{
          textTransform: 'uppercase', letterSpacing: 1
        }}
      >
        Wynik
      </Typography>
    </Box>

  );
}
