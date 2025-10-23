// src/components/Bai3_Phim/MovieCard.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { MovieSearchResult } from '../../types/Movie';

interface MovieCardProps {
    movie: MovieSearchResult;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
    return (
        <Link to={`/bai3/${movie.imdbID}`} style={cardStyle}>
            <img 
                src={movie.Poster} 
                alt={movie.Title} 
                style={posterStyle} 
                onError={(e) => { 
                    e.currentTarget.src = 'https://via.placeholder.com/200x300?text=No+Poster';
                }}
            />
            <div style={infoStyle}>
                <h3 style={titleStyle}>{movie.Title}</h3>
                <p>Năm: {movie.Year}</p>
                <p style={{ color: '#007bff' }}>Xem chi tiết &raquo;</p>
            </div>
        </Link>
    );
};

export default MovieCard; // FIX: Đảm bảo export default

// CSS đơn giản
const cardStyle: React.CSSProperties = { border: '1px solid #ddd', borderRadius: '8px', textDecoration: 'none', color: 'inherit', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', overflow: 'hidden', transition: 'transform 0.2s', display: 'block', textAlign: 'center' };
const posterStyle: React.CSSProperties = { width: '100%', height: 'auto', maxHeight: '300px', objectFit: 'cover' };
const infoStyle: React.CSSProperties = { padding: '10px' };
const titleStyle: React.CSSProperties = { fontSize: '1.1em', marginBottom: '5px', height: '2.2em', overflow: 'hidden' };