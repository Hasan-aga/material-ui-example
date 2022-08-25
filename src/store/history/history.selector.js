import { createSelector } from "reselect";

const selectHistoryReducer = (state) => state.history;

export const selectHistoryBoughtItems = createSelector(
  [selectHistoryReducer],
  (historySlice) => historySlice.boughtItems
);
