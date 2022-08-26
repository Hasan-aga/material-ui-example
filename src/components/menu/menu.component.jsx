import { Fragment, useState } from "react";
import {
  Badge,
  Box,
  Button,
  Collapse,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { useSelector } from "react-redux";
import {
  selectCartCount,
  selectCartProducts,
} from "../../store/cart/cart.selector";
import MenuCard from "../card/menu-card.component";
import { TransitionGroup } from "react-transition-group";
import EmptyCartIcon from "@mui/icons-material/ProductionQuantityLimits";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";

export default function MenuWithIcon() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const cartProducts = useSelector(selectCartProducts);
  const cartCount = useSelector(selectCartCount);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Fragment>
      <IconButton
        color="inherit"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Badge badgeContent={cartCount} color="secondary">
          <ShoppingBagIcon />
        </Badge>
      </IconButton>
      <Menu
        sx={{ maxHeight: "70vh" }}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {cartProducts.length === 0 ? (
          <MenuItem>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography>Your cart is empty</Typography>
              <IconButton size="large">
                <EmptyCartIcon />
              </IconButton>
            </Box>
          </MenuItem>
        ) : (
          <Container>
            {cartProducts.map((product) => (
              <MenuItem key={product.imageUrl}>
                <TransitionGroup>
                  <Collapse key={product.name + 1}>
                    <MenuCard product={product} />
                  </Collapse>
                </TransitionGroup>
              </MenuItem>
            ))}
            <Link component={RouterLink} to="/checkout">
              <Button fullWidth variant="contained" primary>
                Checkout
              </Button>
            </Link>
          </Container>
        )}
      </Menu>
    </Fragment>
  );
}
