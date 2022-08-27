import { createSelector } from "reselect";

const selectCategoriesReducer = (state) => {
  return state.categories;
};

const selectCategoriesArray = createSelector(
  [selectCategoriesReducer],
  (categoriesSlice) => {
    return categoriesSlice.categoryArray;
  }
);
export const selectCategoriesMap = createSelector(
  [selectCategoriesArray],
  (categoriesArray) => {
    if (!categoriesArray) return null;
    return categoriesArray.reduce((acc, { title, items }) => {
      acc[title.toLowerCase()] = items;
      return acc;
    }, {});
  }
);

export const selectCategoriesPreview = createSelector(
  [selectCategoriesMap, (state, previewSize) => previewSize],
  (categoriesMap, previewSize) => {
    const categoryWithPreview = {};
    for (const cat in categoriesMap) {
      categoryWithPreview[cat] = categoriesMap[cat].slice(0, previewSize);
    }
    return categoryWithPreview;
  }
);

export const selectCategoriesAreFetching = createSelector(
  [selectCategoriesReducer],
  (categorySlice) => categorySlice.fetching
);
