// src/components/Bai1_QuocGia/CountryList.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Country } from '../../types/Country';
import { Link } from 'react-router-dom';

const CountryList: React.FC = () => { // FIX: Không nhận Props
    const [countries, setCountries] = useState<Country[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const API_URL = 'https://restcountries.com/v3.1/all?fields=name,flags,population,region,subregion,capital';
                const response = await axios.get<Country[]>(API_URL);
                setCountries(response.data);
                setLoading(false);
            } catch (err) {
                setError("Không thể tải dữ liệu quốc gia.");
                setLoading(false);
            }
        };
        fetchCountries();
    }, []);

    const filteredCountries = countries.filter(country =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div style={{ padding: '20px' }}>Đang tải dữ liệu...</div>;
    if (error) return <div style={{ padding: '20px', color: 'red' }}>Lỗi: {error}</div>;

    return (
        <div style={{ padding: '20px' }}>
            <h2>Bài 1: Ứng dụng Tra cứu Quốc gia</h2>
            
            <input
                type="text"
                placeholder="Tìm quốc gia..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ padding: '10px', marginBottom: '25px', width: '300px', borderRadius: '4px', border: '1px solid #ccc' }}
            />

            <div style={gridStyle}>
                {filteredCountries.map((country) => (
                    <Link 
                        to={`/bai1/${encodeURIComponent(country.name.common)}`} 
                        key={country.name.common} 
                        style={cardStyle}
                    >
                        <img src={country.flags.png} alt={`Cờ ${country.name.common}`} style={flagStyle} />
                        <h3>{country.name.common}</h3>
                        <p style={{ margin: '5px 0' }}>Khu vực: **{country.region}**</p>
                        <p style={{ margin: '5px 0' }}>Dân số: **{country.population.toLocaleString()}**</p>
                        <span style={linkStyle}>Xem chi tiết &raquo;</span>
                    </Link>
                ))}
            </div>
            
            {filteredCountries.length === 0 && !loading && <p>Không tìm thấy quốc gia nào.</p>}
        </div>
    );
};

export default CountryList; // FIX: Đảm bảo export default

// CSS đơn giản
const gridStyle: React.CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px', };
const cardStyle: React.CSSProperties = { border: '1px solid #ddd', borderRadius: '8px', padding: '15px', textAlign: 'center', textDecoration: 'none', color: 'inherit', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', transition: 'transform 0.2s', };
const flagStyle: React.CSSProperties = { width: '100px', height: 'auto', marginBottom: '10px', border: '1px solid #f0f0f0' };
const linkStyle: React.CSSProperties = { display: 'inline-block', marginTop: '10px', color: '#007bff', fontWeight: 'bold', };