// src/components/Bai2_TienTe/CurrencyConverter.tsx

import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { RateData } from '../../types/RateData';

const BASE_CURRENCY = 'USD';
const API_URL = `https://open.er-api.com/v6/latest/${BASE_CURRENCY}`;

const CurrencyConverter: React.FC = () => { // FIX: Không nhận Props
    const [ratesData, setRatesData] = useState<RateData | null>(null);
    const [amount, setAmount] = useState<string>('1');
    const [fromCurrency, setFromCurrency] = useState<string>(BASE_CURRENCY);
    const [toCurrency, setToCurrency] = useState<string>('VND');
    const [result, setResult] = useState<number | null>(null); 
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRates = async () => {
            try {
                const response = await axios.get<RateData>(API_URL);
                setRatesData(response.data);
                setLoading(false);
                handleConvert(response.data, '1', BASE_CURRENCY, 'VND'); 
            } catch (err) {
                setError("Không thể tải dữ liệu tỉ giá hối đoái.");
                setLoading(false);
            }
        };
        fetchRates();
    }, []);

    const calculateConversion = (rates: { [key: string]: number }, inputAmount: number, from: string, to: string) => {
        if (!rates[from] || !rates[to]) return null;
        
        const rateFromToBase = rates[from]; 
        const rateBaseToTo = rates[to]; 

        return (inputAmount * rateBaseToTo) / rateFromToBase;
    };
    
    const handleConvert = (
        data: RateData = ratesData!, 
        inputAmountStr: string = amount, 
        from: string = fromCurrency, 
        to: string = toCurrency
    ) => {
        if (!data) return;

        const inputAmount = Number(inputAmountStr);
        if (isNaN(inputAmount) || inputAmount <= 0) {
            setResult(null);
            alert("Vui lòng nhập số tiền hợp lệ.");
            return;
        }

        const convertedResult = calculateConversion(data.rates, inputAmount, from, to);
        setResult(convertedResult);
    };

    const currencyCodes = useMemo(() => {
        return ratesData ? Object.keys(ratesData.rates).sort() : [];
    }, [ratesData]);

    if (loading) return <div style={{ padding: '20px' }}>Đang tải dữ liệu tỉ giá...</div>;
    if (error) return <div style={{ padding: '20px', color: 'red' }}>Lỗi: {error}</div>;

    return (
        <div style={{ padding: '20px', maxWidth: '1000px', margin: 'auto' }}>
            <h2>Bài 2: Quy đổi Tiền tệ</h2>
            
            <div style={inputContainerStyle}>
                
                <div style={inputGroupStyle}>
                    <span style={labelStyle}>Đơn vị gốc:</span>
                    <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)} style={selectStyle}>
                        {currencyCodes.map(code => (
                            <option key={code} value={code}>{code}</option>
                        ))}
                    </select>
                </div>
                
                <div style={inputGroupStyle}>
                    <span style={labelStyle}>Đơn vị đích:</span>
                    <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)} style={selectStyle}>
                        {currencyCodes.map(code => (
                            <option key={code} value={code}>{code}</option>
                        ))}
                    </select>
                </div>

                <div style={inputGroupStyle}>
                    <span style={labelStyle}>Số tiền:</span>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        min="0"
                        style={textInputStyle}
                    />
                </div>

                <button onClick={() => handleConvert()} style={buttonStyle}>
                    Quy đổi
                </button>
            </div>

            {result !== null && (
                <div style={resultStyle}>
                    <p style={{ margin: 0, fontSize: '1.2em' }}>
                        **{Number(amount).toLocaleString()} {fromCurrency}** tương đương với 
                        <span style={{ fontWeight: 'bold', color: '#0056b3', marginLeft: '10px' }}>
                            {result.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })} {toCurrency}
                        </span>
                    </p>
                    <p style={{ fontSize: '0.8em', color: '#666', marginTop: '5px' }}>
                        Cập nhật cuối: {ratesData?.time_last_update_utc || 'N/A'}
                    </p>
                </div>
            )}
        </div>
    );
};

export default CurrencyConverter; // FIX: Đảm bảo export default

// --- CSS Styles ---
const inputContainerStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: '20px', padding: '20px', backgroundColor: '#f8f8f8', border: '1px solid #eee', borderRadius: '4px', };
const inputGroupStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: '5px', };
const labelStyle: React.CSSProperties = { color: '#333', fontWeight: 'normal', whiteSpace: 'nowrap', };
const selectStyle: React.CSSProperties = { padding: '8px 10px', borderRadius: '4px', border: '1px solid #ccc', minWidth: '70px', };
const textInputStyle: React.CSSProperties = { padding: '8px 10px', borderRadius: '4px', border: '1px solid #ccc', width: '80px', };
const buttonStyle: React.CSSProperties = { padding: '8px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', transition: 'background-color 0.2s', };
const resultStyle: React.CSSProperties = { padding: '15px', backgroundColor: '#e9f7ff', border: '1px solid #007bff', borderRadius: '5px', marginTop: '20px', };