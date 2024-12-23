const cart = [];

const handleCart = (state = cart, action) => {
    switch (action.type) {
        case 'ADD_CART':
            const product = action.payload;
            const existingProduct = state.find((item) => item.id === product.id);
            if (existingProduct) {
                return state.map((item) =>
                    item.id === product.id
                        ? { ...item, qty: item.qty + 1 }
                        : item
                );
            } else {
                return [...state, { ...product, qty: 1 }];
            }

        case 'DEL_CART':
            return state.filter((item) => item.id !== action.payload.id);

        case 'CLEARCART':
            return [];
        
            case 'UPDATE_PRODUCT_QTY':
            return state.map((item) =>
                item.id === action.payload.id ? { ...item, qty: action.payload.qty } : item
            );
        default:
            return state;
    }
};

export default handleCart;
