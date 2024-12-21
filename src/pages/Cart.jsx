import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addCart, delCart } from '../redux/action'; 
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Cart = () => {
    const cart = useSelector((state) => state.handleCart || []); // Mengambil cart dari Redux
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const MAX_QUANTITY = 20;

    // Fungsi untuk menambah jumlah produk
    const addProduct = (product) => {
        if (product.qty < MAX_QUANTITY) {
            dispatch(addCart(product));
        }
    };

    // Fungsi mengurangi item dri cart 
    const decreaseQuantity = (product) => {
        if (product.qty > 1) {
            dispatch(addCart({ ...product, qty: product.qty - 1 }));
        }
    };

    // Fungsi untuk menghapus produk dari cart
    const removeProduct = (product) => {
        dispatch(delCart(product));
    };

    // Menghitung total harga
    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.qty * item.price, 0);
    };

    // Fungsi untuk melakukan checkout
    const handleCheckout = () => {
        alert("Checkout berhasil!");

        // Mengosongkan cart di Redux
        dispatch({ type: 'CLEARCART' });

        navigate("/");
    };

    const stock = {
        1: 10,
    };

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    return (
        <div className="container mt-5">
            <h3 className="text-center fw-bold mb-4 py-4">My Cart</h3>
            {cart.length === 0 ? (
                <p className="text-center">Anda belum memilih item</p>
            ) : (
                <table className="table table-bordered">
                    <thead>
                        <tr className="text-center">
                            <th>Image</th><th>Product</th><th>Price</th><th>Quantity</th><th>Total</th><th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((item) => (
                            <tr key={item.id}>
                                <td className="text-center">
                                    {item.image ? (
                                        <img src={item.image} alt={item.title} style={{ width: '100px', height: '100px' }} />
                                    ) : (
                                        <p>No image available</p>
                                    )}
                                </td>
                                <td>{item.title}</td>
                                <td className="text-center">${item.price}</td>
                                <td className="text-center">
                                    <div className="d-flex align-items-center justify-content-center">
                                        <button 
                                            className="btn btn-danger btn-sm"
                                            onClick={() => decreaseQuantity(item)}
                                            disabled={item.qty <= 1}
                                        >
                                            -
                                        </button>
                                        <span className="mx-3">{item.qty}</span>
                                        <button 
                                            className="btn btn-primary btn-sm"
                                            onClick={() => addProduct(item)}
                                            disabled={item.qty >= MAX_QUANTITY}
                                        >
                                            +
                                        </button>
                                    </div>
                                </td>
                                <td className="text-center">${item.qty * item.price}</td>
                                <td className="text-center">
                                    <button className="btn btn-danger btn-sm" onClick={() => removeProduct(item)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="5" className="text-end fw-bold">Total</td>
                            <td>${calculateTotal()}</td>
                        </tr>
                    </tbody>
                </table>
            )}
            {cart.length > 0 && (
                <div className="d-flex justify-content-end mt-3">
                    <button className="btn btn-success me-2" onClick={handleCheckout}>
                        Checkout
                    </button>
                    <button className="btn btn-secondary" onClick={() => navigate("/")}>
                        Close
                    </button>
                </div>
            )}
        </div>
    );
};

export default Cart;
