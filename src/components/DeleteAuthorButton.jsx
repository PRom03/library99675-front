import React from 'react';

const DeleteAuthorButton = ({ authorId, onDeleted }) => {
    const handleDelete = async () => {
        if (!window.confirm('Czy na pewno chcesz usunąć tego autora?')) return;

        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`http://localhost:8080/api/authors/${authorId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!res.ok) throw new Error('Błąd podczas usuwania autora');

            alert('Autor został usunięty.');
            if (onDeleted) onDeleted();

        } catch (err) {
            console.error(err);
            alert('Wystąpił błąd przy usuwaniu autora.');
        }
    };

    return (
        <button onClick={handleDelete} className="btn btn-danger">
            Usuń
        </button>
    );
};

export default DeleteAuthorButton;
