import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addCart } from '../redux/action';
import Swal from 'sweetalert2';

const Products = () => {
    const [filter, setFilter] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hoveredProduct, setHoveredProduct] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/products`);
                const products = await response.json();
                const productsWithQty = products.map((product) => ({
                    ...product,
                    qty: 20,
                    category: product.category || 'Uncategorized', 
                }));
                setFilter(productsWithQty);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };
        getProducts();
    }, []);

    const handleAddToCart = (product) => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (!isLoggedIn) {
            Swal.fire({
                title: 'You must login!',
                text: 'Please login to add product to your cart.',
                icon: 'warning',
                confirmButtonText: 'Login',
            }).then(() => {
                navigate('/login');
            });
        } else {
            if (product.qty > 0) {
                const updatedProduct = { ...product, qty: product.qty - 1 };
                dispatch(addCart(updatedProduct));
                setFilter((prevFilter) =>
                    prevFilter.map((p) => (p.id === product.id ? updatedProduct : p))
                );
            } else {
                alert('Out of stock!');
            }
        }
    };

    const handleMouseEnter = (id) => setHoveredProduct(id);
    const handleMouseLeave = () => setHoveredProduct(null);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    const getCategories = () => {
        const categories = ['All', ...new Set(filter.map((product) => product.category))];
        return categories;
    };

    const filteredProducts = selectedCategory === 'All' ? filter : filter.filter((product) => product.category === selectedCategory);

    const ShowProducts = () => {
        return (
            <>
                {filteredProducts.map((product) => {
                    const isHovered = hoveredProduct === product.id;
                    return (
                        <div
                            className="col-md-3 mb-4"
                            key={product.id}
                            onMouseEnter={() => handleMouseEnter(product.id)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div
                                className="card h-100 text-center p-4"
                                style={{
                                    transform: isHovered ? 'translateY(-10px) scale(1.05)' : 'none',
                                    boxShadow: isHovered
                                        ? '0 10px 20px rgba(0, 0, 0, 0.2)'
                                        : 'none',
                                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                }}
                            >
                                <img
                                    src={product.image}
                                    className="card-img-top"
                                    alt={product.title}
                                    height="250px"
                                />
                                <div className="card-body">
                                    <h5 className="card-title mb-0">
                                        {product.title.substring(0, 20)}
                                    </h5>
                                    <p className="card-text lead fw-bold">${product.price}</p>
                                    <p className="card-text text-secondary">Qty: {product.qty}</p>
                                    <div className="d-flex justify-content-between">
                                        <Link to={`/products/${product.id}`} className="btn btn-primary me-2">
                                            Detail
                                        </Link>
                                        <button
                                            className="btn btn-success"
                                            onClick={() => handleAddToCart(product)}
                                            disabled={product.qty <= 0}
                                        >
                                            {product.qty > 0 ? 'Add to Cart' : 'Out of Stock'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </>
        );
    };

    return (
        <div>
            <div className="container my-5 py-5">
                <div className="row">
                    <div className="col-12 mb-5">
                        <h1 className="display-6 fw-bolder text-center">Products</h1>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 mb-4">
                        <div className="d-flex justify-content-center">
                            {getCategories().map((category) => (
                                <button
                                    key={category}
                                    className={`btn btn-outline-primary me-2 ${selectedCategory === category ? 'active' : ''}`}
                                    onClick={() => handleCategoryChange(category)}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                </div>
                <div className="row justify-content-center py-3">
                    {loading ? <div>Loading...</div> : <ShowProducts />}
                </div>
            </div>
        </div>
    );
};

export default Products;
