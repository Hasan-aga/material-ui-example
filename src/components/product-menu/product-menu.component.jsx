import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { Fragment } from "react";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import MediaCard from "../card/card.component";
import { Stack, Typography } from "@mui/material";

export default function ProductMenu({ categories }) {
  console.log(categories);
  return (
    <Fragment>
      <CssBaseline />
      <Stack spacing={8}>
        {Object.keys(categories).map((categoryTitle) => (
          <Container id={categoryTitle} maxWidth="lg">
            <Typography textTransform="capitalize" variant="h2" gutterBottom>
              {categoryTitle}
            </Typography>
            <Grid
              container
              rowSpacing={5}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              {categories[categoryTitle].map((product) => (
                <Grid xs={12} sm={6} md={4}>
                  <MediaCard product={product} />
                </Grid>
              ))}
            </Grid>
          </Container>
        ))}
      </Stack>
    </Fragment>
  );
}
