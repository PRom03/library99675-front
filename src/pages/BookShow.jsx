import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { checkRole } from "../components/checkRoles.jsx";
import DeleteBookButton from "../components/DeleteBookButton.jsx";
import ReserveBookButton from "../components/ReserveBookButton.jsx";

const BookShow = () => {
    const { isbn } = useParams();

    const [book, setBook] = useState(null);
    const [reservedIsbns, setReservedIsbns] = useState([]);
    const [userRole, setUserRole] = useState("");

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/books/${isbn}`);
                if (!response.ok) {
                    throw new Error('Błąd podczas ładowania książek: ' + response.statusText);
                }
                const data = await response.json();
                setBook(data);
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
        const checkUserRole= async()=>{
            const role=await checkRole();
            setUserRole(role);
        }
        checkUserRole();
        fetchLoans();
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
                    <span>{book.yearOfPublication}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <strong>Autor:</strong>
                    <span>{book.author ? `${book.author.firstName} ${book.author.lastName}` : "Brak danych"}</span>
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

                    {userRole==="admin" && (
                        <Link to={`/books/${book.isbn}/update`} className="btn btn-warning" style={{ marginRight: '8px' }}>
                            Edytuj
                        </Link>
                    )}
                    {userRole==="client" && !reservedIsbns.includes(book.isbn) && (
                        <ReserveBookButton isbn={book.isbn} />
                    )}
                    {userRole==="admin" && (
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
