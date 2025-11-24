import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const AuthorsUpdate = () => {
    const { _id } = useParams();
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthYear, setBirthYear] = useState('');
    const [briefBio, setBriefBio] = useState('');
    const [imageSource, setImageSource] = useState('');
    const [errors, setErrors] = useState({});
    const validate = () => {
        const newErrors = {};

        const nameRegex = /^[A-Za-zĄĆĘŁŃÓŚŹŻąćęłńóśźż-]{2,}$/;
        if (!nameRegex.test(firstName)) {
            newErrors.firstName = 'Imię musi mieć co najmniej 2 litery (tylko litery).';
        }
        if (!nameRegex.test(lastName)) {
            newErrors.lastName = 'Nazwisko musi mieć co najmniej 2 litery (tylko litery).';
        }

        // Rok urodzenia: liczba 1800-2025
        const year = parseInt(birthYear, 10);
        if (!birthYear || isNaN(year) || year < 1800 || year > 2025) {
            newErrors.birthYear = 'Rok urodzenia musi być liczbą z zakresu 1800-2025.';
        }

        // Źródło obrazu: pusty lub poprawny URL (prosty regex)
        if (imageSource) {
            const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/i;
            if (!urlRegex.test(imageSource)) {
                newErrors.imageSource = 'Źródło obrazu musi być poprawnym adresem URL.';
            }
        }

        // Notka biograficzna: min 10 znaków
        if (!briefBio || briefBio.length < 10) {
            newErrors.briefBio = 'Notka biograficzna musi mieć co najmniej 10 znaków.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    useEffect(() => {
        const fetchAuthor = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/authors/${_id}`);
                if (!response.ok) throw new Error('Błąd podczas ładowania autora');
                const author = await response.json();

                setFirstName(author.first_name || '');
                setLastName(author.last_name || '');
                setBirthYear(author.birthyear || 0);
                setImageSource(author.image_source || '');
                setBriefBio(author.brief_bio || '');

            } catch (error) {
                console.error('Błąd podczas pobierania autora:', error);
            }
        };

        fetchAuthor();
    }, [_id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!validate()) return;
        const updatedAuthor = {
            first_name: firstName,
            last_name: lastName,
            birthyear: parseInt(birthYear),
            image_source: imageSource,
            brief_bio: briefBio
        };

        try {
            const token = localStorage.getItem('token')
            const response = await fetch(`http://localhost:8080/api/authors/${_id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(updatedAuthor),
            });

            if (!response.ok) throw new Error('Błąd podczas zapisu');
            navigate(`/authors/${_id}`);
        } catch (error) {
            console.error('Błąd podczas aktualizacji książki:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>

            <div className="mb-3">
                <label className="form-label">Imię</label>
                <input
                    type="text"
                    className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                {errors.firstName && (
                    <div className="invalid-feedback">{errors.firstName}</div>
                )}
            </div>
            <div className="mb-3">
                <label className="form-label">Nazwisko</label>
                <input
                    type="text"
                    className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                {errors.lastName && (
                    <div className="invalid-feedback">{errors.lastName}</div>
                )}
            </div>
            <div className="mb-3">
                <label className="form-label">Rok urodzenia</label>
                <input
                    type="number"
                    className={`form-control ${errors.birthYear ? 'is-invalid' : ''}`}
                    value={birthYear}
                    onChange={(e) => setBirthYear(e.target.value)}
                />
                {errors.birthYear && (
                    <div className="invalid-feedback">{errors.birthYear}</div>
                )}
            </div>
            <div className="mb-3">
                <label className="form-label">Źródło obrazu</label>
                <input
                    type="text"
                    className={`form-control ${errors.imageSource ? 'is-invalid' : ''}`}
                    value={imageSource}
                    onChange={(e) => setImageSource(e.target.value)}
                />
                {errors.imageSource && (
                    <div className="invalid-feedback">{errors.imageSource}</div>
                )}
            </div>
            <div className="mb-3">
                <label className="form-label">Notka biograficzna</label>
                <input
                    type="text"
                    className={`form-control ${errors.briefBio ? 'is-invalid' : ''}`}
                    value={briefBio}
                    onChange={(e) => setBriefBio(e.target.value)}
                />
                {errors.briefBio && (
                    <div className="invalid-feedback">{errors.briefBio}</div>
                )}
            </div>
            <button type="submit" className="btn btn-primary">Zaktualizuj autora</button>
        </form>
    );
};

export default AuthorsUpdate;
