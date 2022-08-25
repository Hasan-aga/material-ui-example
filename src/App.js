import "./App.css";
import ButtonAppBar from "./components/appbar/appbar.component";
import { useEffect, useState } from "react";
import { getCategoriesAndDocuments } from "./utils/firebase/firebase.util";
import ProductMenu from "./components/product-menu/product-menu.component";
import { Route, Routes } from "react-router-dom";
import SignIn from "./routes/sign-in-or-up/sign-in.route";
import { useDispatch } from "react-redux";
import { checkUserSession } from "./store/user/user.action";
import { startFetchCategories } from "./store/categories/categories.action";
import Shop from "./routes/shop/shop.route";
import SignHomepage from "./routes/sign-in-or-up/sign-homepage.route";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);
  // load the categories
  useEffect(() => {
    dispatch(startFetchCategories());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<ButtonAppBar />}>
        <Route path="shop/" element={<Shop />}></Route>
        <Route path="login/" element={<SignHomepage />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
