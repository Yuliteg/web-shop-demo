import axios from "axios";
import { baseUrl, company, tenant } from "../lib/constants";

const createApiAgent = () => {
  const axiosInstance = axios.create({
    baseURL: baseUrl,
  });

  const getProducts = async (token) => {
    try {
      const response = await axiosInstance.get(
        `/api/public/${tenant}/pub/${company}/Item/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return {
    getProducts
  };
};

export default createApiAgent;
