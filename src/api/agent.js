import axios from "axios";

const baseUrl = "http://webshopdemo.devweb.b-s.si";
const tenant = "WebShopDemo";
const company = "FLB";

const createApiAgent = () => {
  const axiosInstance = axios.create({
    baseURL: baseUrl,
  });

  const getItems = async (token) => {
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

  const getProducts = async (token) => {
    return getItems(token);
  };

  return {
    getItems,
    getProducts,
  };
};

export default createApiAgent;
