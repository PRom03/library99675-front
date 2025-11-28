import React, { useEffect, useState } from 'react';
import CancelReservationButton from '../components/CancelReservationButton.jsx';
import ProlongLoanButton from '../components/ProlongLoanButton.jsx';
import PenaltiesButton from '../components/PenaltiesButton.jsx';
import MarkReturned from "../components/MarkReturned.jsx";
import {checkRole} from "../components/checkRoles.jsx";
import MarkLoanedButton from "../components/MarkLoanedButton.jsx";

const LoansIndex = () => {
    const [loans, setLoans] = useState([]);
    const [userRole, setUserRole] = useState("");
    const fetchLoans = async () => {
        try {
            const token = localStorage.getItem('token');
            console.log(token);
            const res = await fetch('http://localhost:8080/api/loans', {
                headers: {

                    'Authorization': `Bearer ${token}`
                    , 'Content-Type': 'application/json'
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
        const checkUserRole= async()=>{
            const role=await checkRole();
            setUserRole(role);
        }
        checkUserRole();

        fetchLoans();
    }, []);

    return (
        <>
            <h1>Wypożyczone książki:</h1>
            {userRole==="librarian" && (
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
                    <tr key={loan.id}>
                        <td>{loan.title || loan.book?.title || '—'}</td>
                        <td>{loan.loanDate ? new Date(loan.loanDate).toLocaleDateString() : '—'}</td>
                        <td>{loan.returnDate ? new Date(loan.returnDate).toLocaleDateString() : '—'}</td>
                        <td>{loan.status}</td>
                        <td>{loan.penalty?.toFixed(2) || '0.00'} zł</td>
                        <td>
                            {loan.status === 'reserved' && userRole==="client" && (
                                <CancelReservationButton
                                    loanId={loan.id}
                                    onSuccess={() =>
                                        setLoans(loans.filter((l) => l._id !== loan._id))
                                    }
                                />
                            )}
                            {loan.status === 'reserved' && userRole==="librarian" && (
                                <MarkLoanedButton
                                    loanId={loan.id}
                                    onSuccess={fetchLoans}
                                />
                            )}
                            {loan.status === 'loaned' && !loan.prolonged && userRole==="librarian" && (
                                <ProlongLoanButton
                                    loanId={loan.id}
                                    onSuccess={fetchLoans}
                                />
                            )}
                            {loan.status === 'loaned' && userRole==="librarian" && (
                                <MarkReturned
                                    loanId={loan.id}
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
