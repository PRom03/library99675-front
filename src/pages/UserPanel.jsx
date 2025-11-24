import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UserPanel() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return;

        fetch('http://localhost:8080/api/users/me', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setUser(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Błąd przy pobieraniu użytkownika:', err);
                setLoading(false);
            });
    }, []);

    if (!localStorage.getItem('token')) {
        return <p>Brak dostępu. Zaloguj się.</p>;
    }

    if (loading) return <p>Ładowanie...</p>;

    return (
        <div>
            <h2>Panel użytkownika</h2>
            <p><strong>Imię:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>

            <button onClick={() => navigate('/me/edit')}>Edytuj dane</button>
            <button onClick={() => navigate('/loans')}>Wypożyczone książki</button>
        </div>
    );
}

export default UserPanel;
