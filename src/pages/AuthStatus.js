import { Link } from "react-router-dom";
import { useAuth } from "../utils/AuthProvider";
export default function AuthStatus() {
  let auth = useAuth();

  if (!auth.user?.email) {
    return (
      <>
        <div className="home-page">
          <h1>Enjoy kub pom</h1>
          <p>
            Delicious Food, Exellent Service,
            <br />
            Stunning Views!
          </p>
          <p>
            You are not login. Would you like to <Link to="/login">Login</Link>
          </p>
        </div>
      </>
    );
  }

  return (
    <div>
      <div className="home-page">
        <h1>Enjoy kub pom</h1>
        <p>
          Delicious Food, Exellent Service,
          <br />
          Stunning Views!
        </p>
        <Link to="/reservation">Reservation HERE</Link>
      </div>
    </div>
  );
}
