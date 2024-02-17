import React, { useEffect, useState } from "react";
import {
  Badge,
  Menu,
  Table,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  REMOVE_FROM_CART,
  INCREMENT_QUANTITY,
  DECREMENT_QUANTITY,
} from "../redux/actions/action";

const Header = () => {
  const [price, setPrice] = useState(0);
  const getdata = useSelector((state) => state.cartreducer.carts);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = (id) => {
    dispatch(REMOVE_FROM_CART(id));
  };

  const handleIncrement = (id) => {
    dispatch(INCREMENT_QUANTITY(id));
  };

  const handleDecrement = (id) => {
    dispatch(DECREMENT_QUANTITY(id));
  };

  const total = () => {
    let price = 0;
    getdata.forEach((ele) => {
      price = ele.price * ele.qnty + price;
    });
    setPrice(price);
  };

  useEffect(() => {
    total();
  }, [getdata]);

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <NavLink to="/" style={{ color: "white" }}>
              Home
            </NavLink>
          </Typography>

          <Badge
            badgeContent={getdata.length}
            sx={{ color: "white" }}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            onClick={handleClick}
          >
            <ShoppingCartIcon />
          </Badge>
        </Toolbar>
      </AppBar>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {getdata.length ? (
          <div style={{ width: "24rem", padding: 10 }}>
            <Table>
              <thead>
                <tr>
                  <th>Photo</th>
                  <th>Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {getdata.map((ele) => (
                  <tr key={ele.id}>
                    <td>
                      <img
                        src={ele.image}
                        style={{ width: "5rem", height: "5rem" }}
                        alt=""
                      />
                    </td>
                    <td>
                      <Typography variant="h6">{ele.name}</Typography>
                      <Typography>Price : ₹{ele.price}</Typography>
                      <Typography>Quantity : {ele.qnty}</Typography>
                      <IconButton onClick={() => handleIncrement(ele.id)}>
                        <AddIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDecrement(ele.id)}>
                        <RemoveIcon />
                      </IconButton>
                    </td>
                    <td>
                      <IconButton onClick={() => handleDelete(ele.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </td>
                  </tr>
                ))}

                <Typography variant="h6" align="center">
                  Total : ₹ {price}
                </Typography>
              </tbody>
            </Table>
          </div>
        ) : (
          <div
            style={{
              width: "20rem",
              padding: 5,
              height: "5rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CloseIcon
              onClick={handleClose}
              style={{
                position: "absolute",
                top: 2,
                right: 20,
                fontSize: 23,
                cursor: "pointer",
              }}
            />
            <Typography variant="h6">Your cart is empty</Typography>
            <img
              src="https://media.tenor.com/8BeuRyZSb90AAAAi/shopping-cart-shopping.gif"
              alt=""
              className="emptycart_img"
              style={{ width: "5rem", padding: 10, marginBottom: "2rem" }}
            />
          </div>
        )}
      </Menu>
    </>
  );
};

export default Header;