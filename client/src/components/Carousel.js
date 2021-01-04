import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { makeStyles } from "@material-ui/core/styles";
import ProductCard2 from "./productCard2";
import { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  title: {
    marginBottom: 20,
  },
}));

export default function Carrousel(props) {
  const classes = useStyles();
  const [results, setResults] = useState(false);
  const [name, setName] = useState("");
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 2,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  useEffect(() => {
    setName(props.cat.name);
    fetch(`http://localhost:3001/api/search?category=${props.cat.id}`)
      .then((res) => res.json())
      .then((res) => {
        setResults(res);
      });
  }, []);

  return (
    <div>
      <div className={classes.toolbar} />
      
      <Box textAlign='left'>
        <Typography variant="h4" className={classes.title}>
          {name}
        </Typography>
      </Box>

      <Carousel
        ssr
        partialVisbile
        itemClass="image-item"
        responsive={responsive}
      >
        {results &&
          results.map((product) => {
            return <ProductCard2 product={product} />;
          })}
      </Carousel>
    </div>
  );
}
