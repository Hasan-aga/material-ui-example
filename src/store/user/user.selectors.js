import { createSelector } from "reselect";

// export const selectCurrentUser = (state) => state.user.currentUser;
// export const selectUserError = (state) => state.user.error;
// export const selectUserSignInError = (state) => state.user.signInError;
// export const selectUserSignUpError = (state) => state.user.signUpError;

const selectUserReducer = (state) => state.user;
export const selectCurrentUser = createSelector(
  [selectUserReducer],
  (userSlice) => {
    return userSlice.currentUser;
  }
);
export const selectUserError = createSelector(
  [selectUserReducer],
  (userSlice) => {
    return userSlice.error;
  }
);
export const selectUserSignInError = createSelector(
  [selectUserReducer],
  (userSlice) => {
    return userSlice.signInError;
  }
);
export const selectUserSignUpError = createSelector(
  [selectUserReducer],
  (userSlice) => {
    return userSlice.signUpError;
  }
);
export const selectUserToggleSigninSignup = createSelector(
  [selectUserReducer],
  (userSlice) => {
    return userSlice.toggleSigninSignup;
  }
);
