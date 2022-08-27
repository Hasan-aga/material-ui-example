import { Alert, AlertTitle, Box } from "@mui/material";
import { Checkmark } from "react-checkmark";

const SuccessfulPayment = function () {
  return (
    <Box pt={"10rem"}>
      <Alert severity="success" icon={<Checkmark />}>
        <AlertTitle>Success</AlertTitle>
        Your payment was successful —{" "}
        <strong>thank you for trusting us.</strong>
      </Alert>
    </Box>
  );
};

export default SuccessfulPayment;
