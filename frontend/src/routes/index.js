import { createBrowserRouter} from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import Login from '../pages/Login';
import ForgotPassword from '../pages/ForgotPassword';
import Signup from '../pages/Signup';
import User from '../pages/User';
import AdminPanel from '../pages/AdminPanel';
import AllUsers from '../pages/AllUsers';
import Products from '../pages/Products';
import ProductDetails from '../components/ProductDetails';
import SubcategoryProducts from '../pages/SubcategoryProducts';
import SubcategoryProductsShow from '../pages/SubcategoryProductsShow';
import Cards from '../components/Cards';



const router = createBrowserRouter([
  {
    path: "/",
    element:<App/>,
    children:[
      {
        path:"",
        element: <Home/>
      },
      {
        path: "/login",
        element: <Login/>
      },
      {
        path: "forgot-password",
        element: <ForgotPassword/>
      },
      {
        path: "/sign-up",
        element: <Signup/>
      },
      {
        path: "/user",
        element: <User/>
      },
      {
        path: "/product-category/:categoryNames",
        element: <SubcategoryProducts/>
      },
      {
        path: "product/:id",
        element : <ProductDetails/>
      },
      {
        path : "/product-category/:category/:subcategory",
        element : <SubcategoryProducts/>
      },
      {
        path : "product-category/:category/:subcategory",
        element : <Cards/>
      },

      {
        path: 'admin-panel',
        element: <AdminPanel/>,
        children: [
          {
          path: "all-users",
          element: <AllUsers/>
          },
          {
          path: "all-products",
          element: <Products/>
          }
      ]
          
        
      },
      
    ]
  }
])
export default router;