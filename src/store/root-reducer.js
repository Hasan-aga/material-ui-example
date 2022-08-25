import { combineReducers } from "redux";
import { cartReducer } from "./cart/cart-reducer";
import { historyReducer } from "./history/history.reducer";
import { categoriesReducer } from "./categories/categories.reducer";
import { userReducer } from "./user/user-reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  categories: categoriesReducer,
  cart: cartReducer,
  history: historyReducer,
});
