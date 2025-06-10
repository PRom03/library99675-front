import React from 'react';
import { Link } from 'react-router-dom';
import {isAdmin} from '../components/checkRoles.jsx'
import DeleteAuthorButton from "../components/DeleteAuthorButton.jsx";

const FoundAuthors = ({authors,onDelete}) => {

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
                                    onDeleted={() => onDelete?.(author._id)

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