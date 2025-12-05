import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import {checkRole} from "../components/checkRoles.jsx";
import DeleteCategoryButton from "../components/DeleteCategoryButton.jsx";
import DeletePublisherButton from "../components/DeletePublisherButton.jsx";

const FoundPublishers = ({publishers,onDelete}) => {
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
            <h1>Lista wydawców</h1>
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
                            <Link to={`/publishers/${publisher.id}`} className="btn btn-primary">Zobacz</Link>
                            {userRole==="admin" && (
                                <Link to={`/publishers/${publisher.id}/update`} className="btn btn-warning">Edytuj</Link>

                            )}
                            {userRole==="admin" && (
                                <DeletePublisherButton
                                    publisherId={publisher.id}
                                    onDeleted={() => onDelete?.(publisher.id)

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