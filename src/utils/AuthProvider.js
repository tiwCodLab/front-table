import { createContext, useState, useContext } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  let [user, setUser] = useState(() =>
    sessionStorage.getItem("aToken")
      ? JSON.parse(sessionStorage.getItem("aToken"))
      : {}
  );

  let signin = (newUser, callback) => {
    setUser(newUser);
    sessionStorage.setItem("aToken", JSON.stringify(newUser));
    callback();
  };

  let signout = (callback) => {
    if (sessionStorage.getItem("aToken")) sessionStorage.clear();
    setUser({});
    callback();
  };

  return (
    <AuthContext.Provider value={{ user, setUser, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
