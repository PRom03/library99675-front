import React, { useState } from 'react';

const ProlongLoanButton = ({ loanId, onSuccess }) => {
    const [prolonged, setProlonged] = useState(false);

    const handleProlong = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`http://localhost:3000/loans/prolong/${loanId}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data?.error || 'Błąd przedłużania');
            }

            alert('Wypożyczenie przedłużone');
            setProlonged(true);
            onSuccess?.(data);
        } catch (error) {
            alert(error.message || 'Błąd przedłużania');
        }
    };

    if (prolonged) return null;

    return (
        <button
            onClick={handleProlong}
            className="btn btn-secondary"
        >
            Przedłuż wypożyczenie
        </button>
    );
};

export default ProlongLoanButton;
