// src/components/Bai3_Phim/MovieDetail.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { MovieDetailData } from '../../types/Movie';

const OMDB_API_KEY = 'YOUR_OMDB_API_KEY'; 
const API_BASE_URL = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}`;

const MovieDetail: React.FC = () => {
    const { imdbID } = useParams<{ imdbID: string }>(); 
    const navigate = useNavigate();

    const [movie, setMovie] = useState<MovieDetailData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDetail = async () => {
            if (!imdbID) return;
            
            setLoading(true);
            setError(null);
            try {
                const API_URL = `${API_BASE_URL}&i=${imdbID}&plot=full`; 
                const response = await axios.get<MovieDetailData>(API_URL);
                
                if (response.data.Response === "True") {
                    setMovie(response.data);
                } else {
                    setError(response.data.Error || "Không tìm thấy chi tiết phim.");
                }
            } catch (err) {
                setError("Lỗi kết nối khi tải chi tiết phim.");
            } finally {
                setLoading(false);
            }
        };

        fetchDetail();
    }, [imdbID]);

    if (loading) return <div style={{ padding: '20px' }}>Đang tải chi tiết phim...</div>;
    if (error) return <div style={{ padding: '20px', color: 'red' }}>Lỗi: {error}</div>;
    if (!movie) return <div style={{ padding: '20px' }}>Không tìm thấy dữ liệu.</div>;

    return (
        <div style={detailContainerStyle}>
            <button onClick={() => navigate(-1)} style={backButtonStyle}>
                &larr; Quay lại tìm kiếm
            </button>

            <h1>{movie.Title} ({movie.Year})</h1>
            <div style={contentLayout}>
                <img src={movie.Poster} alt={movie.Title} style={posterDetailStyle} />
                <div style={infoDetailStyle}>
                    <p><strong>Đánh giá:</strong> {movie.Rated}</p>
                    <p><strong>Ngày phát hành:</strong> {movie.Released}</p>
                    <p><strong>Thời lượng:</strong> {movie.Runtime}</p>
                    <p><strong>Thể loại:</strong> {movie.Genre}</p>
                    <p><strong>Đạo diễn:</strong> {movie.Director}</p>
                    
                    <h3 style={{ marginTop: '20px' }}>Tóm tắt:</h3>
                    <p>{movie.Plot}</p>
                </div>
            </div>
        </div>
    );
};

export default MovieDetail; // FIX: Đảm bảo export default

// CSS đơn giản
const detailContainerStyle: React.CSSProperties = { padding: '20px', maxWidth: '1000px', margin: 'auto', };
const backButtonStyle: React.CSSProperties = { padding: '8px 15px', backgroundColor: '#f0f0f0', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer', marginBottom: '20px', };
const contentLayout: React.CSSProperties = { display: 'flex', gap: '30px', marginTop: '20px' };
const posterDetailStyle: React.CSSProperties = { width: '250px', height: 'auto', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' };
const infoDetailStyle: React.CSSProperties = { flex: 1, };