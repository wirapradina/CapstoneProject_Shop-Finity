const initialState = [];

const handleCart = (state = initialState, action) => {
  switch (action.type) {
    case 'ADDITEM':
      // Check if the item is already in the cart
      const existingItem = state.find((item) => item.id === action.payload.id);
      if (existingItem) {
        // If item already exists in the cart, increase its quantity
        return state.map((item) =>
          item.id === action.payload.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      } else {
        // If item is not in the cart, add it with qty = 1
        return [...state, { ...action.payload, qty: 1 }];
      }

    case 'DECREASEITEM':
      // Decrease the quantity of an item, but not below 1
      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, qty: Math.max(item.qty - 1, 1) }  // Ensure qty doesn't go below 1
          : item
      );

    case 'DELITEM':
      // Remove the item from the cart
      return state.filter((item) => item.id !== action.payload.id);

    case 'CLEARCART':
      // Clear all items from the cart
      return [];

    default:
      return state;
  }
};

export default handleCart;
