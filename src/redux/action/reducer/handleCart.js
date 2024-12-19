const handleCart = (state = [], action) => {
    const product = action.payload;

    switch (action.type) {
        case "ADDITEM":
            // Jika produk sudah ada di cart, update qty
            const exist = state.find((x) => x.id === product.id);
            if (exist) {
                // Jika produk sudah ada, perbarui qty
                return state.map((x) =>
                    x.id === product.id ? { ...x, qty: x.qty + 1 } : x
                );
            } else {
                return [
                    ...state,
                    {
                        ...product,
                        qty: 1,
                    },
                ];
            }

        case "DECREASEITEM":
            return state.map((x) =>
                x.id === product.id && x.qty > 1
                    ? { ...x, qty: x.qty - 1 }
                    : x
            );

        case "DELITEM":
            return state.filter((x) => x.id !== product.id);

        case "CLEARCART":
            return [];

        default:
            return state;
    }
};

export default handleCart;
