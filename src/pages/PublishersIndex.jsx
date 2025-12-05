import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {checkRole} from "../components/checkRoles.jsx";
import DeleteCategoryButton from "../components/DeleteCategoryButton.jsx";
import DeletePublisherButton from "../components/DeletePublisherButton.jsx";

const PublishersIndex = () => {
    const [publishers, setPublishers] = useState([]);
    const [userRole, setUserRole] = useState("");

    useEffect(() => {
        const fetchPublishers = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/publishers/');
                if (!response.ok) {
                    throw new Error('Błąd podczas ładowania wydawców: ' + response.statusText);
                }
                const data = await response.json();
                setPublishers(data);
            } catch (error) {
                console.error('Błąd podczas ładowania wydawców:', error);
            }
        };
        const checkUserRole= async()=>{
            const role=await checkRole();
            setUserRole(role);
        }
        checkUserRole();
        fetchPublishers();
    }, []);
    return (
        <>
            <h1>Lista wydawców</h1>
            {userRole==="admin" && (
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
                    <tr key={publisher.id}>
                        <td>{publisher.name}</td>
                        <td>
                            {publisher.id===1500100900 && (<Link to={`/publishers/${publisher.id}`} className="btn btn-primary">Zobacz</Link>)}
                        {userRole==="admin" && (
                            <Link to={`/publishers/${publisher.id}/update`} className="btn btn-warning">Edytuj</Link>

                        )}
                            {userRole==="admin" && (
                                <DeletePublisherButton
                                    publisherId={publisher.id}
                                    onDeleted={() =>
                                        setPublishers((prev) =>
                                            prev.filter((a) => a.id !== publisher.id)
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