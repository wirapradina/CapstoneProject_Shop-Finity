import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart, delCart, updateProductQty } from '../redux/action';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Cart = () => {
    const cart = useSelector((state) => state.handleCart || []);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const calculateTotal = useMemo(() => {
        return cart.reduce((total, item) => total + item.qty * item.price, 0);
    }, [cart]);

    const handleIncreaseQty = (item) => {
        if (item.qty < 20) {
            const updatedItem = { ...item, qty: item.qty + 1 };
            console.log(`Increased qty for product ${item.title}: ${updatedItem.qty}`);
            dispatch(updateProductQty(item.id, updatedItem.qty)); 
        } else {
            Swal.fire({
                title: 'Maximum Quantity Reached',
                text: 'You cannot add more than 20 items of this product.',
                icon: 'warning',
                confirmButtonText: 'OK'
            });
        }
    };

    const handleDecreaseQty = (item) => {
        if (item.qty > 1) {
            const updatedItem = { ...item, qty: item.qty - 1 };
            console.log(`Decreased qty for product ${item.title}: ${updatedItem.qty}`);
            dispatch(updateProductQty(item.id, updatedItem.qty));
        } else {
            Swal.fire({
                title: 'Minimum Quantity Reached',
                text: 'You cannot have less than 1 item of this product.',
                icon: 'warning',
                confirmButtonText: 'OK'
            });
        }
    };

    const handleCheckout = () => {
        console.log("Cart before checkout:", cart);
        Swal.fire({
            title: 'Checkout Successful!',
            text: 'Thank you for shopping.',
            icon: 'success',
            confirmButtonText: 'OK'
        }).then(() => {
            try {
                cart.forEach(item => {
                    console.log("Updating product with ID:", item.id, "and qty:", item.qty);
                    dispatch(updateProductQty(item.id, item.qty));
                });
                dispatch(clearCart());
                navigate("/");
            } catch (error) {
                console.error("Checkout failed:", error);
                Swal.fire({
                    title: 'Checkout Failed',
                    text: 'An error occurred during the checkout process.',
                    icon: 'error',
                    confirmButtonText: 'Retry'
                });
            }
        });
    };

    const handleDelete = (item) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `Do you want to remove ${item.title} from your cart?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(delCart(item));
                Swal.fire({
                    title: 'Deleted!',
                    text: `${item.title} has been removed from your cart.`,
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            }
        });
    };

    return (
        <div className="container mt-5">
            <h3 className="text-center fw-bold mb-4 py-4">My Cart</h3>
            {cart.length === 0 ? (
                <p className="text-center">Your cart is empty.</p>
            ) : (
                <table className="table table-bordered">
                    <thead>
                        <tr className="text-center">
                            <th>Image</th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((item) => (
                            <tr key={item.id}>
                                <td className="text-center">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        style={{ width: '100px', height: '100px' }}
                                        onError={(e) => (e.target.src = '/placeholder.png')}
                                    />
                                </td>
                                <td>{item.title}</td>
                                <td className="text-center">${item.price}</td>
                                <td className="text-center">
                                    <button
                                        className="btn btn-secondary btn-sm me-2"
                                        onClick={() => handleDecreaseQty(item)}
                                    >
                                        -
                                    </button>
                                    {item.qty}
                                    <button
                                        className="btn btn-secondary btn-sm ms-2"
                                        onClick={() => handleIncreaseQty(item)}
                                    >
                                        +
                                    </button>
                                </td>
                                <td className="text-center">${item.qty * item.price}</td>
                                <td className="text-center">
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(item)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="5" className="text-end fw-bold">Total</td>
                            <td>${calculateTotal}</td>
                        </tr>
                    </tbody>
                </table>
            )}
            {cart.length > 0 && (
                <div className="d-flex justify-content-end mt-3">
                    <button className="btn btn-success me-2" onClick={handleCheckout}>Checkout</button>
                    <button className="btn btn-secondary" onClick={() => navigate("/")}>Close</button>
                </div>
            )}
        </div>
    );
};

export default Cart;
