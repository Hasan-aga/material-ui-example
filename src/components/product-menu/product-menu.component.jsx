import CssBaseline from "@mui/material/CssBaseline";
import { Fragment } from "react";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import MediaCard from "../card/card.component";
import { Button, Link, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function ProductMenu({ categories, isPreviewList }) {
  console.log(categories);
  return (
    <Fragment>
      <CssBaseline />
      <Stack spacing={8}>
        {Object.keys(categories).map((categoryTitle) => (
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: "60vh" }}
            key={categoryTitle}
            maxWidth="lg"
          >
            {isPreviewList ? (
              <Link component={RouterLink} to={categoryTitle}>
                <Typography
                  textTransform="capitalize"
                  variant="h2"
                  gutterBottom
                >
                  {categoryTitle}
                </Typography>
              </Link>
            ) : (
              <Typography textTransform="capitalize" variant="h2" gutterBottom>
                {categoryTitle}
              </Typography>
            )}
            <Grid
              container
              rowSpacing={5}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              {categories[categoryTitle].map((product) => (
                <Grid key={product.name} xs={12} sm={6} md={4}>
                  <MediaCard product={product} />
                </Grid>
              ))}
            </Grid>
            {isPreviewList ? (
              <Link component={RouterLink} to={categoryTitle}>
                <Button>View more</Button>{" "}
              </Link>
            ) : (
              ""
            )}
          </Grid>
        ))}
      </Stack>
    </Fragment>
  );
}
