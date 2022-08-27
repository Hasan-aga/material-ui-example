import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProductMenu from "../product-menu/product-menu.component";
import {
  selectCategoriesAreFetching,
  selectCategoriesPreview,
} from "../../store/categories/categories.selector";
import { useParams } from "react-router-dom";

const Preview = function (props) {
  const isFetchingCategories = useSelector(selectCategoriesAreFetching);
  const categoryName = useParams();
  let categoriesPreview = useSelector((state) =>
    selectCategoriesPreview(state, props.size)
  );

  const [selectedCategory, setSelectedCategory] = useState({});

  useEffect(
    () => {
      if (categoryName.category && !isFetchingCategories) {
        const details = {};
        details[categoryName.category] =
          categoriesPreview[categoryName.category];
        setSelectedCategory(details);
      }
    },
    [categoryName, categoriesPreview, isFetchingCategories],
    isFetchingCategories
  );

  const objectToRender = selectedCategory[categoryName.category]
    ? selectedCategory
    : categoriesPreview;

  return isFetchingCategories ? (
    <Fragment />
  ) : (
    <ProductMenu
      categories={objectToRender}
      isPreviewList={Boolean(props.size)}
    />
  );
};

export default Preview;
