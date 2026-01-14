import type { IStudent } from "../../interfaces/IStudent.ts";
import { Box, Divider, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import { SectionCard } from "../../components/SectionCard.tsx";
import { StudentContactSection } from "./StudentContactSection.tsx";
import { StudentLanguagesSection } from "./StudentLanguagesSection.tsx";

type StudentInfoViewerProps = {
  student: IStudent;
};

export function StudentInfoViewer({ student }: StudentInfoViewerProps) {
  return (
    <SectionCard>
      <Box sx={{ p: 2 }}>
        <Typography variant="h4" component="h2" fontWeight="bold">
          {student.name} {student.surname}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Student ID: #{student.id}
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Grid container spacing={3}>
          <StudentContactSection student={student} />

          <StudentLanguagesSection student={student} />
        </Grid>
      </Box>
    </SectionCard>
  );
}
