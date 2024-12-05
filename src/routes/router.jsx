import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import AuthLayout from "../layouts/AuthLayout";
import Home from "../pages/Home";
import Register from "../components/Register";
import Login from "../components/Login";
import AddMovie from "../pages/AddMovie";
import AllMovies from "../pages/AllMovies";
import MovieDetailsPage from "../pages/MovieDetailsPage";
import MyFavorites from "../pages/MyFavorites";
import UpdateMovieForm from "../components/UpdatedMovieForm";
import PrivateRoute from "./PrivateRoute";



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
        loader: () => fetch('http://localhost:3000/movies')
       
       
      },
      {
        path:"/add-movie",
        element:<PrivateRoute><AddMovie /></PrivateRoute> 
    },
    {
      path: "/all-movies",
      element: <AllMovies />
    },
    {   
    path: "/movie-details/:id",
    element: <PrivateRoute><MovieDetailsPage /></PrivateRoute> 
   
    },
    {
      path: "/my-favorites",
      element: <PrivateRoute><MyFavorites /></PrivateRoute> 
  },
  {
    path: "/update-movie/:id", 
    element: <PrivateRoute><UpdateMovieForm /></PrivateRoute> 
    

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
