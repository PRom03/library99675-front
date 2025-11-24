import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {isAdmin} from "../components/checkRoles.jsx";
import DeleteCategoryButton from "../components/DeleteCategoryButton.jsx";
import DeletePublisherButton from "../components/DeletePublisherButton.jsx";

const PublishersIndex = () => {
    const [publishers, setPublishers] = useState([]);

    useEffect(() => {
        const fetchPublishers = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/publishers');
                if (!response.ok) {
                    throw new Error('Błąd podczas ładowania wydawców: ' + response.statusText);
                }
                const data = await response.json();
                setPublishers(data);
            } catch (error) {
                console.error('Błąd podczas ładowania wydawców:', error);
            }
        };

        fetchPublishers();
    }, []);
    return (
        <>
            <h1>Lista wydawców</h1>
            {isAdmin() && (
                <Link to={`/publishers/create`} className="btn btn-primary">Dodaj wydawcę</Link>

            )}
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
                            {publisher._id===1500100900 && (<Link to={`/publishers/${publisher._id}`} className="btn btn-primary">Zobacz</Link>)}
                        {isAdmin() && (
                            <Link to={`/publishers/${publisher._id}/update`} className="btn btn-warning">Edytuj</Link>

                        )}
                            {isAdmin() && (
                                <DeletePublisherButton
                                    publisherId={publisher._id}
                                    onDeleted={() =>
                                        setPublishers((prev) =>
                                            prev.filter((a) => a._id !== publisher._id)
                                        )
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

export default PublishersIndex;