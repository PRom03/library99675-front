import React, { useState } from 'react';

const CancelReservationButton = ({ loanId, onSuccess }) => {
    const [cancelled, setCancelled] = useState(false);

    const handleCancel = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`http://localhost:8080/api/loans/${loanId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData?.error || 'Błąd anulowania');
            }

            alert('Rezerwacja usunięta');
            setCancelled(true);
            onSuccess?.();
        } catch (error) {
            alert(error.message || 'Błąd anulowania');
        }
    };

    if (cancelled) return null;

    return (
        <button
            onClick={handleCancel}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
            Anuluj rezerwację
        </button>
    );
};

export default CancelReservationButton;
