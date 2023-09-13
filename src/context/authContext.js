import axios from "axios";
import { createContext, useContext, useState } from "react";
import jwt_decode from "jwt-decode";

const baseUrl = "http://webshopdemo.devweb.b-s.si";
const tenant = "WebShopDemo";
const login = "admin@local";
const password = "Admin";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  const [user, setUser] = useState(
    localStorage.getItem("authToken")
      ? jwt_decode(localStorage.getItem("authToken"))
      : null
  );

  const signin = async () => {
    try {
      const response = await axios.post(
        `${baseUrl}/api/${tenant}/Account/Authenticate`,
        {
          email: login,
          password: password,
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
    <AuthContext.Provider value={{ signin, authToken, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
