import React from 'react';

const DeletePublisherButton = ({ publisherId, onDeleted }) => {
    const handleDelete = async () => {
        if (!window.confirm('Czy na pewno chcesz usunąć tę kategorię?')) return;

        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`http://localhost:8080/api/publishers/${publisherId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!res.ok) throw new Error('Błąd podczas usuwania wydawcy');

            alert('Wydawca został usunięty.');
            if (onDeleted) onDeleted();

        } catch (err) {
            console.error(err);
            alert('Wystąpił błąd przy usuwaniu wydawcy.');
        }
    };

    return (
        <button onClick={handleDelete} className="btn btn-danger">
            Usuń
        </button>
    );
};

export default DeletePublisherButton;