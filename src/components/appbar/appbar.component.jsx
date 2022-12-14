import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuWithIcon from "../menu/menu.component";
import { ReactComponent as CrownIcon } from "../../assets/crown.svg";
import { SvgIcon } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Container } from "@mui/system";
import { Link as RouterLink, useLocation } from "react-router-dom";
import Link from "@mui/material/Link";
import LoginLogoutButton from "../buttons/login-logout-button.component";

export default function ButtonAppBar() {
  const location = useLocation();
  const currentPath = location.pathname.slice(
    location.pathname.lastIndexOf("/") + 1
  );

  return (
    <Box sx={{ flexGrow: 1, width: "100%" }}>
      <AppBar position="static">
        <Toolbar>
          <Link component={RouterLink} to="/">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <SvgIcon component={CrownIcon} inheritViewBox />
            </IconButton>
          </Link>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, textTransform: "uppercase" }}
          >
            {currentPath.length > 6 ? "" : currentPath}
          </Typography>
          <Link
            color="inherit"
            underline="none"
            component={RouterLink}
            to="/shop"
          >
            <Button color="inherit">Shop</Button>
          </Link>
          <LoginLogoutButton />
          <MenuWithIcon />
        </Toolbar>
      </AppBar>
      <Container>
        <Outlet />
      </Container>
    </Box>
  );
}
