import React, { useState } from 'react';

const CategoriesCreate = () => {
    const [name, setName] = useState('');

    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};

        if (!name || name.trim().length < 2) {
            newErrors.name = 'Nazwa kategorii musi mieć co najmniej 2 znaki.';
        }



        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
    if(!validate()) return;
        const newCategory = {
            name: name};

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:8080/api//categories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',

                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newCategory),
            });

            if (!response.ok) {
                throw new Error('Błąd podczas zapisu');
            }

            const data = await response.json();

            setName('');

            console.log('Zapisano kategorię:', data);
        } catch (error) {
            console.error('Błąd podczas dodawania kategorii:', error);
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




            <button type="submit" className="btn btn-primary">Dodaj kategorię</button>

        </form>
    );
};

export default CategoriesCreate;