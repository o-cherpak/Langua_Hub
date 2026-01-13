import Typography from "@mui/material/Typography";
import {Box, Chip, Grid, Stack} from "@mui/material";
import type {IStudent} from "../../interfaces/IStudent.ts";
import {StudentSectionSubtitle} from "./StudentSectionSubtitle.tsx";

type StudentLanguagesSectionProps = {
  student: IStudent
}

export function StudentLanguagesSection({student}: StudentLanguagesSectionProps) {
  return (
    <Grid size={{xs: 12, md: 6}}>
      <StudentSectionSubtitle title={"Języki"}/>

      <Stack spacing={1}>
        {student.languages.map((lang, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              p: 1.5,
              borderRadius: 2,
              border: '1px solid',
              borderColor: "divider"
            }}
          >
            <Box display="flex" alignItems="center" gap={1}>
              <Typography variant="body2" fontWeight="500">
                {lang.subject}
              </Typography>
            </Box>

            <Chip
              label={lang.level}
              variant="outlined"
              color={"primary"}
              sx={{fontWeight: 'bold', minWidth: 40}}
            />
          </Box>
        ))}
      </Stack>
    </Grid>
  );
}
