import { useEffect } from "react";
import { useAuth } from "../context/authContext";

const Home = () => {
  const { signin, authToken } = useAuth();

  useEffect(() => {
    if (authToken === null && !localStorage.getItem("authToken")) {
      signin();
    }
  }, [authToken, signin]);

  return <div>Home Page</div>;
};

export default Home;
