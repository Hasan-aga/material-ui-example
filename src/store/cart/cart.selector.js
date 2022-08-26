import { createSelector } from "reselect";

const selectCartReducer = (state) => state.cart;

export const selectCartProducts = createSelector(
  [selectCartReducer],
  (cartSlice) => cartSlice.cartProducts
);
export const selectDropdownStatus = createSelector(
  [selectCartReducer],
  (cartSlice) => cartSlice.dropdownStatus
);
export const selectCartTotal = createSelector(
  [selectCartProducts],
  (cartProducts) =>
    cartProducts.reduce(
      (acc, product) => (acc += product.quantity * product.price),
      0
    )
);
export const selectCartCount = createSelector(
  [selectCartProducts],
  (cartProducts) =>
    cartProducts.reduce((acc, product) => (acc += product.quantity), 0)
);
