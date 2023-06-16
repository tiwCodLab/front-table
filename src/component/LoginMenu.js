import { NavLink, redirect, useLocation } from "react-router-dom";
import { useAuth } from "../utils/AuthProvider";
import usePermission from "../utils/usePermission";
import ROLES_LIST from "../utils/rolesList";

export default function LoginMenu() {
  const auth = useAuth();
  const location = useLocation();
  let { hasPermission } = usePermission();
  return (
    <>
      {auth?.user?.email ? (
        <div className="user-menu">
          <ul>
            {hasPermission([ROLES_LIST.Admin]) && (
              <nav>
                <NavLink to="/admin">Manage</NavLink>&nbsp;
              </nav>
            )}

            <div className="email-name">{auth.user.email}</div>
            <div className="bt-singout">
              <button
                onClick={() => {
                  auth.signout(() => redirect("/"));
                }}
              >
                <NavLink to="/">Sign Out</NavLink>
              </button>
            </div>
          </ul>
        </div>
      ) : (
        <NavLink to="/login" state={{ from: location.pathname }}>
          Login
        </NavLink>
      )}
    </>
  );
}
