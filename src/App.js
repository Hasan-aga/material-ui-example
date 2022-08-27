import "./App.css";
import ButtonAppBar from "./components/appbar/appbar.component";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkUserSession } from "./store/user/user.action";
import { startFetchCategories } from "./store/categories/categories.action";
import Shop from "./routes/shop/shop.route";
import SignHomepage from "./routes/sign-in-or-up/sign-homepage.route";
import Checkout from "./routes/checkout/checkout.route";
import Homepage from "./routes/homepage/homepage.route";

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
        <Route index element={<Homepage />}></Route>
        <Route path="shop/*" element={<Shop />}></Route>
        <Route path="login/" element={<SignHomepage />}></Route>
        <Route path="checkout/" element={<Checkout />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
