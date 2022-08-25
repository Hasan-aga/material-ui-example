import { Fragment } from "react";
import { useSelector } from "react-redux";
import ProductMenu from "../../components/product-menu/product-menu.component";
import {
  selectCategoriesAreFetching,
  selectCategoriesMap,
} from "../../store/categories/categories.selector";

const Shop = function () {
  const categoryMap = useSelector(selectCategoriesMap);
  const isFetchingCategories = useSelector(selectCategoriesAreFetching);
  return isFetchingCategories ? (
    <Fragment />
  ) : (
    <ProductMenu categories={categoryMap} />
  );
};

export default Shop;
