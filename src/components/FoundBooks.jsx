import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import {checkRole} from "./checkRoles.jsx";
import DeleteAuthorButton from "../components/DeleteAuthorButton.jsx";
import DeleteBookButton from "../components/DeleteBookButton.jsx";
import ReserveBookButton from "../components/ReserveBookButton.jsx";

const FoundBooks = ({books,onDelete}) => {
    const [reservedIsbns, setReservedIsbns] = useState([]);
    const [userRole, setUserRole] = useState("");
    useEffect(() => {
        const checkUserRole= async()=>{
            const role=await checkRole();
            setUserRole(role);
        }
        checkUserRole();
    })
    useEffect(()=>{
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


}, []);

    return (
        <>
            <h1>Lista książek</h1>
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
                    <tr key={book.id}>
                        <td>{book.title}</td>
                        <td>{book.author?.firstName} {book.author?.lastName}</td>
                        <td>{book.publisher?.name}</td>
                        <td>
                            <Link to={`/books/${book.isbn}`} className="btn btn-primary">Zobacz</Link>
                            {userRole==="admin" && (
                                <Link to={`/books/${book.isbn}/update`} className="btn btn-warning">Edytuj</Link>

                            )}
                            {userRole==="client" && !reservedIsbns.includes(book.isbn)&& (
                                <ReserveBookButton
                                    isbn={book.isbn}
                                />
                            )}
                            {userRole==="admin" && (
                                <DeleteBookButton
                                    isbn={book.isbn}
                                    onDeleted={() => onDelete?.(book.isbn)}
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

export default FoundBooks;