import { CART_TYPES } from "./cart.types";

export const setCartProducts = (products) => {
  return { type: CART_TYPES.SET_CART_PRODUCTS, payload: products };
};

export const toggleDropdown = (dropdownStatus) => {
  return {
    type: CART_TYPES.TOGGLE_DROPDOWN,
    payload: !dropdownStatus,
  };
};

export const addToCart = (product, cartProducts) => {
  return {
    type: CART_TYPES.SET_CART_PRODUCTS,
    payload: getNewProductList(product, cartProducts),
  };
};

export const removeProductFromCart = (product, cartProducts) => {
  const newCartProducts = cartProducts.filter(
    (element) => element.name !== product.name
  );
  if (!cartProducts || !newCartProducts) return;

  return { type: CART_TYPES.SET_CART_PRODUCTS, payload: [...newCartProducts] };
};

export const clearCart = () => {
  return { type: CART_TYPES.CLEAR_CART };
};

export const changeProductQuantity = (
  product,
  cartProducts,
  increment = true
) => {
  if (product.quantity <= 1 && !increment) return { type: "none" };
  increment ? (product.quantity += 1) : (product.quantity -= 1);
  return { type: CART_TYPES.SET_CART_PRODUCTS, payload: [...cartProducts] };
};

const getNewProductList = (product, cartProducts) => {
  if (!cartProducts) return [{ quantity: 1, ...product }];

  if (!cartProducts.find((element) => product.name === element.name))
    return [{ quantity: 1, ...product }, ...cartProducts];

  const existingProduct = cartProducts.find(
    (element) => element.name === product.name
  );
  existingProduct.quantity += 1;
  return [...cartProducts];
};
