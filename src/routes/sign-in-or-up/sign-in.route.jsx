import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectCurrentUser,
  selectUserSignInError,
} from "../../store/user/user.selectors";
import {
  emailSignInStart,
  googleSignInStart,
  toggleSigninSignup,
} from "../../store/user/user.action";
import { Alert, CircularProgress, Collapse } from "@mui/material";
import { useEffect, useState } from "react";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link target="_blank" color="inherit" href="http://blog.hasan.one/">
        Hasan Aga
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const signinError = useSelector(selectUserSignInError);
  const currentUser = useSelector(selectCurrentUser);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const [signingIn, setSigningIn] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setSigningIn(false);
      navigateTo("../success/welcome-friend");
    }
  }, [currentUser, signingIn]);

  useEffect(() => {
    if (signinError) setSigningIn(false);
  }, [signinError]);

  const handleSubmit = (event) => {
    setSigningIn(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
    dispatch(emailSignInStart(data.get("email"), data.get("password")));
  };

  const handleLogGoogleUser = async () => {
    dispatch(googleSignInStart());
  };

  const handleOpenSignupForm = () => {
    dispatch(toggleSigninSignup());
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Collapse in={!signinError}>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
        </Collapse>
        <Collapse in={signinError}>
          <Alert severity="error">{`${signinError}`}</Alert>
        </Collapse>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Box
            sx={{
              marginTop: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              rowGap: 0,
            }}
          >
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 1 }}
            >
              {signingIn ? <CircularProgress color="secondary" /> : "Sign in"}
            </Button>
            <Button
              onClick={handleLogGoogleUser}
              color="secondary"
              fullWidth
              variant="contained"
              sx={{ mb: 2 }}
            >
              Sign in with Google
            </Button>
          </Box>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link
                component="button"
                type="button"
                onClick={handleOpenSignupForm}
                variant="body2"
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
