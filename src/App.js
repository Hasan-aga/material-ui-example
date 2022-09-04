import "./App.css";
import { lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkUserSession } from "./store/user/user.action";
import { startFetchCategories } from "./store/categories/categories.action";
import { Box, CircularProgress } from "@mui/material";
const ButtonAppBar = lazy(() => import("./components/appbar/appbar.component"));
const Shop = lazy(() => import("./routes/shop/shop.route"));
const SignHomepage = lazy(() =>
  import("./routes/sign-in-or-up/sign-homepage.route")
);
const Checkout = lazy(() => import("./routes/checkout/checkout.route"));
const Homepage = lazy(() => import("./routes/homepage/homepage.route"));
const SuccessfulPayment = lazy(() =>
  import("./routes/checkout/successful-payment.route")
);
const NotFound = lazy(() =>
  import("./components/not-found/not-found.component")
);

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
    <Suspense
      fallback={
        <Box sx={{ display: "flex" }}>
          <CircularProgress sx={{ margin: "20% auto", width: "50%" }} />
        </Box>
      }
    >
      <Routes>
        <Route path="/" element={<ButtonAppBar />}>
          <Route index element={<Homepage />}></Route>
          <Route path="shop/*" element={<Shop />}></Route>
          <Route path="login/" element={<SignHomepage />}></Route>
          <Route path="checkout/" element={<Checkout />}></Route>
          <Route
            path="success/:message"
            element={<SuccessfulPayment />}
          ></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
