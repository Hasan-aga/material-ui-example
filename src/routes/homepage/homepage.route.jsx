import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  useMediaQuery,
} from "@mui/material";
import { useSelector } from "react-redux";
import { selectCategoriesMap } from "../../store/categories/categories.selector";
import { Link } from "@mui/material";
import { Link as routerLink } from "react-router-dom";
import { useTheme } from "@emotion/react";

const Homepage = () => {
  const categories = useSelector(selectCategoriesMap);
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  console.log(useMediaQuery(theme.breakpoints.down("sm")));
  return (
    <ImageList variant="woven" cols={isSm ? 1 : 5} gap={12}>
      {Object.keys(categories).map((categoryName) => {
        const categoryDetails = {};
        categoryDetails.name = categoryName;
        categoryDetails.imageUrl =
          categories[categoryName][
            categories[categoryName].length - 1
          ].imageUrl;
        return (
          <Link component={routerLink} to={`shop/${categoryName}`}>
            <ImageListItem>
              <img
                src={`${categoryDetails.imageUrl}?w=1000&fit=crop&auto=format`}
                srcSet={`${categoryDetails.imageUrl}?w=1000&fit=crop&auto=format&dpr=2 2x`}
                alt={categoryDetails.name}
                loading="lazy"
                sx={{ position: "absolute" }}
              />
              <ImageListItemBar
                position="below"
                title={categoryDetails.name}
                sx={{
                  position: "relative",
                  bottom: "50%",
                  transform: "translateY( -50%)",
                  textAlign: "center",
                  textTransform: "uppercase",
                  backgroundColor: "#f7f7f7a2",
                }}
              />
            </ImageListItem>
          </Link>
        );
      })}
    </ImageList>
  );
};

export default Homepage;
