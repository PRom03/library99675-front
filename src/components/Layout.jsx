import React from 'react';
import {Link, Navigate, Outlet, useNavigate} from 'react-router-dom';
import {jwtDecode} from "jwt-decode";

const Layout = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };
    const isExpired=(token)=>{
        if(!token) return true;
        const {exp}=jwtDecode(token);
        const curr=new Date().getTime()/1000;
        console.log(exp+" "+curr);
        if (exp <= curr ) {
            return true;
        }
        return false;
    }
//tu warunek

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3 fixed-top">
                <Link className="navbar-brand d-flex align-items-center" to="/">
                    <span className="fs-4 me-2">📚</span>
                    <span className="fs-5">Biblioteka online</span>
                </Link>

                <form className="d-flex ms-auto me-3" role="search" method="GET" action="/react/search">
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
                    {/*
                    <Link to="/recommended" className="btn btn-light text-dark me-2">
                        Dla Ciebie
                    </Link>
                    */}

                    {!isExpired(token) ? (
                        <>
                            <Link to="/panel" className="btn btn-outline-light me-2">
                                Panel
                            </Link>
                            <button className="btn btn-light text-dark" onClick={handleLogout}>
                                Wyloguj
                            </button>
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
                    )}
                </div>
            </nav>

            <div className="container-fluid py-4">
                <Outlet />
            </div>
        </>
    );
};

export default Layout;
