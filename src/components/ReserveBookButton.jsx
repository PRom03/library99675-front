import React, {useState} from 'react';

const ReserveBookButton = ({ isbn, onSuccess }) => {
    const [reserved, setReserved] = useState(false);
    const handleReserve = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`http://localhost:3000/loans/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({isbn})
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData?.error || 'Błąd rezerwacji');
            }

            const data = await res.json();
            onSuccess?.(data);
            setReserved(true);
        } catch (error) {
            alert(error.message || 'Błąd rezerwacji');
        }
    };
    if (reserved) return null;
    return (
        <button onClick={handleReserve} className="btn btn-secondary">
            Rezerwuj
        </button>
    );
};

export default ReserveBookButton;
