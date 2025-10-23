// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Component dùng chung (Đã import đúng)
import NavBar from './componenst/Layout/NavBar'; 

// Component Bài 1 (Đã import đúng)
import CountryList from './componenst/Bai1_QuocGia/CountryList';
import CountryDetail from './componenst/Bai1_QuocGia/CountryDetail';

// Component Bài 2 (Đã import đúng)
import CurrencyConverter from './componenst/Bai2_TienTe/CurrencyConverter';

// Component Bài 3 (Đã import đúng)
// LƯU Ý: Nếu bạn vẫn giữ tên file là MovieList.tsx, hãy đổi thành import MovieList from './components/Bai3_Phim/MovieList';
import MovieSearch from './componenst/Bai3_Phim/MovieSearch'; 
import MovieDetail from './componenst/Bai3_Phim/MovieDetail';


const App: React.FC = () => {
    return (
        <Router>
            <NavBar />
            
            <div className="content">
                <Routes>
                    <Route path="/" element={<div style={{ padding: '20px' }}>Chọn Bài 1, Bài 2 hoặc Bài 3 để bắt đầu!</div>} />
                    
                    {/* Bài 1: Tra cứu Quốc gia */}
                    <Route path="/bai1" element={<CountryList />} />
                    <Route path="/bai1/:countryName" element={<CountryDetail />} /> 

                    {/* Bài 2: Quy đổi Tiền tệ */}
                    <Route path="/bai2" element={<CurrencyConverter />} />

                    {/* Bài 3: Tìm kiếm Phim */}
                    <Route path="/bai3" element={<MovieSearch />} />
                    <Route path="/bai3/:imdbID" element={<MovieDetail />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;