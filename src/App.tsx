import './App.css'
import {WelcomePage} from "./pages/welcomePage/WelcomePage.tsx";
import {ThemeProvider} from "@mui/material";
import {theme} from "./theme.ts";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <WelcomePage/>
    </ThemeProvider>
  )
}

export default App
