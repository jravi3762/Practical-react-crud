import { Routes, Route } from "react-router-dom";
import Login from "../pages/login/Login";
import Products from "../pages/products/Products";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import AddProduct from "../pages/add-product/AddProduct";
import NotFound from "../components/NotFound";

const RouteComponents = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/products"
        element={
          <PrivateRoute>
            <Products />
          </PrivateRoute>
        }
      />
      <Route
        path="/add-product"
        element={
          <PrivateRoute>
            <AddProduct />
          </PrivateRoute>
        }
      />
      <Route
        path="/add-product/:id"
        element={
          <PrivateRoute>
            <AddProduct />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RouteComponents;
