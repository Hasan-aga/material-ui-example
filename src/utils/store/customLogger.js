export const loggerMiddleware = (store) => (next) => (action) => {
  if (!action.type) return next(action);

  console.log("type: ", action.type);
  console.log("payload: ", action.payload);
  console.log("current state: ", store.getState());

  //   pass the action to reducers and update the store
  next(action);

  // now we can log the next state
  console.log("next state: ", store.getState());
};
