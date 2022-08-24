import "./App.css";
import ButtonAppBar from "./components/appbar/appbar.component";
import { useEffect, useState } from "react";
import { getCategoriesAndDocuments } from "./utils/firebase/firebase.util";
import ProductMenu from "./components/product-menu/product-menu.component";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      setData(await getCategoriesAndDocuments());
    };
    getData();
  }, []);

  return (
    <div className="App">
      <ButtonAppBar />
      <ProductMenu categories={data} />
    </div>
  );
}

export default App;
