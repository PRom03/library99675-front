import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {checkRole} from "../components/checkRoles.jsx";
import DeleteAuthorButton from "../components/DeleteAuthorButton.jsx";
import DeleteCategoryButton from "../components/DeleteCategoryButton.jsx";

const CategoriesIndex = () => {
    const [categories, setCategories] = useState([]);
    const [userRole, setUserRole] = useState("");

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/categories/');
                if (!response.ok) {
                    throw new Error('Błąd podczas ładowania kategorii: ' + response.statusText);
                }
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error('Błąd podczas ładowania kategorii:', error);
            }
        };
        const checkUserRole= async()=>{
            const role=await checkRole();
            setUserRole(role);
        }
        checkUserRole();
        fetchCategories();
    }, []);
    return (
        <>
            <h1>Lista kategorii</h1>
            {userRole==="admin" && (
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
                    <tr key={category.id}>
                        <td>{category.name}</td>

                        <td>{userRole==="admin" && (
                            <Link to={`/categories/${category.id}/update`} className="btn btn-warning">Edytuj</Link>

                        )}
                            {userRole==="admin" && (
                                <DeleteCategoryButton
                                    categoryId={category.id}
                                    onDeleted={() =>
                                        setCategories((prev) =>
                                            prev.filter((a) => a.id !== category.id)
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