import React, {useState} from 'react';

const MarkReturnedButton = ({ loanId, onSuccess }) => {
    const [returned, setReturned] = useState(false);
    const handleMarkReturned = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`http://localhost:3000/loans/return/${loanId}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`}
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData?.error || 'Błąd rezerwacji');
            }

            const data = await res.json();
            onSuccess?.(data);
            setReturned(true);
        } catch (error) {
            alert(error.message || 'Błąd rezerwacji');
        }
    };
    if (returned) return null;
    return (
        <button onClick={handleMarkReturned} className="btn btn-secondary">
            Oznacz jako zwróconą
        </button>
    );
};

export default MarkReturnedButton;
