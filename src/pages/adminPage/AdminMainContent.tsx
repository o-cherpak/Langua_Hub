import {Container} from "@mui/material";
import {AdminStudentsView} from "./AdminStudentsView.tsx";

type AdminMainContentProps = {
  currentView: string
}

export function AdminMainContent({currentView}: AdminMainContentProps) {
  const renderContent = () => {
    switch (currentView) {
      case "students":
        return <AdminStudentsView/>;
      case "teachers":
        return <></>;
      case "news":
        return <></>;
      case "marks":
        return <></>;
      default:
        return <AdminStudentsView/>;
    }
  };

  return (
    <Container maxWidth="lg" sx={{mt: 4, mb: 4, flexGrow: 1}}>
      {renderContent()}
    </Container>
  );
}
