import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {checkRole} from '../components/checkRoles.jsx'
import DeleteAuthorButton from "../components/DeleteAuthorButton.jsx";

const AuthorsIndex = () => {
    const [authors, setAuthors] = useState([]);
    const [userRole, setUserRole] = useState("");

    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/authors/');
                if (!response.ok) {
                    throw new Error('Błąd podczas ładowania autorów: ' + response.statusText);
                }
                const data = await response.json();
                setAuthors(data);
            } catch (error) {
                console.error('Błąd podczas ładowania autorów:', error);
            }
        };
        const checkUserRole= async()=>{
            const role=await checkRole();
            setUserRole(role);
        }
        checkUserRole();
        fetchAuthors();
    }, []);
    return (
        <>
            <h1>Lista autorów</h1>
            {userRole==="admin" && (
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
                    <tr key={author.id}>
                        <td>{author.firstName} {author.lastName}</td>
                        <td>
                            <Link to={`/authors/${author.id}`} className="btn btn-primary">Zobacz</Link>
                            {userRole==="admin" && (
                                <Link to={`/authors/${author.id}/update`} className="btn btn-warning">Edytuj</Link>

                            )}
                            {userRole==="admin" && (
                                <DeleteAuthorButton
                                    authorId={author.id}
                                    onDeleted={() =>
                                        setAuthors((prev) =>
                                            prev.filter((a) => a.id !== author.id)
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