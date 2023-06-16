import { Outlet, useNavigation } from "react-router-dom";
import Spinner from "../component/Spinner";
const TableLayout = () => {
  const navigation = useNavigation();
  return (
    <>
      <div className="home-page">
        <div>
          {navigation.state === "loading" ? <Spinner /> : ""}
          <Outlet />
        </div>
      </div>
    </>
  );
};
export default TableLayout;
