import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectCartProducts } from "../../store/cart/cart.selector";
import { addToCart } from "../../store/cart/cart-action";

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
      <CardContent>
        <Container maxWidth="lg">
          <Grid container>
            <Grid
              xs={6}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Typography gutterBottom variant="h5" component="div">
                {product.name}
              </Typography>
            </Grid>
            <Grid
              xs={6}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Typography gutterBottom variant="h5" component="div">
                ${product.price}
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </CardContent>
      <CardActions>
        <Button onClick={handleAddToCart} size="small">
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
}
