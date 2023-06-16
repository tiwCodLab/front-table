import "./css/restaurant.css";
import "./css/detailreseve.css";
import "./css/style.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./App.css";
import MainLayout from "./layout/MainLayout";
import NotFound from "./component/NotFound";
import Home from "./pages/HomePage";
import TableLayout from "./layout/TableLayout";
import TableListPage, { tableLoader } from "./pages/TableList";
import LoginPage from "./pages/LoginPage";
import UnauthorizeError from "./component/UnauthorizeError";
import RequireAuth from "./component/RequireAuth";
import ROLES_LIST from "./utils/rolesList";
import { AuthProvider } from "./utils/AuthProvider";
import TableDetailReseve from "./pages/TableDetailReserve";
import RestaurantLayout, { tablesLoader } from "./pages/TablePlan";

import FirstPage from "./pages/FirstPage";
import RegisterPage, { RegisterAction } from "./pages/RegisterPage";
import { loadReserve } from "./pages/MyreservePage";
import Adminpage from "./pages/AdminPage";
import Admin from "./pages/Admin/Admin";
import AdminLayout from "./layout/AdminLayout";

function RouterApp() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />} errorElement={<NotFound />}>
        <Route index element={<FirstPage />} />

        <Route
          path="register"
          element={<RegisterPage />}
          action={RegisterAction}
        />
        <Route path="login" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
        <Route
          element={
            <RequireAuth allowedRoles={[...Object.values(ROLES_LIST)]} />
          }
        >
          <Route path="reservation" element={<TableLayout />}>
            <Route index element={<TableListPage />} loader={tableLoader} />
            <Route path=":id" element={<TableDetailReseve />} />
          </Route>
          <Route
            path="schematic"
            element={<RestaurantLayout />}
            loader={tablesLoader}
          />

          <Route
            path="myreserve"
            element={<Adminpage />}
            loader={loadReserve}
          />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Admin />} loader={tableLoader} />
          </Route>
        </Route>
        <Route path="unauthorize" element={<UnauthorizeError />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default function App() {
  return (
    <AuthProvider>
      <RouterApp />
    </AuthProvider>
  );
}
