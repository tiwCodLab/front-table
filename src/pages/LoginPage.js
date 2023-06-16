// file: /page/LoginPage.js
import { useState, useCallback, useEffect, useRef } from "react";
import { useLocation, useNavigate, useNavigation } from "react-router-dom";
import { useAuth } from "../utils/AuthProvider";
import Spinner from "../component/Spinner";
const LoginPage = () => {
  const auth = useAuth();
  const [loginLoading, setLoginLoading] = useState(false);

  const navigate = useNavigate();
  const navigation = useNavigation();
  const location = useLocation();

  let from = location.state?.from || "/";
  const emailRef = useRef();
  const errRef = useRef();

  const [error, setError] = useState(null);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const email = data.get("email");
    const password = data.get("password");

    try {
      setLoginLoading(true);
      const response = await fetch("/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }), // data type match "Content-Type" header
      });
      if (response.ok) {
        const data = await response.json();
        const accessToken = data?.accessToken;
        const roles = data?.roles;
        const user = { email, roles, accessToken };
        await auth.signin(user, () => {
          return navigate(from, { replace: true });
        });
      } else if (response.status === 400) {
        setError("Missing Email or Password");
      } else if (response.status === 401) {
        setError("Unauthorized");
        console.log(">>> ", from);
      } else {
        setError("Login Failed");
      }
    } catch (error) {
      setError("Error. Try again later (" + error + ")!");
    } finally {
      setLoginLoading(false);
    }
    errRef.current.focus();
  };

  const redirect = useCallback(() => {
    if (!loginLoading && auth && auth.user && auth.user.email) {
      if (from) {
        return navigate(from, { replace: true });
      } else {
        if (window.history.state && window.history.state.idx > 0) {
          navigate(-1); //, { replace: true });
        } else {
          navigate("/", { replace: true });
        }
      }
    }
  }, [auth, from, loginLoading, navigate]);

  // useEffect to make the redirect callback if user already logon
  useEffect(() => redirect(), [redirect]);

  return (
    <>
      {navigation.state === "loading" ? (
        <Spinner />
      ) : (
        <>
          <div>
            <form onSubmit={handleSubmit} className="login-form">
              <p ref={errRef} className={error ? "errmsg" : "hide"}>
                {error}
              </p>
              <img
                src={require(`../images/lookkai.png`)}
                alt="Lookkai"
                width="280px"
                height="190px"
                className="right"
              />
              <h5 className="font">
                <b>Already a member?</b>&nbsp;
                <a href="register">Sign in</a>
              </h5>

              <div className="form-input">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  ref={emailRef}
                  placeholder="youremail@site.com"
                  autoComplete="off"
                  required
                />
              </div>
              <div className="form-input">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="password"
                  autoComplete="off"
                  required
                />
              </div>
              <button type="submit">Login</button>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default LoginPage;
