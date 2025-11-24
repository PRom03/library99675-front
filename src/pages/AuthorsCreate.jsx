import React, { useState } from 'react';

const AuthorsCreate = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthYear, setBirthYear] = useState('');
    const [briefBio, setBriefBio] = useState('');
    const [imageSource, setImageSource] = useState('');
    const [message, setMessage] = useState('');
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

        const year = parseInt(birthYear, 10);
        if (!birthYear || isNaN(year) || year < 1800 || year > 2025) {
            newErrors.birthYear = 'Rok urodzenia musi być liczbą z zakresu 1800-2025.';
        }

        if (imageSource) {
            const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/i;
            if (!urlRegex.test(imageSource)) {
                newErrors.imageSource = 'Źródło obrazu musi być poprawnym adresem URL.';
            }
        }

        if (!briefBio || briefBio.length < 10) {
            newErrors.briefBio = 'Notka biograficzna musi mieć co najmniej 10 znaków.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!validate()) return;
        const newAuthor = {
            first_name: firstName,
            last_name: lastName,
            birthyear: parseInt(birthYear),
            image_source: imageSource,
            brief_bio: briefBio
        };

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:8080/api/authors', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',

                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newAuthor),
            });

            if (!response.ok) {
                throw new Error('Błąd podczas zapisu');
            }

            const data = await response.json();
            setMessage('Autor został dodany!');
            setFirstName('');
            setLastName('');
            setImageSource('');
            setBirthYear('');
            setBriefBio('');

            console.log('Zapisano autora:', data);
        } catch (error) {
            console.error('Błąd podczas dodawania autora:', error);
            setMessage('Wystąpił błąd przy dodawaniu autora.');
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



            <button type="submit" className="btn btn-primary">Dodaj autora</button>

            {message && <div className="alert alert-info mt-3">{message}</div>}
        </form>
    );
};

export default AuthorsCreate;