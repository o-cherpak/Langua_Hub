import {SectionCard} from "../../components/SectionCard.tsx";
import {SectionTitle} from "../../components/SectionTitle.tsx";
import {Box} from "@mui/material";
import {AuthLoginForm} from "./AuthLoginForm.tsx";


export function AuthLogin() {

  return (
    <Box
      minWidth={"400px"}
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "34%",
      }}
    >
      <SectionCard>
        <SectionTitle title={"Logowanie"} center/>

        <AuthLoginForm/>
      </SectionCard>
    </Box>
  );
}
