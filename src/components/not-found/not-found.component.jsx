import { Grid } from "@mui/material";
import travolta from "../../assets/travolta.gif";

const NotFound = function () {
  return (
    <Grid container alignItems="center" justifyContent="center">
      <img alt="Travolta cant find what he's looking for" src={travolta} />
    </Grid>
  );
};
export default NotFound;
