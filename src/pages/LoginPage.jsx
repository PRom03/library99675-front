import React, { useState } from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8080/api/users/login', { email, password });
            localStorage.setItem('token', res.data.token);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.error || 'Błąd logowania');
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
        <div>
            <h2>Logowanie</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px', gap: '12px'}}>
                <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Hasło" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Zaloguj się</button>
            </form>
        </div>
            </>
    );
}

export default LoginPage;
