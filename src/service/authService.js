import axios from "axios";

const api = axios.create({
  baseURL: "https://dummyjson.com",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("token"));
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export const loginApi = async (loginData) => {
  const response = await api.post("/auth/login", {
    username: loginData.username,
    password: loginData.password,
  });

  return response.data;
};

export const fetchProductsApi = async () => {
  const response = await api.get("/products");
  return response.data;
};

export const addProductApi = async (productData) => {
  const response = await api.post("/products/add", {
    title: productData.productName,
    description: productData.description,
    price: Number(productData.price),
  });

  return response.data;
};

export const fetchProductByIdApi = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const updateProductApi = async ({ id, data }) => {
  const response = await api.put(`/products/${id}`, {
    title: data.productName,
    description: data.description,
    price: Number(data.price),
  });

  return response.data;
};

export const deleteProductApi = async (id) => {
  const response = await api.delete(`/products/${id}`);
  return response.data; 
};

export default api;
