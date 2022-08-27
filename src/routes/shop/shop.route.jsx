import { Routes, Route } from "react-router-dom";
import Preview from "../../components/preview/preview.component";

const Shop = function () {
  return (
    <Routes>
      <Route index element={<Preview size={3} />}></Route>
      <Route path=":category" element={<Preview />}></Route>
    </Routes>
  );
};

export default Shop;
