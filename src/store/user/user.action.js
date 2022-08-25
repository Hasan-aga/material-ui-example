import { USER_TYPES } from "./user.types";

export const checkUserSession = () => {
  return { type: USER_TYPES.CHECK_USER_SESSION };
};
export const googleSignInStart = () => {
  return { type: USER_TYPES.GOOGLE_SIGN_IN_START };
};
export const emailSignInStart = (email, password) => {
  return { type: USER_TYPES.EMAIL_SIGN_IN_START, payload: { email, password } };
};
export const signInSuccess = (user) => {
  return { type: USER_TYPES.SIGN_IN_SUCCESS, payload: user };
};
export const signInFail = (error) => {
  return { type: USER_TYPES.SIGN_IN_FAIL, payload: error };
};
export const signOutStart = () => {
  return { type: USER_TYPES.SIGN_OUT };
};

export const signOutSuccess = () => {
  return { type: USER_TYPES.SIGN_OUT_SUCCESS };
};
export const signOutFail = (error) => {
  return { type: USER_TYPES.SIGN_OUT_FAIL, payload: error };
};

export const signUpStart = (email, password, displayName) => {
  return {
    type: USER_TYPES.SIGN_UP_START,
    payload: { email, password, displayName },
  };
};

export const signUpSuccess = (user, displayName) => {
  return {
    type: USER_TYPES.SIGN_UP_SUCCESS,
    payload: { currenUser: user, displayName },
  };
};
export const signUpFail = (error) => {
  return {
    type: USER_TYPES.SIGN_UP_FAIL,
    payload: error,
  };
};
