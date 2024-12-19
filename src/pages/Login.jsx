import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            // Gunakan URL dasar dari .env dan tambahkan endpoint /users
            const response = await fetch(`${process.env.REACT_APP_API_URL}/users`);
            const users = await response.json();

            const user = users.find((user) => user.email === email && user.password === password);

            if (user) {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('username', user.username);

                navigate('/');
            } else {
                setError('Incorrect email or password');
            }
        } catch (error) {
            console.error('Error fetching users:', error);
            setError('An error occurred, try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4 py-3">Login</h2>
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={isLoading}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={isLoading}
                            />
                        </div>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <button
                            type="submit"
                            className="btn btn-primary w-100"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            ) : (
                                'Login'
                            )}
                        </button>
                        <div className="text-center mt-2">
                            <div>email: john@gmail.com</div>
                            <div>password: m38rmF$</div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
