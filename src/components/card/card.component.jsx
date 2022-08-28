import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Avatar, Chip, Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectCartProducts } from "../../store/cart/cart.selector";
import { addToCart } from "../../store/cart/cart-action";
import PaidIcon from "@mui/icons-material/Paid";
import { Box } from "@mui/system";

export default function MediaCard({ product }) {
  const dispatch = useDispatch();
  const existingProducts = useSelector(selectCartProducts);

  const handleAddToCart = () => {
    dispatch(addToCart(product, existingProducts));
  };
  return (
    <Card id={product.name + product.imageUrl} sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="300"
        image={product.imageUrl}
        alt={product.name}
      />
      <CardContent sx={{ position: "relative" }}>
        <Chip
          avatar={
            <Avatar>
              <PaidIcon />
            </Avatar>
          }
          label={product.price}
          color="primary"
          size="medium"
          sx={{
            position: "absolute",
            top: "-1rem",
            left: "50%",
            transform: "translate(-50%)",
          }}
        />
        <Container maxWidth="lg">
          <Grid container>
            <Grid
              xs={12}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Typography gutterBottom variant="h5" component="div">
                {product.name}
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </CardContent>

      <CardActions sx={{ justifyContent: "center" }}>
        <Button
          variant="contained"
          onClick={handleAddToCart}
          size="large"
          sx={{ padding: "1rem" }}
        >
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
}
