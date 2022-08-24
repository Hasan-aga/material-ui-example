import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Container } from "@mui/material";

export default function MediaCard({ product }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
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
        <Button size="small">Add to cart</Button>
      </CardActions>
    </Card>
  );
}
