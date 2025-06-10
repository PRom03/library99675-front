import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {isAdmin} from "../components/checkRoles.jsx";
import DeleteAuthorButton from "../components/DeleteAuthorButton.jsx";
import DeleteCategoryButton from "../components/DeleteCategoryButton.jsx";

const CategoriesIndex = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:3000/categories');
                if (!response.ok) {
                    throw new Error('Błąd podczas ładowania kategorii: ' + response.statusText);
                }
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error('Błąd podczas ładowania kategorii:', error);
            }
        };

        fetchCategories();
    }, []);
    return (
        <>
            <h1>Lista kategorii</h1>
            {isAdmin() && (
                <Link to={`/categories/create`} className="btn btn-primary">Dodaj kategorię</Link>

            )}
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
                                    onDeleted={() =>
                                        setCategories((prev) =>
                                            prev.filter((a) => a._id !== category._id)
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

export default CategoriesIndex;