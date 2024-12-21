export const addCart = (product) => {
    return{
        type : "ADDITEM",
        payload : product
    }
}

export const delCart = (product) => {
    return{
        type : "DELITEM",
        payload : product
    }
}

export const setProducts = (products) => ({
    type: 'SET_PRODUCTS',
    payload: products,
});
