import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { isAdmin, isUser } from "../components/checkRoles.jsx";
import DeleteBookButton from "../components/DeleteBookButton.jsx";
import ReserveBookButton from "../components/ReserveBookButton.jsx";

const BookShow = () => {
    const { isbn } = useParams();

    const [book, setBook] = useState(null);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await fetch(`http://localhost:3000/books/${isbn}`);
                if (!response.ok) {
                    throw new Error('Błąd podczas ładowania książek: ' + response.statusText);
                }
                const data = await response.json();
                setBook(data);
            } catch (error) {
                console.error('Błąd podczas ładowania książek:', error);
            }
        };

        fetchBook();
    }, [isbn]);

    if (!book) return <p>Ładowanie książki...</p>;

    return (
        <>
            <h1>Szczegóły książki</h1>
            <div style={{ maxWidth: "400px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <strong>ISBN:</strong>
                    <span>{book.isbn}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <strong>Tytuł:</strong>
                    <span>{book.title}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <strong>Rok publikacji:</strong>
                    <span>{book.year_of_publication}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <strong>Autor:</strong>
                    <span>{book.author ? `${book.author.first_name} ${book.author.last_name}` : "Brak danych"}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <strong>Wydawca:</strong>
                    <span>{book.publisher ? book.publisher.name : "Brak danych"}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <strong>Dostępność:</strong>
                    <span>{book.available}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <strong>Kategoria:</strong>
                    <span>{book.category ? book.category.name : "Brak danych"}</span>
                </div>

                <div style={{ marginTop: "20px" }}>
                    <Link to={`/books/${book.isbn}`} className="btn btn-primary" style={{ marginRight: '8px' }}>
                        Zobacz
                    </Link>
                    {isAdmin() && (
                        <Link to={`/books/${book.isbn}/update`} className="btn btn-warning" style={{ marginRight: '8px' }}>
                            Edytuj
                        </Link>
                    )}
                    {isUser() && (
                        <ReserveBookButton isbn={book.isbn} />
                    )}
                    {isAdmin() && (
                        <DeleteBookButton
                            isbn={book.isbn}
                            onDeleted={() => setBook(null)}
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default BookShow;
