import React from "react";
import {
  CardActionArea,
  Typography,
  CardMedia,
  CardContent,
  Card,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function MenuCard(props) {
  const navigate = useNavigate();
  const [quantity, setQuantity] = React.useState(1);
  const styles = {
    padding: "10px 10px",
    boxShadow: "0 5px 26px 0 rgb(68 88 144 / 14%)",
  };
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  function handleAdd() {
    const id = props.id;
    const item = { id, quantity };
    axios
      .post("http://localhost/api/umenu.php", {
        id: props.id,
        name: props.heading,
        quantity: quantity,
        price: props.price,
      })
      .then((response) => {
        setQuantity(1);
      });
  }

  return (
    <div style={styles}>
      <Card sx={{ maxWidth: props.width }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height={props.height}
            image={props.i_pic}
            alt={props.heading}
          />

          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ textAlign: "center" }}
            >
              {props.heading}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {props.description}
            </Typography>

            <CardActions
              disableSpacing
              sx={{
                backgroundColor: "#000000",
                color: "#ebe9e6",
                fontSize: 17,
                fontWeight: "medium",
                margin: 2,
              }}
            >
              <h4>View Details</h4>
              <ExpandMore
                sx={{ color: "#ebe9e6" }}
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography variant="body2" color="text.primary">
                  <b>Price</b>: Rs. {props.price}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  <input
                    type="number"
                    value={quantity}
                    name="quantity"
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                  <Button onClick={handleAdd}>Add To Cart</Button>
                </Typography>
              </CardContent>
            </Collapse>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}

export default MenuCard;
