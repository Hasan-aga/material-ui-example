import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Button, Snackbar } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { selectCurrentUser } from "../../store/user/user.selectors";
import { signOutStart } from "../../store/user/user.action";

const LoginLogoutButton = function () {
  const currentUser = useSelector(selectCurrentUser);
  const [state, setState] = useState({
    open: false,
    vertical: "bottom",
    horizontal: "right",
  });
  const { open, vertical, horizontal } = state;
  const dispatch = useDispatch();

  const handleLogout = function () {
    handleOpenSnackbar();
    dispatch(signOutStart());
  };

  const handleOpenSnackbar = () => {
    setState({
      ...state,
      open: true,
    });
  };
  const handleCloseSnackbar = () => {
    setState({ ...state, open: false });
  };

  return (
    <Fragment>
      {currentUser ? (
        <Link color="inherit" underline="none" component={RouterLink} to="/">
          <Button onClick={handleLogout} color="inherit">
            Logout
          </Button>
        </Link>
      ) : (
        <Link
          color="inherit"
          underline="none"
          component={RouterLink}
          to="/login"
        >
          <Button color="inherit">Login</Button>
        </Link>
      )}
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleCloseSnackbar}
        message="You are logged-out"
        key={vertical + horizontal}
      />
    </Fragment>
  );
};
export default LoginLogoutButton;
