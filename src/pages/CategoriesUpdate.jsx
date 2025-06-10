import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CategoriesUpdate = () => {
    const { _id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState('');

    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};

        // Nazwa: min 2 znaki
        if (!name || name.trim().length < 2) {
            newErrors.name = 'Nazwa wydawcy musi mieć co najmniej 2 znaki.';
        }



        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await fetch(`http://localhost:3000/categories/${_id}`);
                if (!response.ok) throw new Error('Błąd podczas ładowania kategorii');
                const category = await response.json();

                setName(category.name || '');

            } catch (error) {
                console.error('Błąd podczas pobierania kategorii:', error);
            }
        };

        fetchCategory();
    }, [_id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
if(!validate()) return;
        const updatedCategory = {
            name: name,
        };

        try {
            const token = localStorage.getItem('token')
            const response = await fetch(`http://localhost:3000/categories/${_id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(updatedCategory),
            });

            if (!response.ok) throw new Error('Błąd podczas zapisu');
            navigate(`/categories/${_id}`);
        } catch (error) {
            console.error('Błąd podczas aktualizacji kategorii:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>

            <div className="mb-3">
                <label className="form-label">Nazwa</label>
                <input
                    type="text"
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>

            
            <button type="submit" className="btn btn-primary">Zaktualizuj kategorię</button>
        </form>
    );
};

export default CategoriesUpdate;
