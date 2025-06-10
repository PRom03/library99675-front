import React from 'react';

const DeleteCategoryButton = ({ categoryId, onDeleted }) => {
    const handleDelete = async () => {
        if (!window.confirm('Czy na pewno chcesz usunąć tę kategorię?')) return;

        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`http://localhost:3000/categories/${categoryId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!res.ok) throw new Error('Błąd podczas usuwania kategorii');

            alert('Kategoria została usunięta.');
            if (onDeleted) onDeleted();

        } catch (err) {
            console.error(err);
            alert('Wystąpił błąd przy usuwaniu kategorii.');
        }
    };

    return (
        <button onClick={handleDelete} className="btn btn-danger">
            Usuń
        </button>
    );
};

export default DeleteCategoryButton;