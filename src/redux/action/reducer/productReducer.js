const initialState = {
    products: [], // State untuk menyimpan data produk
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_PRODUCTS': // Action untuk menyimpan data produk
            return {
                ...state,
                products: action.payload,
            };
        default:
            return state;
    }
};

export default productReducer;
