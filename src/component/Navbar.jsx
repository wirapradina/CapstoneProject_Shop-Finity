import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const Navbar = () => {
    const state = useSelector((state) => state.handleCart);
    const totalItems = state.reduce((acc, item) => acc + item.qty, 0);
    const navigate = useNavigate();

    const handleLogout = () => {
        Swal.fire({
            title: 'Logout Berhasil!',
            text: 'Anda telah berhasil logout.',
            icon: 'success',
            confirmButtonText: 'OK',
        }).then(() => {
            localStorage.removeItem('isLoggedIn');
            navigate('/');
        });
    };

    const isLoggedIn = localStorage.getItem('isLoggedIn');

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top">
                <div className="container">
                    <NavLink className="navbar-brand fw-bold fs-4" to="/">Shop-finity</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink 
                                    className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                                    to="/" 
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink 
                                    className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                                    to="/products"
                                >
                                    Product
                                </NavLink>
                            </li>
                        </ul>
                        <div className="buttons">
                            {isLoggedIn && (
                                <NavLink to="/cart" className="btn btn-dark">
                                    <i className="fa fa-shopping-cart me-1"></i> Cart ({totalItems})
                                </NavLink>
                            )}
                            {isLoggedIn ? (
                                <button className="btn btn-outline-dark ms-2" onClick={handleLogout}>
                                    Logout
                                </button>
                            ) : (
                                <NavLink 
                                    to="/login" 
                                    className="btn btn-outline-dark ms-2"
                                >
                                    <i className="fa fa-sign-in me-1"></i> Login
                                </NavLink>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
