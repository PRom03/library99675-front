import React, { useEffect, useState } from 'react';

function EditProfile() {
    //const [user, setUser] = useState({});
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        fetch('http://localhost:3000/users/me', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => {
               // setUser(data);
                setName(data.name);
                setEmail(data.email);
            });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');

        const res = await fetch('http://localhost:3000/users/me/edit', {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, oldPassword, newPassword })
        });

        const data = await res.json();

        if (res.ok) {
            setMessage('Dane zaktualizowane.');
            setOldPassword('');
            setNewPassword('');
        } else {
            setMessage(data.error || 'Błąd przy aktualizacji.');
        }
    };

    return (
        <div>
            <h2>Edytuj dane</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Imię:</label>
                    <input value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div>
                    <label>Email:</label>
                    <input value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <hr />
                <h4>Zmiana hasła</h4>
                <div>
                    <label>Stare hasło:</label>
                    <input type="password" value={oldPassword} onChange={e => setOldPassword(e.target.value)} />
                </div>
                <div>
                    <label>Nowe hasło:</label>
                    <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                </div>
                <button type="submit">Zapisz</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default EditProfile;
