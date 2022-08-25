import { HISTORY_TYPES } from "./history.types";

export const saveCurrentCartToHistory = (
  currentCartProducts,
  exisitingHistoryProductGroups
) => {
  const productGroup = {
    date: new Date(),
    boughtTogether: currentCartProducts,
  };
  return {
    type: HISTORY_TYPES.SAVE_CURRENT_CART,
    payload: [productGroup, ...exisitingHistoryProductGroups],
  };
};
