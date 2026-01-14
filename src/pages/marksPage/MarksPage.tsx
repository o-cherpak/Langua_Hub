import { Box } from "@mui/material";
import { useMarksStore } from "../../stores/useMarksStore.ts";
import { Header } from "../../components/header/Header.tsx";
import { Footer } from "../../components/footer/Footer.tsx";
import { MarksContainer } from "./MarksContainer.tsx";
import { getCurrentUser } from "../../services/getCurrentUser.ts";

export const MarksPageLoader = async () => {
  const user = await getCurrentUser();

  if (user) {
    await Promise.all([useMarksStore.getState().fetchMarks(user.uid)]);
  }

  return null;
};

export function MarksPage() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", bgcolor: "#f4f6f8" }}>
      <Header />

      <MarksContainer />

      <Footer />
    </Box>
  );
}
