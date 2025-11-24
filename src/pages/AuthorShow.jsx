import React, { useEffect, useState } from 'react';
import {Link, useParams} from 'react-router-dom';
import {isAdmin} from "../components/checkRoles.jsx";
import DeleteAuthorButton from "../components/DeleteAuthorButton.jsx";


const AuthorShow = () => {
    const { _id } = useParams();

    const [author, setAuthor] = useState([]);

    useEffect(() => {
        const fetchAuthor = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/authors/${_id}`);
                if (!response.ok) {
                    throw new Error('Błąd podczas ładowania autorów: ' + response.statusText);
                }
                const data = await response.json();
                setAuthor(data);
            } catch (error) {
                console.error('Błąd podczas ładowania autorów:', error);
            }
        };

        fetchAuthor();
    }, [_id]);
    return (
        <>

            <div style={{ maxWidth: "400px"}}>
                <h1>Szczegóły autora</h1>
                {author.image_source && (
                    <div style={{ textAlign: "center", marginBottom: "20px" }}>
                        <img src={author.image_source} alt={`${author.first_name} ${author.last_name}`} style={{ maxWidth: "100%" }} />
                    </div>
                )}
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <strong>Imię i nazwisko:</strong>
                    <span>{author.first_name} {author.last_name}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <strong>Rok urodzenia:</strong>
                    <span>{author.birthyear}</span>
                </div>
                <div style={{ marginBottom: "8px" }}>
                    <strong>Krótka biografia:</strong>
                    <p>{author.brief_bio}</p>
                </div>

                <div style={{ marginTop: "20px" }}>

                    {isAdmin() && (
                        <Link to={`/authors/${author._id}/update`} className="btn btn-warning" style={{ marginRight: '8px' }}>
                            Edytuj
                        </Link>
                    )}
                    {isAdmin() && (
                        <DeleteAuthorButton
                            authorId={author._id}
                            onDeleted={() => setAuthor(null)}
                        />
                    )}
                </div>
            </div>

        </>
    );
};

export default AuthorShow;