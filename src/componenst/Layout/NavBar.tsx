// src/components/Layout/NavBar.tsx

import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavBar: React.FC = () => {
    const location = useLocation();
    const isActive = (path: string) => location.pathname.startsWith(path);

    const navItemStyle: React.CSSProperties = { padding: '10px 15px', textDecoration: 'none', color: 'white', fontWeight: 'bold', };
    const activeStyle: React.CSSProperties = { backgroundColor: '#0056b3', };

    return (
        <nav style={{ backgroundColor: '#007bff', padding: '10px 0' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <Link to="/" style={navItemStyle}>Trang chủ</Link>
                <Link 
                    to="/bai1" 
                    style={{ ...navItemStyle, ...(isActive('/bai1') ? activeStyle : {}) }}
                >
                    Bài 1
                </Link>
                <Link 
                    to="/bai2" 
                    style={{ ...navItemStyle, ...(isActive('/bai2') ? activeStyle : {}) }}
                >
                    Bài 2
                </Link>
                <Link 
                    to="/bai3" 
                    style={{ ...navItemStyle, ...(isActive('/bai3') ? activeStyle : {}) }}
                >
                    Bài 3
                </Link>
            </div>
        </nav>
    );
};

export default NavBar; // FIX: Đảm bảo export default