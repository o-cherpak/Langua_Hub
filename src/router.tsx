import {createBrowserRouter} from "react-router";
import {WelcomePage, WelcomePageLoader} from "./pages/welcomePage/WelcomePage.tsx";
import {MarksPage, MarksPageLoader} from "./pages/marksPage/MarksPage.tsx";
import {StudentDataPage, StudentDataPageLoader} from "./pages/studentDataPage/StudentDataPage.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <WelcomePage/>,
    loader: WelcomePageLoader
  },
  {
    path: "/marks",
    element: <MarksPage/>,
    loader: MarksPageLoader
  },
  {
    path: "/student",
    element: <StudentDataPage/>,
    loader: StudentDataPageLoader
  }
]);