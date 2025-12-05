import React from 'react';

const DeleteBookButton = ({ isbn, onDeleted }) => {
    const handleDelete = async () => {
        if (!window.confirm('Czy na pewno chcesz usunąć tę książkę?')) return;

        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`http://localhost:8080/api/books/${isbn}/delete`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!res.ok) throw new Error('Błąd podczas usuwania książki');

            alert('Książka została usunięta.');
            if (onDeleted) onDeleted();

        } catch (err) {
            console.error(err);
            alert('Wystąpił błąd przy usuwaniu książki.');
        }
    };

    return (
        <button onClick={handleDelete} className="btn btn-danger">
            Usuń
        </button>
    );
};

export default DeleteBookButton;