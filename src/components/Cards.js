import React, { useState } from "react";
import Cardsdata from "./CardsItem";
import { useDispatch } from "react-redux";
import { ADD_TO_CART } from "../redux/actions/action";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Snackbar,
} from "@mui/material";
import { Alert } from "@mui/material";

const Cards = () => {
  const [data, setData] = useState(Cardsdata);
  const dispatch = useDispatch();

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleButton = (element) => {
    dispatch(ADD_TO_CART(element));
    handleSnackbarOpen("Added to cart");
  };

  const handleSnackbarOpen = (message) => {
    setSnackbarMessage(message);
    setOpenSnackbar(true);
  };

  return (
    <div style={{ marginRight: "auto", marginLeft: "auto", width: "90%" }}>
      <h2
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        Add to Cart Projects
      </h2>

      <div>
        <Grid container spacing={3}>
          {data.map((element, id) => (
            <Grid item xs={6} md={4} key={id}>
              <Card key={id} sx={{ marginTop: "2rem" }}>
                <CardMedia
                  sx={{ height: "200px", width: "345px" }}
                  image={element.image}
                  title={element.title}
                />
                <CardContent>
                  <Typography variant="h5">{element.title}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Price : ₹ {element.price}
                  </Typography>
                  <div>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleButton(element)}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Cards;
