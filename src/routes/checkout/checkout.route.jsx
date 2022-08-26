import {
  Box,
  Card,
  CardContent,
  Collapse,
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
    <Box sx={{ display: "flex", padding: 10, height: "fit-content" }}>
      <List>
        {cartProducts.map((product) => (
          <ListItem key={product.imageUrl}>
            <TransitionGroup>
              <Collapse key={product.name + 1}>
                <MenuCard product={product} width={600} />
              </Collapse>
            </TransitionGroup>
          </ListItem>
        ))}
      </List>
      <Card sx={{ minWidth: 400, margin: 2, pl: 1, pt: 2 }}>
        <CardContent>
          <Typography variant="h5">Total: {cartTotal}</Typography>
          <StripePayment />
        </CardContent>
      </Card>
    </Box>
  );
};

export default Checkout;
