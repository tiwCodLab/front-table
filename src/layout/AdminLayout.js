import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <>
      <div>
        <div className="admin"></div>
        <Outlet />
      </div>
    </>
  );
};
export default AdminLayout;
