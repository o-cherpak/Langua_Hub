import {Container} from "@mui/material";
import {AdminStudentsView} from "./AdminStudentsView.tsx";
import {AdminTeacherView} from "./AdminTeachersView.tsx";
import {AdminMarksView} from "./AdminMarksView.tsx";
import {AdminCoursesView} from "./AdminCoursesView.tsx";
import {AdminNewsView} from "./AdminNewsVIew.tsx";

type AdminMainContentProps = {
  currentView: string
}

export function AdminMainContent({currentView}: AdminMainContentProps) {
  const renderContent = () => {
    switch (currentView) {
      case "students":
        return <AdminStudentsView/>;
      case "teachers":
        return <AdminTeacherView/>;
      case "news":
        return <AdminNewsView/>;
      case "marks":
        return <AdminMarksView/>;
      case "courses":
        return <AdminCoursesView/>;
      default:
        return <AdminStudentsView/>;
    }
  };

  return (
    <Container maxWidth="xl" sx={{mt: 4, mb: 4, flexGrow: 1}}>
      {renderContent()}
    </Container>
  );
}
