import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import Signup from "../pages/Signup";
import User from "../pages/User";
import AdminPanel from "../pages/AdminPanel";
import AllUsers from "../pages/AllUsers";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
import CategoryCardsList from "../pages/CategoryCardsList";
import Cart from "../components/Cart";
import SearchProduct from "../pages/SearchProduct";
import CategoryProducts from "../components/CategoryProducts";
import Checkout from "../pages/Checkout";
import Success from "../pages/Success";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/sign-up",
        element: <Signup />,
      },
      {
        path: "/user",
        element: <User />,
      },
      {
        path: "product/subcategory",
        element: <CategoryProducts/>,
      },
      {
        path: "product/:id",
        element: <ProductDetails />,
      },
      {
        path: "cartproducts",
        element: <Cart/>,
      },
      {
        path: "product",
        element: <CategoryCardsList />,
      },
      {
        path : "search",
        element : <SearchProduct/>
      },
      {
        path: `/subcategory`,
        element: <CategoryProducts/>
      },
      {
        path: "/checkout",
        element: <Checkout />
      },
      {
        path: "/success",
        element: <Success />
      },
      {
        path: "admin-panel",
        element: <AdminPanel />,
        children: [
          {
            path: "all-users",
            element: <AllUsers />,
          },
          {
            path: "all-products",
            element: <Products />,
          },
        ],
      },
    ],
  },
]);
export default router;
