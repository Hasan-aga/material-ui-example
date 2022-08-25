import { CATEGORIES_TYPES } from "./categories.types";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.util";

export const startFetchCategories = () => {
  return { type: CATEGORIES_TYPES.FETCHING_CURRENT_CATEGORIES };
};

export const fetchCategoriesSuccess = (categories) => {
  return {
    type: CATEGORIES_TYPES.CURRENT_CATEGORIES_SUCCESSFUL_FETCH,
    payload: categories,
  };
};

export const fetchCategoriesFail = (error) => {
  return {
    type: CATEGORIES_TYPES.CURRENT_CATEGORIES_FAIL_FETCH,
    payload: error,
  };
};

export const fetchCategoriesAsync = function () {
  return async function (dispatch) {
    dispatch(startFetchCategories());
    try {
      const result = await getCategoriesAndDocuments();
      dispatch(fetchCategoriesSuccess(result));
    } catch (error) {
      dispatch(fetchCategoriesFail(error));
    }
  };
};
