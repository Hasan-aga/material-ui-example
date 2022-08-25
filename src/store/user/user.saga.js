import { all, call, put, takeLatest } from "redux-saga/effects";
import { USER_TYPES } from "./user.types";
import {
  addUserToAuthByEmailAndPassword,
  createUserDocumentFromAuth,
  getCurrentUser,
  signInWithPop,
  signUserIn,
  signUserOut,
} from "../../utils/firebase/firebase.util";
import {
  signInFail,
  signInSuccess,
  signOutFail,
  signOutSuccess,
  signUpFail,
} from "./user.action";

function* saveUserInDatabase(userAuth, addtionalInfo = {}) {
  try {
    let userData = yield call(createUserDocumentFromAuth, userAuth, {
      ...addtionalInfo,
    });

    userData = addtionalInfo
      ? {
          ...userData.data(),
          id: userData.id,
          displayName: addtionalInfo.displayName,
        }
      : { id: userData.id, ...userData.data() };

    yield put(signInSuccess({ ...userData }));
  } catch (error) {
    yield put(signInFail(error));
  }
}

function* getAuthUser() {
  try {
    const user = yield call(getCurrentUser);
    if (!user) return;
    yield call(saveUserInDatabase, user);
  } catch (error) {
    yield put(signInFail(error));
  }
}

function* onCheckUserSession() {
  yield takeLatest(USER_TYPES.CHECK_USER_SESSION, getAuthUser);
}

function* processGoogleSignIn() {
  try {
    const { user } = yield call(signInWithPop);
    yield call(saveUserInDatabase, user);
  } catch (error) {
    yield put(signInFail(error));
  }
}

function* onGoogleSignInStart() {
  try {
    yield takeLatest(USER_TYPES.GOOGLE_SIGN_IN_START, processGoogleSignIn);
  } catch (error) {
    yield put(signInFail(error));
  }
}

function* processEmailSignIn(action) {
  console.log("action ", action.payload);
  const { email, password } = action.payload;
  try {
    const { user } = yield call(signUserIn, email, password);
    yield call(saveUserInDatabase, user);
  } catch (error) {
    yield put(signInFail(error));
  }
}

function* onEmailSignInStart() {
  yield takeLatest(USER_TYPES.EMAIL_SIGN_IN_START, processEmailSignIn);
}

function* processSignOut() {
  try {
    yield call(signUserOut);
    yield call(signOutSuccess);
  } catch (error) {
    yield call(signOutFail(error));
  }
}

function* onSignOut() {
  yield takeLatest(USER_TYPES.SIGN_OUT, processSignOut);
}

function* processSignUp(action) {
  const { email, password, displayName } = action.payload;
  try {
    const { user } = yield call(
      addUserToAuthByEmailAndPassword,
      email,
      password
    );
    yield call(saveUserInDatabase, user, { displayName });
  } catch (error) {
    yield put(signUpFail(error));
  }
}

function* onSignUpStart() {
  yield takeLatest(USER_TYPES.SIGN_UP_START, processSignUp);
}

export function* userSaga() {
  yield all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onSignOut),
    call(onEmailSignInStart),
    call(onSignUpStart),
  ]);
}
