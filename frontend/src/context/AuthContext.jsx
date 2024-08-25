import { createContext, useState, useContext } from "react";

export const Authcontext = createContext();

export const useAuthContext = () => {
  return useContext(Authcontext);
};

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem("authUser")) || null
  );

  return (
    <Authcontext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </Authcontext.Provider>
  );
};
