import React from "react";
//import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Outlet,
} from "react-router-dom";
import "./App.css";
import Mainpage from "./pages/Mainpage";
import Register_handling from "./components/Register/Register_handling";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import LoginPage from "./pages/Login";
import { AuthProvider } from "./components/AuthContext";
import RecipeDetailPage from "./pages//Recipe";
import CreateRecipePage from "./pages/CreateRecipe";
import MyRecipesPage from "./pages/MyRecipes";
import RecipesPage from "./pages/Recipes";
import RecipeByIDPage from "./pages/RecipeByIDPage";
import RecipeByTagPage from "./pages/RecipeByTagPage";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HeaderMobile from "./components/Header/HeaderMobile";
import RecipeByID from "./components/RecipeByID/RecipeByID";

function App() {
  const ProtectedRoutes = () => {
    return (
      <>
        <Header />
        <HeaderMobile />
        <main>
          <Outlet />
        </main>
        <Footer />
      </>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoutes />,
      children: [
        {
          path: "/",
          element: <Mainpage />,
        },
        {
          path: "/Register",
          element: <Register_handling />,
        },
        {
          path: "/Login",
          element: <LoginPage />,
        },
        {
          path: "/forgot-password",
          element: <ForgotPassword />,
        },
        {
          path: "/recipy/:recipeId",
          element: <RecipeDetailPage />,
        },
        {
          path: "/recipes/:categoryId",
          element: <RecipeByIDPage />,
        },
        {
          path: "/recipes/:catId/:subCat",
          element: <RecipeByID />,
        },
        {
          path: "/recipes/my-recipes",
          element: <MyRecipesPage />,
        },
        {
          path: "/recipes/new",
          element: <CreateRecipePage />,
        },
      ],
    },
  ]);
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    /* // <Router>
    //   <AuthProvider>
    //     <Routes>
    //       <Route path="/*" element={<Mainpage />} />
    //       <Route path="/Register" element={<Register_handling />} />
    //       <Route path="/Login" element={< LoginPage/>} />
    //       <Route path="/forgot-password" element={< ForgotPassword/>} />
    //       <Route path="/recipes/:recipeId" element={< RecipeDetailPage/>} />
    //       <Route path="/recipes/new" element={< CreateRecipePage/>} />
    //       <Route path="/recipes/my-recipes" element={< MyRecipesPage/>} />
    //       <Route path="/recipes/" element={< RecipesPage/>} />
    //       <Route path="/recipesbyid/:categoryId" element={< RecipeByIDPage/>} />
    //       <Route path="/recipebytag/:tagId" element={<RecipeByTagPage />} />
    //     </Routes>
    //   </AuthProvider>
    // </Router> */
  );
}

export default App;
