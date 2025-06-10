import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3000/users/login', { email, password });
            localStorage.setItem('token', res.data.token);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.error || 'Błąd logowania');
        }
    };

    return (
        <div>
            <h2>Logowanie</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px', gap: '12px'}}>
                <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Hasło" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Zaloguj się</button>
            </form>
        </div>
    );
}

export default LoginPage;
