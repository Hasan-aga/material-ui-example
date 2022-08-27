import {
  Box,
  Card,
  CardContent,
  Collapse,
  Grid,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { TransitionGroup } from "react-transition-group";
import MenuCard from "../../components/card/menu-card.component";
import PaymentForm from "../../components/payment-form/payment-form.component";
import StripePayment from "../../components/payment-form/StripePayment.component";
import {
  selectCartProducts,
  selectCartTotal,
} from "../../store/cart/cart.selector";

const Checkout = function () {
  const cartProducts = useSelector(selectCartProducts);
  const cartTotal = useSelector(selectCartTotal);
  console.log("checkout with ", cartProducts);
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      pt={10}
      spacing={10}
    >
      <Grid item sm={12} md={6}>
        <Typography variant="h2">Total: ${cartTotal}</Typography>
        <List
          sx={{
            width: "100%",
            overflow: "auto",
            maxHeight: "70vh",
            "& ul": { padding: 0 },
          }}
        >
          {cartProducts.map((product) => (
            <ListItem key={product.imageUrl}>
              <TransitionGroup>
                <Collapse key={product.name + 1}>
                  <MenuCard product={product} />
                </Collapse>
              </TransitionGroup>
            </ListItem>
          ))}
        </List>
      </Grid>
      <Grid item sm={6} md={6}>
        <Card>
          <CardContent>
            <StripePayment />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Checkout;
