import React, { useState } from 'react';

const PenaltiesButton = ({ onSuccess }) => {
    const [calculated, setCalculated] = useState(false);

    const handlePenalties = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`http://localhost:3000/loans/penalties`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data?.error || 'Błąd naliczania kar');
            }

            alert('Kary naliczone');
            setCalculated(true);
            onSuccess?.(data);
        } catch (error) {
            alert(error.message || 'Błąd naliczania kar');
        }
    };

    return (
        <button
            onClick={handlePenalties}
            disabled={calculated}
            className='btn btn-secondary'
        >
            {calculated ? 'Kary naliczone' : 'Nalicz kary'}
        </button>
    );
};

export default PenaltiesButton;
