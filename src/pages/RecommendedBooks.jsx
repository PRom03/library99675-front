// components/RecommendedBooks.jsx
import React, {useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { isAdmin, isUser } from '../components/checkRoles.jsx';
import ReserveBookButton from '../components/ReserveBookButton.jsx';
import DeleteBookButton from '../components/DeleteBookButton.jsx';



function RecommendedBooks() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecommended = async () => {
            try {
                const res = await fetch('http://localhost:3000/recommended', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                const data = await res.json();
                setBooks(data);
            } catch (err) {
                console.error('Błąd podczas pobierania rekomendacji:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchRecommended();
    }, []);

    if (loading) return <p>Ładowanie rekomendacji...</p>;
    if (books.length === 0) return null;

    return (
        <div>
            <h2>Rekomendowane książki</h2>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Tytuł</th>
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
                            {isUser() && (
                                <ReserveBookButton isbn={book.isbn} />
                            )}
                            {isAdmin() && (
                                <DeleteBookButton
                                    isbn={book.isbn}
                                    onDeleted={() =>
                                        setBooks(prev => prev.filter(b => b.isbn !== book.isbn))
                                    }
                                />
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default RecommendedBooks;
