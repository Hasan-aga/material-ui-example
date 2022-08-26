import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import { useSelector } from "react-redux";
import { selectCategoriesMap } from "../../store/categories/categories.selector";
import { Link } from "@mui/material";
import { Link as routerLink } from "react-router-dom";

const Homepage = () => {
  const categories = useSelector(selectCategoriesMap);
  console.log(categories);
  return (
    <ImageList variant="woven" cols={5} gap={12}>
      {Object.keys(categories).map((categoryName) => {
        const categoryDetails = {};
        categoryDetails.name = categoryName;
        categoryDetails.imageUrl = categories[categoryName][1].imageUrl;
        console.log(categoryDetails);
        return (
          <Link component={routerLink} to="/shop">
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
