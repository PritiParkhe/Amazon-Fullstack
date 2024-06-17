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
import CategoryProducts from '../pages/CategoryProducts';
import ProductDetails from '../components/ProductDetails';
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
        element: <CategoryProducts/>
      },
      {
        path: "product/:id",
        element : <ProductDetails/>
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