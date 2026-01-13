import type {IStudent} from "../../interfaces/IStudent.ts";
import {Grid, Stack} from "@mui/material";
import {StudentContactLink} from "./StudentContactLink.tsx";
import {StudentSectionSubtitle} from "./StudentSectionSubtitle.tsx";

type StudentContactSectionProps = {
  student: IStudent
}

export function StudentContactSection({student}: StudentContactSectionProps) {
  return (
    <Grid size={{xs: 12, md: 6}}>
      <StudentSectionSubtitle title={"Informacja"}/>

      <Stack spacing={3}>
        <StudentContactLink
          href={`mailto:${student.email}`}
          title={"Email"}
          info={student.email}
        />

        <StudentContactLink
          href={`tel:${student.phone}`}
          title={"Numer telefonu"}
          info={student.phone}
        />
      </Stack>
    </Grid>
  );
}
