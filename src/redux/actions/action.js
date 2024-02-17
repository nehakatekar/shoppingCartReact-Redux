export const ADD_TO_CART = (item) => {
    return {
      type: "ADD_TO_CART",
      payload: item,
    };
  };
  
  // remove items
  export const REMOVE_FROM_CART = (id) => {
    return {
      type: "REMOVE_FROM_CART",
      payload: id,
    };
  };
  
  export const INCREMENT_QUANTITY = (id) => {
    return {
      type: "INCREMENT_QUANTITY",
      payload: id,
    };
  };
  export const DECREMENT_QUANTITY = (id) => {
    return {
      type: "DECREMENT_QUANTITY",
      payload: id,
    };
  };