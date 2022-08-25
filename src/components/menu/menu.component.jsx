import { Fragment, useState } from "react";
import { Collapse, IconButton, Menu, MenuItem } from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { useSelector } from "react-redux";
import { selectCartProducts } from "../../store/cart/cart.selector";
import MenuCard from "../card/menu-card.component";
import { TransitionGroup } from "react-transition-group";

export default function MenuWithIcon() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const cartProducts = useSelector(selectCartProducts);

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
        <ShoppingBagIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {cartProducts.length === 0 ? (
          <MenuItem>Your cart is empty</MenuItem>
        ) : (
          cartProducts.map((product) => (
            <MenuItem>
              <TransitionGroup>
                <Collapse key={product.name + 1}>
                  <MenuCard product={product} />
                </Collapse>
              </TransitionGroup>
            </MenuItem>
          ))
        )}
      </Menu>
    </Fragment>
  );
}
