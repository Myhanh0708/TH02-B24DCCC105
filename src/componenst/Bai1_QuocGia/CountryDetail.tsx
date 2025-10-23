// src/components/Bai1_QuocGia/CountryDetail.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Country } from '../../types/Country'; // FIX: Sửa lỗi đường dẫn TS2307

const CountryDetail: React.FC = () => { // FIX: Không nhận Props
    const { countryName } = useParams<{ countryName: string }>();
    const navigate = useNavigate();

    const [country, setCountry] = useState<Country | null>(null); 
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDetail = async () => {
            if (!countryName) return;
            const decodedName = decodeURIComponent(countryName); 
            
            try {
                const API_URL = `https://restcountries.com/v3.1/name/${decodedName}?fullText=true`;
                const response = await axios.get<Country[]>(API_URL);
                
                if (response.data && response.data.length > 0) {
                    setCountry(response.data[0]);
                } else {
                    setError(`Không tìm thấy dữ liệu cho ${decodedName}`);
                }
                setLoading(false);
            } catch (err) {
                setError(`Lỗi khi tải dữ liệu chi tiết của ${decodedName}.`);
                setLoading(false);
            }
        };

        fetchDetail();
    }, [countryName]);

    if (loading) return <div style={{ padding: '20px' }}>Đang tải chi tiết...</div>;
    if (error) return <div style={{ padding: '20px', color: 'red' }}>Lỗi: {error}</div>;
    if (!country) return <div style={{ padding: '20px' }}>Không tìm thấy quốc gia.</div>;

    return (
        <div style={{ padding: '20px' }}>
            <button onClick={() => navigate(-1)} style={backButtonStyle}>
                &larr; Quay lại danh sách
            </button>

            <h1 style={{ marginBottom: '10px' }}>{country.name.common}</h1>
            <p>Tên chính thức: **{country.name.official}**</p>
            <img src={country.flags.png} alt={`Cờ ${country.name.common}`} style={detailFlagStyle} />
            
            <div style={{ marginTop: '30px' }}>
                <p><strong>Dân số:</strong> {country.population.toLocaleString()}</p>
                <p><strong>Châu lục:</strong> {country.region}</p>
                <p><strong>Vùng:</strong> {country.subregion}</p>
                <p><strong>Thủ đô:</strong> {country.capital ? country.capital.join(', ') : 'N/A'}</p>
            </div>
        </div>
    );
};

export default CountryDetail; // FIX: Đảm bảo export default

const backButtonStyle: React.CSSProperties = { padding: '8px 15px', backgroundColor: '#f0f0f0', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer', marginBottom: '20px', };
const detailFlagStyle: React.CSSProperties = { width: '200px', border: '1px solid #ccc', marginTop: '10px' };