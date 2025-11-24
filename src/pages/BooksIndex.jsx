import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {isAdmin, isUser} from "../components/checkRoles.jsx";
import DeleteAuthorButton from "../components/DeleteAuthorButton.jsx";
import DeleteBookButton from "../components/DeleteBookButton.jsx";
import ReserveBookButton from "../components/ReserveBookButton.jsx";

const BooksIndex = () => {
    const [books, setBooks] = useState([]);
    const [reservedIsbns, setReservedIsbns] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/books');
                if (!response.ok) {
                    throw new Error('Błąd podczas ładowania książek: ' + response.statusText);
                }
                const data = await response.json();
                setBooks(data);
            } catch (error) {
                console.error('Błąd podczas ładowania książek:', error);
            }
        };
        const fetchLoans = async () => {
            try {
                const token=localStorage.getItem('token');
                const response = await fetch('http://localhost:8080/api/loans', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (!response.ok) throw new Error('Błąd podczas ładowania wypożyczeń: ' + response.statusText);
                const loans = await response.json();
                const reserved = loans
                    .filter(loan => loan.status === 'reserved')
                    .map(loan => loan.book.isbn);
                setReservedIsbns(reserved);
            } catch (error) {
                console.error('Błąd podczas ładowania wypożyczeń:', error);
            }
        };

            fetchLoans();


        fetchBooks();
    }, []);
    return (
        <>
            <h1>Lista książek</h1>
            {isAdmin() && (
                <Link to={`/books/create`} className="btn btn-primary">Dodaj książkę</Link>

            )}
            <table className="table table-striped">
                <thead>
                <tr><th>Tytuł</th>
                    <th>Autor</th>
                    <th>Wydawca</th>
                    <th>Akcje</th>
                </tr>
                </thead>
                <tbody>
                {books.map((book) => (
                    <tr key={book._id}>
                        <td>{book.title}</td>
                        <td>{book.author?.first_name} {book.author?.last_name}</td>
                        <td>{book.publisher?.name}</td>
                        <td>
                            <Link to={`/books/${book.isbn}`} className="btn btn-primary">Zobacz</Link>
                            {isAdmin() && (
                                <Link to={`/books/${book.isbn}/update`} className="btn btn-warning">Edytuj</Link>

                            )}
                            {isUser() && !reservedIsbns.includes(book.isbn)&& (
                                <ReserveBookButton
                                    isbn={book.isbn}
                                    />
                            )}
                            {isAdmin() && (
                                <DeleteBookButton
                                    isbn={book.isbn}
                                    onDeleted={() =>
                                        setBooks((prev) =>
                                            prev.filter((a) => a.isbn !== book.isbn)
                                        )
                                    }
                                />
                            )}
                        </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default BooksIndex;