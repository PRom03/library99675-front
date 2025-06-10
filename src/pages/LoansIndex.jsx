import React, { useEffect, useState } from 'react';
import CancelReservationButton from '../components/CancelReservationButton.jsx';
import ProlongLoanButton from '../components/ProlongLoanButton.jsx';
import PenaltiesButton from '../components/PenaltiesButton.jsx';
import MarkReturned from "../components/MarkReturned.jsx";
import {isLibrarian, isUser} from "../components/checkRoles.jsx";
import MarkLoanedButton from "../components/MarkLoanedButton.jsx";

const LoansIndex = () => {
    const [loans, setLoans] = useState([]);
    const fetchLoans = async () => {
        try {
            const token = localStorage.getItem('token');
            console.log(token);
            const res = await fetch('http://localhost:3000/loans', {
                headers: {

                    'Authorization': `Bearer ${token}`
                    // , 'Content-Type': 'application/json'
                }
            });
            if (!res.ok) {
                throw new Error('Błąd podczas ładowania wypożyczeń');
            }
            const data = await res.json();
            setLoans(data);
        } catch (error) {
            console.error('Błąd podczas ładowania wypożyczeń:', error);
        }
    };
    useEffect(() => {


        fetchLoans();
    }, []);

    return (
        <>
            <h1>Wypożyczone książki:</h1>
            {isLibrarian() && (
                <PenaltiesButton
                    onSuccess={fetchLoans}
                />
            )}
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Tytuł</th>
                    <th>Data wypożyczenia</th>
                    <th>Data zwrotu</th>
                    <th>Status</th>
                    <th>Kara</th>
                    <th>Akcje</th>
                </tr>
                </thead>
                <tbody>
                {loans.map((loan) => (
                    <tr key={loan._id}>
                        <td>{loan.title || loan.book?.title || '—'}</td>
                        <td>{loan.loan_date ? new Date(loan.loan_date).toLocaleDateString() : '—'}</td>
                        <td>{loan.return_date ? new Date(loan.return_date).toLocaleDateString() : '—'}</td>
                        <td>{loan.status}</td>
                        <td>{loan.penalty?.toFixed(2) || '0.00'} zł</td>
                        <td>
                            {loan.status === 'reserved' && isUser() && (
                                <CancelReservationButton
                                    loanId={loan._id}
                                    onSuccess={() =>
                                        setLoans(loans.filter((l) => l._id !== loan._id))
                                    }
                                />
                            )}
                            {loan.status === 'reserved' && isLibrarian() && (
                                <MarkLoanedButton
                                    loanId={loan._id}
                                    onSuccess={fetchLoans}
                                />
                            )}
                            {loan.status === 'loaned' && !loan.prolonged && isLibrarian() && (
                                <ProlongLoanButton
                                    loanId={loan._id}
                                    onSuccess={fetchLoans}
                                />
                            )}
                            {loan.status === 'loaned' && isLibrarian() && (
                                <MarkReturned
                                    loanId={loan._id}
                                    onSuccess={fetchLoans}
                                />
                            )}

                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
};

export default LoansIndex;
