import {createBrowserRouter} from "react-router";
import {WelcomePage, WelcomePageLoader} from "./pages/welcomePage/WelcomePage.tsx";
import {MarksPage, MarksPageLoader} from "./pages/marksPage/MarksPage.tsx";
import {StudentDataPage, StudentDataPageLoader} from "./pages/studentDataPage/StudentDataPage.tsx";
import {AnnListingsPage, AnnListingsPageLoader} from "./pages/annListingsPage/AnnListingsPage.tsx";
import {AuthPage} from "./pages/authPage/AuthPage.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthPage/>,
  },
  {
    path: "/welcome",
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
  },
  {
    path: "/ann",
    element: <AnnListingsPage/>,
    loader: AnnListingsPageLoader
  }
]);