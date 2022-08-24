import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { Fragment } from "react";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import MediaCard from "../card/card.component";
import { Stack } from "@mui/material";

export default function ProductMenu({ categories }) {
  console.log(categories);
  if (!categories) return;
  return (
    <Fragment>
      <CssBaseline />
      <Stack spacing={8}>
        {categories.map((category) => (
          <div>
            <h2> {category.title} </h2>
            <Container maxWidth="lg">
              <Grid
                container
                rowSpacing={5}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                {category.items.map((product) => (
                  <Grid xs={4}>
                    <MediaCard product={product} />
                  </Grid>
                ))}
              </Grid>
            </Container>
          </div>
        ))}
      </Stack>
    </Fragment>
  );
}
