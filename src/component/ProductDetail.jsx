import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addCart } from '../redux/action';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Tambahkan produk ke keranjang
    const addProduct = (product) => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (!isLoggedIn) {
            Swal.fire({
                title: 'You must login!',
                text: 'Please login to add product to your cart.',
                icon: 'warning',
                confirmButtonText: 'OK'
            }).then(() => {
                navigate("/login");
            });
            
        } else {
            if (product.qty > 0) {
                dispatch(addCart(product));
                const updatedQty = Math.max(product.qty - 1, 0);
                setProduct((prevProduct) => ({ ...prevProduct, qty: updatedQty }));
            } else {
                alert('Out of stock!');
            }
        }
    };

    useEffect(() => {
        const getProduct = async () => {
            setLoading(true);
            try {
                // Gunakan variabel lingkungan untuk URL API
                const response = await fetch(`${process.env.REACT_APP_API_URL}/products/${id}`);
                const data = await response.json();

                data.qty = 20;
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };
        getProduct();
    }, [id]);

    const Loading = () => <div className="col-md-6">Loading...</div>;

    const ShowProduct = () => (
        <>
            <div className="col-md-6 py-5">
                {product.image ? (
                    <img src={product.image} alt={product.title} height="400px" width="400px" />
                ) : (
                    <p>No image available</p>
                )}
            </div>
            <div className="col-md-6 py-5">
                <h4 className="text-uppercase text-black-50">{product.category || 'No category available'}</h4>
                <h1 className="display-5">{product.title || 'No title available'}</h1>
                <p className="lead fw-bolder">
                    Rating: {product.rating?.rate || 'No rating available'}
                    <i className="fa fa-star"></i>
                </p>
                <h3 className="display-6 fw-bold my-4">${product.price}</h3>
                <p className="lead">{product.description}</p>
                <p className="lead text-secondary">Available Quantity: {product.qty}</p>
                <button className="btn btn-outline-dark px-4 py-2" onClick={() => addProduct(product)}>
                    Add to Cart
                </button>
            </div>
        </>
    );

    return (
        <div>
            <div className="container py-5">
                <div className="row py-4">{loading ? <Loading /> : <ShowProduct />}</div>
            </div>
        </div>
    );
};

export default ProductDetail;
