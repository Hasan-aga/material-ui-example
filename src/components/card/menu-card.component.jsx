import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useDispatch, useSelector } from "react-redux";
import { removeProductFromCart } from "../../store/cart/cart-action";
import { selectCartProducts } from "../../store/cart/cart.selector";

const MenuCard = function ({ product }) {
  const dispatch = useDispatch();
  const cartProducts = useSelector(selectCartProducts);

  const handleRemoveFromCart = () =>
    dispatch(removeProductFromCart(product, cartProducts));

  return (
    <Card sx={{ display: "flex" }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
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
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
          <IconButton onClick={handleRemoveFromCart} aria-label="previous">
            <DeleteOutlineIcon />
          </IconButton>
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 60 }}
        image={product.imageUrl}
        alt={product.name}
      />
    </Card>
  );
};

export default MenuCard;
