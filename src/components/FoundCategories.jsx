import React from 'react';
import { Link } from 'react-router-dom';
import {isAdmin} from "../components/checkRoles.jsx";
import DeleteAuthorButton from "../components/DeleteAuthorButton.jsx";
import DeleteCategoryButton from "../components/DeleteCategoryButton.jsx";

const FoundCategories = ({categories,onDelete}) => {

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
                    <tr key={category._id}>
                        <td>{category.name}</td>

                        <td>{isAdmin() && (
                            <Link to={`/categories/${category._id}/update`} className="btn btn-warning">Edytuj</Link>

                        )}
                            {isAdmin() && (
                                <DeleteCategoryButton
                                    categoryId={category._id}
                                    onDeleted={() => onDelete?.(category._id)

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