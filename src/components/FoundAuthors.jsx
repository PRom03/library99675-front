import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import {checkRole} from '../components/checkRoles.jsx'
import DeleteAuthorButton from "../components/DeleteAuthorButton.jsx";

const FoundAuthors = ({authors,onDelete}) => {
    const [userRole, setUserRole] = useState("");
    useEffect(() => {
        const checkUserRole= async()=>{
            const role=await checkRole();
            setUserRole(role);
        }
        checkUserRole();
    })
    return (
        <>
            <h1>Lista autorów</h1>
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
                                    onDeleted={() => onDelete?.(author.id)

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

export default FoundAuthors;