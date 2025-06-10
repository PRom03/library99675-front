import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {isAdmin} from '../components/checkRoles.jsx'
import DeleteAuthorButton from "../components/DeleteAuthorButton.jsx";

const AuthorsIndex = () => {
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                const response = await fetch('http://localhost:3000/authors');
                if (!response.ok) {
                    throw new Error('Błąd podczas ładowania autorów: ' + response.statusText);
                }
                const data = await response.json();
                setAuthors(data);
            } catch (error) {
                console.error('Błąd podczas ładowania autorów:', error);
            }
        };

        fetchAuthors();
    }, []);
    return (
        <>
            <h1>Lista autorów</h1>
            {isAdmin() && (
                <Link to={`/authors/create`} className="btn btn-primary">Dodaj autora</Link>

            )}
            <table className="table table-striped">
                <thead>
                <tr><th>Imię i nazwisko</th>

                    <th>Akcje</th>
                </tr>
                </thead>
                <tbody>
                {authors.map((author) => (
                    <tr key={author._id}>
                        <td>{author.first_name} {author.last_name}</td>
                        <td>
                            <Link to={`/authors/${author._id}`} className="btn btn-primary">Zobacz</Link>
                            {isAdmin() && (
                                <Link to={`/authors/${author._id}/update`} className="btn btn-warning">Edytuj</Link>

                            )}
                            {isAdmin() && (
                                <DeleteAuthorButton
                                    authorId={author._id}
                                    onDeleted={() =>
                                        setAuthors((prev) =>
                                            prev.filter((a) => a._id !== author._id)
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

export default AuthorsIndex;