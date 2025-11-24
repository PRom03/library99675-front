import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const PublishersUpdate = () => {
    const { _id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState('');

    const [imageSource, setImageSource] = useState('');

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

    useEffect(() => {
        const fetchPublisher = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/publishers/${_id}`);
                if (!response.ok) throw new Error('Błąd podczas ładowania wydawcy');
                const publisher = await response.json();

                setName(publisher.name || '');
                setImageSource(publisher.image_source || '');

            } catch (error) {
                console.error('Błąd podczas pobierania wydawcy:', error);
            }
        };

        fetchPublisher();
    }, [_id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
if(!validate()) return;
        const updatedPublisher = {
            name: name,
            image_source: imageSource
        };

        try {
            const token = localStorage.getItem('token')
            const response = await fetch(`http://localhost:8080/api/publishers/${_id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(updatedPublisher),
            });

            if (!response.ok) throw new Error('Błąd podczas zapisu');
            navigate(`/publishers`);
        } catch (error) {
            console.error('Błąd podczas aktualizacji wydawcy:', error);
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
            <button type="submit" className="btn btn-primary">Zaktualizuj wydawcę</button>
        </form>
    );
};

export default PublishersUpdate;
