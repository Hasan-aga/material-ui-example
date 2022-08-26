import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/AddCircleOutline";
import RemoveIcon from "@mui/icons-material/RemoveCircleOutline";
import { useDispatch, useSelector } from "react-redux";
import {
  changeProductQuantity,
  removeProductFromCart,
} from "../../store/cart/cart-action";
import { selectCartProducts } from "../../store/cart/cart.selector";

const MenuCard = function ({ product, width = 250 }) {
  const dispatch = useDispatch();
  const cartProducts = useSelector(selectCartProducts);

  const handleRemoveFromCart = () =>
    dispatch(removeProductFromCart(product, cartProducts));

  const handleIncreaseQuantity = () => {
    dispatch(changeProductQuantity(product, cartProducts));
  };
  const handleDecreaseQuantity = () => {
    dispatch(changeProductQuantity(product, cartProducts, false));
  };

  return (
    <Card sx={{ display: "flex", width: { width } }}>
      <Box sx={{ display: "flex", flexDirection: "column", width: "70%" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h7">
            {product.name}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            ${product.price}
          </Typography>
        </CardContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            pl: 1,
            pb: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton onClick={handleIncreaseQuantity}>
              <AddIcon />
            </IconButton>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {product.quantity}
            </Typography>
            <IconButton onClick={handleDecreaseQuantity}>
              <RemoveIcon />
            </IconButton>
          </Box>
          <IconButton
            sx={{ mr: 2 }}
            onClick={handleRemoveFromCart}
            aria-label="previous"
          >
            <DeleteOutlineIcon />
          </IconButton>
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: "30%" }}
        image={product.imageUrl}
        alt={product.name}
      />
    </Card>
  );
};

export default MenuCard;
