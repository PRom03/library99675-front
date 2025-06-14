import React, { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom";

const BooksCreate = () => {
    const [title, setTitle] = useState('');
    const [authorId, setAuthorId] = useState('');
    const [publisherId, setPublisherId] = useState('');
    const [isbn, setIsbn] = useState('');
    const [available, setAvailable] = useState('');
    const [year_of_publication, set_year_of_publication] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [authors, setAuthors] = useState([]);
    const [publishers, setPublishers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const validate = () => {
        const newErrors = {};

        const isbnRegex = /^(\d{13})$/;
        if (!isbn || !isbnRegex.test(isbn)) {
            newErrors.isbn = 'ISBN musi mieć 10 lub 13 cyfr (bez myślników).';
        }

        if (!title || title.length < 2) {
            newErrors.title = 'Tytuł musi mieć co najmniej 2 znaki.';
        }

        const year = parseInt(year_of_publication, 10);
        if (!year_of_publication || isNaN(year) || year < 1500 || year > 2025) {
            newErrors.year_of_publication = 'Rok wydania musi być liczbą od 1500 do 2025.';
        }

        const availableInt = parseInt(available, 10);
        if (available === '' || isNaN(availableInt) || availableInt < 0) {
            newErrors.available = 'Dostępnych musi być liczbą całkowitą nieujemną.';
        }

        if (!authorId) {
            newErrors.authorId = 'Proszę wybrać autora.';
        }

        if (!publisherId) {
            newErrors.publisherId = 'Proszę wybrać wydawcę.';
        }

        if (!categoryId) {
            newErrors.categoryId = 'Proszę wybrać kategorię.';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [authorsRes, publishersRes, categoriesRes] = await Promise.all([
                    fetch('http://localhost:3000/authors'),
                    fetch('http://localhost:3000/publishers'),
                    fetch('http://localhost:3000/categories'),
                ]);

                const authorsData = await authorsRes.json();
                const publishersData = await publishersRes.json();
                const categoriesData = await categoriesRes.json();

                setAuthors(authorsData);
                setPublishers(publishersData);
                setCategories(categoriesData);
            } catch (error) {
                console.error('Błąd podczas pobierania danych:', error);
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!validate()) return;
        const newBook = {
            title: title,
            isbn: isbn,
            available: parseInt(available),
            year_of_publication: parseInt(year_of_publication),
            author: authorId,
            publisher: publisherId,
            category: categoryId
        };

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3000/books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(newBook),
            });

            if (!response.ok) {
                throw new Error('Błąd podczas zapisu');
            }

            const data = await response.json();
            setMessage('Książka została dodana!');
            setTitle('');
            setAuthorId('');
            setPublisherId('');
            setIsbn('');
            setAvailable('');
            set_year_of_publication('');
            setCategoryId('');
            navigate(`/books/${isbn}`);

            console.log('Zapisano książkę:', data);
        } catch (error) {
            console.error('Błąd podczas dodawania książki:', error);
            setMessage('Wystąpił błąd przy dodawaniu książki.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">ISBN</label>
                <input
                    type="text"
                    className={`form-control ${errors.isbn ? 'is-invalid' : ''}`}
                    value={isbn}
                    onChange={(e) => setIsbn(e.target.value)}
                />
                {errors.isbn && <div className="invalid-feedback">{errors.isbn}</div>}
            </div>

            <div className="mb-3">
                <label className="form-label">Tytuł</label>
                <input
                    type="text"
                    className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                {errors.title && <div className="invalid-feedback">{errors.title}</div>}
            </div>

            <div className="mb-3">
                <label className="form-label">Rok wydania</label>
                <input
                    type="number"
                    className={`form-control ${errors.year_of_publication ? 'is-invalid' : ''}`}
                    value={year_of_publication}
                    onChange={(e) => set_year_of_publication(e.target.value)}
                />
                {errors.year_of_publication && (
                    <div className="invalid-feedback">{errors.year_of_publication}</div>
                )}
            </div>

            <div className="mb-3">
                <label className="form-label">Dostępnych</label>
                <input
                    type="number"
                    className={`form-control ${errors.available ? 'is-invalid' : ''}`}
                    value={available}
                    onChange={(e) => setAvailable(e.target.value)}
                />
                {errors.available && <div className="invalid-feedback">{errors.available}</div>}
            </div>

            <div className="mb-3">
                <label className="form-label">Autor</label>
                <select
                    className={`form-select ${errors.authorId ? 'is-invalid' : ''}`}
                    value={authorId}
                    onChange={(e) => setAuthorId(e.target.value)}
                >
                    <option value="">-- wybierz autora --</option>
                    {authors.map((author) => (
                        <option key={author._id} value={author._id}>
                            {author.first_name} {author.last_name}
                        </option>
                    ))}
                </select>
                {errors.authorId && <div className="invalid-feedback">{errors.authorId}</div>}
            </div>

            <div className="mb-3">
                <label className="form-label">Wydawca</label>
                <select
                    className={`form-select ${errors.publisherId ? 'is-invalid' : ''}`}
                    value={publisherId}
                    onChange={(e) => setPublisherId(e.target.value)}
                >
                    <option value="">-- wybierz wydawcę --</option>
                    {publishers.map((publisher) => (
                        <option key={publisher._id} value={publisher._id}>
                            {publisher.name}
                        </option>
                    ))}
                </select>
                {errors.publisherId && <div className="invalid-feedback">{errors.publisherId}</div>}
            </div>

            <div className="mb-3">
                <label className="form-label">Kategoria</label>
                <select
                    className={`form-select ${errors.categoryId ? 'is-invalid' : ''}`}
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                >
                    <option value="">-- wybierz kategorię --</option>
                    {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                            {category.name}
                        </option>
                    ))}
                </select>
                {errors.categoryId && <div className="invalid-feedback">{errors.categoryId}</div>}
            </div>

            <button type="submit" className="btn btn-primary">
                Dodaj książkę
            </button>

            {message && <div className="alert alert-info mt-3">{message}</div>}
        </form>
    );
};

export default BooksCreate;
