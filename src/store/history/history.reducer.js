import { HISTORY_TYPES } from "./history.types";

const INITIAL_HISTORY_STATE = {
  boughtItems: [],
};

export const historyReducer = (state = INITIAL_HISTORY_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case HISTORY_TYPES.SAVE_CURRENT_CART:
      return {
        ...state,
        boughtItems: [...payload],
      };

    default:
      return state;
  }
};
