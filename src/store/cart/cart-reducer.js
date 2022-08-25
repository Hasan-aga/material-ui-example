import { CART_TYPES } from "./cart.types";

const INITIAL_CART_STATE = {
  cartProducts: [],
  dropdownStatus: false,
};

export const cartReducer = function (state = INITIAL_CART_STATE, action) {
  const { type, payload } = action;

  switch (type) {
    case CART_TYPES.SET_CART_PRODUCTS:
      return {
        ...state,
        cartProducts: payload,
      };
    case CART_TYPES.TOGGLE_DROPDOWN:
      return {
        ...state,
        dropdownStatus: payload,
      };
    case CART_TYPES.CLEAR_CART:
      return {
        ...state,
        cartProducts: [],
      };
    default:
      return state;
  }
};
