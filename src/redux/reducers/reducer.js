const initialState = {
    carts: [],
  };
  
  export const cartreducer = (state = initialState, action) => {
    switch (action.type) {
      case "ADD_TO_CART":
        const itemIndex = state.carts.findIndex(
          (item) => item.id === action.payload.id
        );
  
        if (itemIndex >= 0) {
          // If item exists in cart, increase quantity
          return {
            ...state,
            carts: state.carts.map((item, index) =>
              index === itemIndex ? { ...item, qnty: item.qnty + 1 } : item
            ),
          };
        } else {
          // If item not in cart, add with quantity 1
          return {
            ...state,
            carts: [...state.carts, { ...action.payload, qnty: 1 }],
          };
        }
  
      case "REMOVE_FROM_CART":
        return {
          ...state,
          carts: state.carts.filter((item) => item.id !== action.payload),
        };
  
      case "INCREMENT_QUANTITY":
        return {
          ...state,
          carts: state.carts.map((item) =>
            item.id === action.payload ? { ...item, qnty: item.qnty + 1 } : item
          ),
        };
  
      case "DECREMENT_QUANTITY":
        return {
          ...state,
          carts: state.carts
            .map((item) =>
              item.id === action.payload ? { ...item, qnty: item.qnty - 1 } : item
            )
            .filter((item) => item.qnty > 0), // Remove items with quantity less than or equal to 0
        };
  
      default:
        return state;
    }
  };