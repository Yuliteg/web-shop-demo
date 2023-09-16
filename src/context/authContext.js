import axios from "axios";
import { createContext, useContext, useState } from "react";
import jwt_decode from "jwt-decode";
import { baseUrl, tenant } from "../lib/constants";

const email = "admin@local";
const password = "Admin";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(
    localStorage.getItem("authToken")
      ? JSON.parse(localStorage.getItem("authToken"))
      : null
  );
  const [user, setUser] = useState(
    localStorage.getItem("authToken")
      ? jwt_decode(localStorage.getItem("authToken"))
      : null
  );

  const signIn = async () => {
    try {
      const response = await axios.post(
        `${baseUrl}/api/${tenant}/Account/Authenticate`,
        {
          email,
          password,
        }
      );

      if (response.status === 200) {
        console.log("Signin successful");
        setAuthToken(response.data.token);
        localStorage.setItem("authToken", JSON.stringify(response.data.token));
        setUser(jwt_decode(response.data.token));
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  return (
    <AuthContext.Provider value={{ signIn, authToken, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
