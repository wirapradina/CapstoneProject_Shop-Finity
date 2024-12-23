export const addCart = (product) => {
    return {
        type: 'ADD_CART',
        payload: product,
    };
};

export const delCart = (product) => {
    return {
        type: 'DEL_CART',
        payload: product,
    };
};

export const clearCart = () => ({
    type: 'CLEARCART',
});

export const updateProductQty = (id, qty) => {
    return {
        type: 'UPDATE_PRODUCT_QTY',
        payload: { id, qty },
    };
};

export const setProducts = (products) => ({
    type: 'SET_PRODUCTS',
    payload: products,
});
