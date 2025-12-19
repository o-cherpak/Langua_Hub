import {createBrowserRouter} from "react-router";
import {WelcomePage, WelcomePageLoader} from "./pages/welcomePage/WelcomePage.tsx";
import {StudentDataPage, StudentDataPageLoader} from "./pages/studentDataPage/StudentDataPage.tsx";
import {AnnListingsPage, AnnListingsPageLoader} from "./pages/annListingsPage/AnnListingsPage.tsx";
import {AuthPage} from "./pages/authPage/AuthPage.tsx";
import {AuthLoginFormLoader} from "./pages/authPage/AuthLoginForm.tsx";
import {DashboardPage, DashboardPageLoader} from "./pages/dashboardPage/DashboardPage.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthPage/>,
    loader: AuthLoginFormLoader,
  },
  {
    path: "/welcome",
    element: <WelcomePage/>,
    loader: WelcomePageLoader
  },
  {
    path: "/marks",
    element: <DashboardPage/>,
    loader: DashboardPageLoader
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