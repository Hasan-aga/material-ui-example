import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  Typography,
} from "@mui/material";

import { ExpandMore } from "@mui/icons-material";
import SignIn from "./sign-in.route";
import SignUp from "./sign-up.route";
import { useDispatch, useSelector } from "react-redux";
import { selectUserToggleSigninSignup } from "../../store/user/user.selectors";
import { toggleSigninSignup } from "../../store/user/user.action";

const SignHomepage = function () {
  const open = useSelector(selectUserToggleSigninSignup);
  const dispatch = useDispatch();

  const handleAccordionClick = function (event) {
    const clickedAccordionBody = event.target.closest(".MuiCollapse-root");

    if (!clickedAccordionBody) dispatch(toggleSigninSignup());
  };

  return (
    <Container sx={{ mt: "2rem" }} maxWidth="sm">
      {/* TODO: prevent buttons inside the accordion from activating onclick */}
      <Accordion onClick={handleAccordionClick} expanded={open}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Sign-in with email and password</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <SignIn />
        </AccordionDetails>
      </Accordion>

      <Accordion onClick={handleAccordionClick} expanded={!open}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Sign-up </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <SignUp />
        </AccordionDetails>
      </Accordion>
    </Container>
  );
};

export default SignHomepage;
