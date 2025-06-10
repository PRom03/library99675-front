import React from 'react';
import { Link } from 'react-router-dom';
import {isAdmin} from "../components/checkRoles.jsx";
import DeleteCategoryButton from "../components/DeleteCategoryButton.jsx";
import DeletePublisherButton from "../components/DeletePublisherButton.jsx";

const FoundPublishers = ({publishers,onDelete}) => {

    return (
        <>
            <h1>Lista wydawców</h1>
            <table className="table table-striped">
                <thead>
                <tr><th>Nazwa</th>
                    <th>Akcje</th>
                </tr>
                </thead>
                <tbody>
                {publishers.map((publisher) => (
                    <tr key={publisher._id}>
                        <td>{publisher.name}</td>
                        <td>
                            <Link to={`/publishers/${publisher._id}`} className="btn btn-primary">Zobacz</Link>
                            {isAdmin() && (
                                <Link to={`/publishers/${publisher._id}/update`} className="btn btn-warning">Edytuj</Link>

                            )}
                            {isAdmin() && (
                                <DeletePublisherButton
                                    publisherId={publisher._id}
                                    onDeleted={() => onDelete?.(publisher._id)

                                    }
                                />
                            )}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
};

export default FoundPublishers;