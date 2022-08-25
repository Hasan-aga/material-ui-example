import { takeLatest, all, call, put } from "redux-saga/effects";
import { CATEGORIES_TYPES } from "./categories.types";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.util";
import {
  fetchCategoriesFail,
  fetchCategoriesSuccess,
} from "./categories.action";

function* fetchCategoriesAsync() {
  try {
    const result = yield call(getCategoriesAndDocuments);
    yield put(fetchCategoriesSuccess(result));
  } catch (error) {
    yield put(fetchCategoriesFail(error));
  }
}

function* onFetchCategories() {
  yield takeLatest(
    CATEGORIES_TYPES.FETCHING_CURRENT_CATEGORIES,
    fetchCategoriesAsync
  );
}

export function* categoriesSaga() {
  yield all([call(onFetchCategories)]);
}
