import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import {checkRole} from "../components/checkRoles.jsx";
import DeleteAuthorButton from "../components/DeleteAuthorButton.jsx";
import DeleteCategoryButton from "../components/DeleteCategoryButton.jsx";

const FoundCategories = ({categories,onDelete}) => {
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
            <h1>Lista kategorii</h1>
            <table className="table table-striped">
                <thead>
                <tr><th>Nazwa</th>
                    <th>Akcje</th>

                </tr>
                </thead>
                <tbody>
                {categories.map((category) => (
                    <tr key={category.id}>
                        <td>{category.name}</td>

                        <td>{userRole==="admin" && (
                            <Link to={`/categories/${category.id}/update`} className="btn btn-warning">Edytuj</Link>

                        )}
                            {userRole==="admin" && (
                                <DeleteCategoryButton
                                    categoryId={category.id}
                                    onDeleted={() => onDelete?.(category.id)

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

export default FoundCategories;