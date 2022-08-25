import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Typography,
} from "@mui/material";

import { ExpandMore } from "@mui/icons-material";
import SignIn from "./sign-in.route";
import SignUp from "./sign-up.route";
import { useState } from "react";

const SignHomepage = function () {
  const [open, setOpen] = useState(true);

  const handleAccordionClick = function () {
    setOpen(!open);
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
