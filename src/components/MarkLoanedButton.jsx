import React, {useState} from 'react';

const MarkLoanedButton = ({ loanId, onSuccess }) => {
    const [loaned,setLoaned] = useState(false);
    const handleMarkLoaned = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`http://localhost:3000/loans/loaned/${loanId}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });



            const data = await res.json();
            onSuccess?.(data);
            setLoaned(true);
        } catch (error) {
            alert(error.message || 'Błąd wypożyczenia');
        }
    };
    if (loaned) return null;
    return (
        <button onClick={handleMarkLoaned} className="btn btn-secondary">
            Oznacz jako wypożyczoną
        </button>
    );
};

export default MarkLoanedButton;
