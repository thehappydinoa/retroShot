import React, { useEffect, useState, useContext } from "react";
import app, { auth } from "./config";
import { getScore } from "../../utils";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        user.score = await getScore();
      }
      setUser(user);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, app, auth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthContext;
