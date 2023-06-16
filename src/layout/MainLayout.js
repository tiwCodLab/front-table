import LoginMenu from "../component/LoginMenu";

const { NavLink, Outlet } = require("react-router-dom");

const MainLayout = () => {
  return (
    <>
      <div className="container-main">
        <nav>
          <NavLink to="/home">Home</NavLink>&nbsp;
          <NavLink to="/reservation">Reservation</NavLink>&nbsp;
          <NavLink to="/myreserve">MyReservation</NavLink>&nbsp;
          <NavLink to="/admin">Admin</NavLink>&nbsp;
          <LoginMenu />
        </nav>
      </div>
      <div className="title-main">
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
