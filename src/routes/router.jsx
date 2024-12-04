import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import AuthLayout from "../layouts/AuthLayout";
import Home from "../pages/Home";
import Register from "../components/Register";
import Login from "../components/Login";
import AddMovie from "../pages/AddMovie";



const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
       
        <HomeLayout />
      </>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
       
      },
      {
        path:"/add-movie",
        element: <AddMovie />
    },
   
    ],
  },
  {
    path: "auth",
    element: (
      <>
     
        <AuthLayout />
      </>
    ),
    children: [
      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/register",
        element: <Register />,
      },
    ],
  },
//   {
//     path: "*",
//     element: <ErrorPage></ErrorPage>
//   },
]);

export default router;
