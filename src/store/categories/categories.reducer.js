import { CATEGORIES_TYPES } from "./categories.types";

const INIT_CATEGORIES = { categoryArray: [], fetching: false, error: null };

export const categoriesReducer = (state = INIT_CATEGORIES, action) => {
  const { type, payload } = action;

  switch (type) {
    case CATEGORIES_TYPES.FETCHING_CURRENT_CATEGORIES:
      return { ...state, fetching: true };
    case CATEGORIES_TYPES.CURRENT_CATEGORIES_SUCCESSFUL_FETCH:
      return { ...state, fetching: false, categoryArray: payload };
    case CATEGORIES_TYPES.CURRENT_CATEGORIES_FAIL_FETCH:
      return { ...state, fetching: false, error: payload };

    default:
      return state;
  }
};
