import React, { useState } from 'react';
import {Link, Outlet} from "react-router-dom";

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        try {
            const res = await fetch('http://localhost:3000/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Błąd rejestracji');
            }

            setMessage('Rejestracja zakończona sukcesem! Możesz się teraz zalogować.');
            setFormData({ name: '', email: '', password: '' });
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3 fixed-top">
            <Link className="navbar-brand d-flex align-items-center" to="/">
                <span className="fs-4 me-2">📚</span>
                <span className="fs-5">Biblioteka online</span>
            </Link>

            <form className="d-flex ms-auto me-3" role="search" method="GET" action="/search">
                <input
                    className="form-control me-2"
                    type="search"
                    name="q"
                    placeholder="Szukaj książek..."
                    aria-label="Search"
                />
                <button className="btn btn-outline-light" type="submit">Szukaj</button>
            </form>

            <div className="d-flex">
                <Link to="/books" className="btn btn-outline-light me-2">
                    Książki
                </Link>
                <Link to="/authors" className="btn btn-outline-light me-2">
                    Autorzy
                </Link>
                <Link to="/publishers" className="btn btn-outline-light me-2">
                    Wydawcy
                </Link>
                <Link to="/categories" className="btn btn-outline-light me-2">
                    Kategorie
                </Link>
                <Link to="/recommended" className="btn btn-light text-dark me-2">
                    Dla Ciebie
                </Link>


                    <>
                        <Link to="/panel" className="btn btn-outline-light me-2">
                            Panel
                        </Link>

                    </>
                ) : (
                    <>
                        <Link to="/login" className="btn btn-outline-light me-2">
                            Zaloguj się
                        </Link>
                        <Link to="/register" className="btn btn-light text-dark">
                            Zarejestruj się
                        </Link>
                    </>

            </div>
        </nav>

        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
            <h2 className="text-2xl font-bold mb-4 text-center">Rejestracja</h2>

            {message && <p className="text-green-600 mb-4">{message}</p>}
            {error && <p className="text-red-600 mb-4">{error}</p>}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px', gap: '12px'}} className="space-y-4">
                <div>
                    <input
                        type="text"
                        name="name"
                        placeholder="Imię"
                        value={formData.name}
                        onChange={handleChange}
                        pattern="^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]+(-[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]+)?$"
                        required
                    />
                </div>
                <div>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="E-mail"
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        placeholder="Hasło"
                    />
                </div>

                <button
                    type="submit"
                >
                    Zarejestruj się
                </button>
            </form>
        </div>
    </>
    );
};

export default RegisterPage;
