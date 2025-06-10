import React, {useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";


import FoundBooks from "../components/FoundBooks.jsx";
import FoundAuthors from "../components/FoundAuthors.jsx";
import FoundCategories from "../components/FoundCategories.jsx";
import FoundPublishers from "../components/FoundPublishers.jsx";

function SearchPage() {
    const query=new URLSearchParams(useLocation().search).get('q');
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const res = await fetch(`http://localhost:3000/search?q=${encodeURIComponent(query)}`);
                const data = await res.json();
                setResults(data);
            } catch (err) {
                console.error('Błąd podczas wyszukiwania:', err);
                setResults(null);
            } finally {
                setLoading(false);
            }
        };

        if (query) {
            fetchResults();
        }
    }, [query]);

    if (loading) return <p>Ładowanie wyników...</p>;
    if (!results) return <p>Brak wyników lub błąd.</p>;

    return (
        <div>
            <h2>Wyniki wyszukiwania</h2>


            {results && (
                <div style={{ marginTop: '20px' }}>
                    {results.books.length > 0 && (
                        <FoundBooks books={results.books} onDelete={(books) =>
                            setResults(prev => ({ ...prev, books }))
                        }
                            />
                    )}

                    {results.authors.length > 0 && (
                        <FoundAuthors authors={results.authors} onDelete={(authors) =>
                            setResults(prev => ({ ...prev, authors }))
                        }
                        />
                    )}

                    {results.categories.length > 0 && (
                        <FoundCategories categories={results.categories} onDelete={(categories) =>
                            setResults(prev => ({ ...prev, categories }))
                        }
                        />
                    )}

                    {results.publishers.length > 0 && (
                        <FoundPublishers publishers={results.publishers} onDelete={(publishers) =>
                            setResults(prev => ({ ...prev, publishers }))
                        }
                        />
                    )}

                    {results.books.length === 0 && results.authors.length === 0 &&
                        results.categories.length === 0 && results.publishers.length === 0 && (
                            <p>Brak wyników</p>
                        )}
                </div>
            )}
        </div>
    );
}

export default SearchPage;
