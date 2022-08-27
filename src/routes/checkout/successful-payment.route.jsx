import { Alert, AlertTitle, Box } from "@mui/material";
import { Checkmark } from "react-checkmark";
import { useParams } from "react-router-dom";

const SuccessfulPayment = function () {
  const { message } = useParams();
  return (
    <Box pt={"10rem"}>
      <Alert severity="success" icon={<Checkmark />}>
        <AlertTitle>Success</AlertTitle>
        {message} — <strong>thank you for trusting us.</strong>
      </Alert>
    </Box>
  );
};

export default SuccessfulPayment;
