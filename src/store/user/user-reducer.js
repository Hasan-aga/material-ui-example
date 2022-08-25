import { USER_TYPES } from "./user.types";

const INITIAL_USER_STATE = {
  currentUser: null,
  isLoading: false,
  error: null,
  signInError: null,
  signUpError: null,
  toggleSigninSignup: true,
};

export const userReducer = function (state = INITIAL_USER_STATE, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_TYPES.SIGN_IN_SUCCESS:
      return {
        ...state,
        error: null,
        currentUser: payload,
      };
    case USER_TYPES.SIGN_IN_FAIL:
      return {
        ...state,
        signInError: payload,
      };
    case USER_TYPES.SIGN_OUT:
      return {
        ...state,
        currentUser: null,
        error: null,
      };

    case USER_TYPES.SIGN_UP_FAIL:
      return {
        ...state,
        signUpError: payload,
      };
    case USER_TYPES.TOGGLE_SIGNIN_SIGNUP:
      return {
        ...state,
        toggleSigninSignup: !state.toggleSigninSignup,
      };
    default:
      return state;
  }
};
