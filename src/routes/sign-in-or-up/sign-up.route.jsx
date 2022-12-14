import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  googleSignInStart,
  signUpStart,
  toggleSigninSignup,
} from "../../store/user/user.action";
import { useEffect, useState } from "react";
import {
  selectCurrentUser,
  selectUserSignUpError,
} from "../../store/user/user.selectors";
import { useNavigate } from "react-router-dom";
import { Alert, CircularProgress, Collapse } from "@mui/material";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignUp() {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const [signupStarted, setSignupStarted] = useState(false);
  const currentUser = useSelector(selectCurrentUser);
  let signupError = useSelector(selectUserSignUpError);
  console.log("******************", signupError);

  useEffect(() => {
    console.log(":::::::::::::::", signupError);
    if (currentUser) {
      setSignupStarted(false);
      navigateTo("../success/welcome-friend");
    }
  }, [currentUser, signupStarted]);

  useEffect(() => {
    if (signupError) setSignupStarted(false);
  }, [signupError]);

  const handleSubmit = (event) => {
    setSignupStarted(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
      displayName: data.get("displayName"),
    });
    dispatch(
      signUpStart(
        data.get("email"),
        data.get("password"),
        data.get("displayName")
      )
    );
  };

  const handleLogGoogleUser = async () => {
    dispatch(googleSignInStart());
  };

  const handleOpenSigninForm = () => {
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
        <Collapse in={!signupError}>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
        </Collapse>
        <Collapse in={signupError}>
          <Alert severity="error">{`${signupError}`}</Alert>
        </Collapse>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="displayName"
                required
                fullWidth
                id="displayName"
                label="Display Name"
                autoFocus
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
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
              {signupStarted ? (
                <CircularProgress color="secondary" />
              ) : (
                "Sign up"
              )}
            </Button>
            <Button
              onClick={handleLogGoogleUser}
              color="secondary"
              fullWidth
              variant="contained"
              sx={{ mb: 2 }}
            >
              Sign up with Google
            </Button>
          </Box>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link
                component="button"
                type="button"
                onClick={handleOpenSigninForm}
                variant="body2"
              >
                {"Already have an account? Sign in"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
