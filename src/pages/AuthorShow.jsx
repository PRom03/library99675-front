import React, { useEffect, useState } from 'react';
import {Link, useParams} from 'react-router-dom';
import {checkRole} from "../components/checkRoles.jsx";
import DeleteAuthorButton from "../components/DeleteAuthorButton.jsx";


const AuthorShow = () => {
    const { id } = useParams();
    const [userRole, setUserRole] = useState("");

    const [author, setAuthor] = useState([]);

    useEffect(() => {
        const fetchAuthor = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/authors/${id}`);
                if (!response.ok) {
                    throw new Error('Błąd podczas ładowania autorów: ' + response.statusText);
                }
                const data = await response.json();
                setAuthor(data);
            } catch (error) {
                console.error('Błąd podczas ładowania autorów:', error);
            }
        };
        const checkUserRole= async()=>{
            const role=await checkRole();
            setUserRole(role);
        }
        checkUserRole();
        fetchAuthor();
    }, [id]);
    return (
        <>

            <div style={{ maxWidth: "400px"}}>
                <h1>Szczegóły autora</h1>
                {author.image_source && (
                    <div style={{ textAlign: "center", marginBottom: "20px" }}>
                        <img src={author.imageSource} alt={`${author.firstName} ${author.lastName}`} style={{ maxWidth: "100%" }} />
                    </div>
                )}
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <strong>Imię i nazwisko:</strong>
                    <span>{author.firstName} {author.lastName}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <strong>Rok urodzenia:</strong>
                    <span>{author.birthyear}</span>
                </div>
                <div style={{ marginBottom: "8px" }}>
                    <strong>Krótka biografia:</strong>
                    <p>{author.briefBio}</p>
                </div>

                <div style={{ marginTop: "20px" }}>

                    {userRole==="admin" && (
                        <Link to={`/authors/${author.id}/update`} className="btn btn-warning" style={{ marginRight: '8px' }}>
                            Edytuj
                        </Link>
                    )}
                    {userRole==="admin" && (
                        <DeleteAuthorButton
                            authorId={author.id}
                            onDeleted={() => setAuthor(null)}
                        />
                    )}
                </div>
            </div>

        </>
    );
};

export default AuthorShow;