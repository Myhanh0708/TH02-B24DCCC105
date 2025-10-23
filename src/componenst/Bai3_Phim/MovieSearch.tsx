// src/components/Bai3_Phim/MovieSearch.tsx

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { SearchResponse, MovieSearchResult } from '../../types/Movie';
import MovieCard from './MovieCard'; 

// THAY THẾ BẰNG API KEY CỦA BẠN!
const OMDB_API_KEY = 'YOUR_OMDB_API_KEY'; 
const API_BASE_URL = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}`;

// Hook Debounce đơn giản
const useDebounce = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
};

const MovieSearch: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('Avengers');
    const [results, setResults] = useState<MovieSearchResult[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const debouncedSearchTerm = useDebounce(searchTerm, 500); 

    const fetchMovies = useCallback(async (query: string) => {
        if (!query.trim() || OMDB_API_KEY === 'YOUR_OMDB_API_KEY') {
            setResults([]);
            if (OMDB_API_KEY === 'YOUR_OMDB_API_KEY') {
                setError("Vui lòng thay thế YOUR_OMDB_API_KEY bằng API Key thực tế.");
            }
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const response = await axios.get<SearchResponse>(`${API_BASE_URL}&s=${query}`);
            
            if (response.data.Response === "True" && response.data.Search) {
                setResults(response.data.Search.filter(m => m.Poster !== 'N/A' && m.Type === 'movie'));
            } else {
                setResults([]);
                setError(response.data.Error || `Không tìm thấy phim với từ khóa "${query}"`);
            }
        } catch (err) {
            setError("Lỗi kết nối API OMDb.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchMovies(debouncedSearchTerm);
    }, [debouncedSearchTerm, fetchMovies]);

    return (
        <div style={{ padding: '20px' }}>
            <h2>Bài 3: Ứng dụng Tìm kiếm Phim</h2>
            
            <input
                type="text"
                placeholder="Nhập tên phim..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={inputStyle}
            />

            {loading && <p>Đang tìm kiếm...</p>}
            {error && <p style={{ color: 'red' }}>Lỗi: {error}</p>}

            <div style={gridStyle}>
                {!loading && results.map(movie => (
                    <MovieCard key={movie.imdbID} movie={movie} />
                ))}
            </div>

            {!loading && results.length === 0 && !error && searchTerm.trim() && (
                <p>Không tìm thấy kết quả phù hợp.</p>
            )}
        </div>
    );
};

export default MovieSearch; // FIX: Đảm bảo export default

// CSS đơn giản
const inputStyle: React.CSSProperties = { padding: '10px', marginBottom: '25px', width: '400px', borderRadius: '4px', border: '1px solid #ccc' };
const gridStyle: React.CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px', };