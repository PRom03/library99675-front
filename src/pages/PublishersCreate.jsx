import React, { useState } from 'react';

const PublishersCreate = () => {
    const [name, setName] = useState('');
    const [imageSource, setImageSource] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};

        if (!name || name.trim().length < 2) {
            newErrors.name = 'Nazwa wydawcy musi mieć co najmniej 2 znaki.';
        }

        if (imageSource.trim()) {
            try {
                new URL(imageSource);
            } catch {
                newErrors.imageSource = 'Źródło obrazu musi być poprawnym URL.';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        const newPublisher = {
            name: name.trim(),
            image_source: imageSource.trim(),
        };

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3000/publishers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(newPublisher),
            });

            if (!response.ok) {
                throw new Error('Błąd podczas zapisu');
            }

            const data = await response.json();
            setMessage('Wydawca został dodany!');
            setName('');
            setImageSource('');
            setErrors({});
            console.log('Zapisano wydawcę:', data);
        } catch (error) {
            console.error('Błąd podczas dodawania wydawcy:', error);
            setMessage('Wystąpił błąd przy dodawaniu wydawcy.');
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

            <div className="mb-3">
                <label className="form-label">Źródło obrazu</label>
                <input
                    type="text"
                    className={`form-control ${errors.imageSource ? 'is-invalid' : ''}`}
                    value={imageSource}
                    onChange={(e) => setImageSource(e.target.value)}
                />
                {errors.imageSource && <div className="invalid-feedback">{errors.imageSource}</div>}
            </div>

            <button type="submit" className="btn btn-primary">Dodaj wydawcę</button>

            {message && <div className="alert alert-info mt-3">{message}</div>}
        </form>
    );
};

export default PublishersCreate;
