const initialState = [];

const handleProducts = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_PRODUCT_QTY':
            console.log('Reducer received action payload:', action.payload);
            console.log('Current state:', state);
            return state.map((product) =>
                product.id === action.payload.productId
                    ? {
                        ...product,
                        qty: Math.max(product.qty - action.payload.qty, 0), 
                    }
                    : product
            );
        default:
            return state;
    }
};

export default handleProducts;
