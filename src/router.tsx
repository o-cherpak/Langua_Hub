import {createBrowserRouter} from "react-router";
import {WelcomePage, WelcomePageLoader} from "./pages/welcomePage/WelcomePage.tsx";
import {StudentDataPage} from "./pages/studentDataPage/StudentDataPage.tsx";
import {AnnListingsPage, AnnListingsPageLoader} from "./pages/annListingsPage/AnnListingsPage.tsx";
import {AuthPage} from "./pages/authPage/AuthPage.tsx";
import {DashboardPage,DashboardPageLoader} from "./pages/dashboardPage/DashboardPage.tsx";
import {MarksPage, MarksPageLoader} from "./pages/marksPage/MarksPage.tsx";
import {CalendarPage, CalendarPageLoader} from "./pages/calendarPage/CalendarPage.tsx";
import {AdminRoute} from "./services/AdminRoute.tsx";
import {AdminPage} from "./pages/adminPage/AdminPage.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthPage/>,
  },
  {
    path: "/welcome",
    element: <WelcomePage/>,
    loader: WelcomePageLoader,
  },
  {
    path: "/dashboard",
    element: <DashboardPage/>,
    loader: DashboardPageLoader,
  },
  {
    path: "/student",
    element: <StudentDataPage/>,
  },
  {
    path: "/ann",
    element: <AnnListingsPage/>,
    loader: AnnListingsPageLoader,
  },
  {
    path: "/marks",
    element: <MarksPage/>,
    loader: MarksPageLoader,
  },
  {
    path: "/calendarPage",
    element: <CalendarPage/>,
    loader: CalendarPageLoader,
  },
  {
    path: "/admin",
    element: (
      <AdminRoute>
        <AdminPage />
      </AdminRoute>
    ),
  }
]);
