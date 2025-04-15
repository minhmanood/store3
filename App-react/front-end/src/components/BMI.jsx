// src/BMICalculator.js

import React, { useState } from 'react';
import'../assets/css.css'
const BMICalculator = () => {
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [bmi, setBmi] = useState(null);
    const [size, setSize] = useState('');
    const [showCalculator, setShowCalculator] = useState(false); // Trạng thái để kiểm soát hiển thị

    const calculateBMI = () => {
        const weightInKg = parseFloat(weight);
        const heightInMeters = parseFloat(height);

        if (weightInKg > 0 && heightInMeters > 0) {
            const bmiValue = (weightInKg / (heightInMeters * heightInMeters)).toFixed(2);
            setBmi(bmiValue);

            if (bmiValue < 18.5) {
                setSize('Size S (Gầy)');
            } else if (bmiValue < 24.9) {
                setSize('Size M (Bình Thường)');
            } else if (bmiValue < 29.9) {
                setSize('Size L (Thừa Cân)');
            } else {
                setSize('Size XL (Béo Phì)');
            }
        } else {
            setBmi(null);
            setSize('');
        }
    };

    return (
        <div className='bmi-calculator'>
            <button 
                className='bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors'
                onClick={() => setShowCalculator(!showCalculator)}
            >
                {showCalculator ? 'Ẩn' : 'Hướng dẫn chọn size'}
            </button>

            {showCalculator && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
                    <div className='bg-white p-6 rounded-lg shadow-lg max-w-md w-full'>
                        <div className='flex justify-between items-center mb-4'>
                            <h2 className='text-xl font-bold'>Tính BMI</h2>
                            <button 
                                onClick={() => setShowCalculator(false)}
                                className='text-gray-500 hover:text-black'
                            >
                                ✕
                            </button>
                        </div>
                        
                        <div className='space-y-4'>
                            <label className='block'>
                                Cân nặng (kg):
                                <input
                                    type="number"
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                    placeholder="Nhập cân nặng"
                                    className='w-full p-2 border rounded mt-1'
                                />
                            </label>
                            <label className='block'>
                                Chiều cao (m):
                                <input
                                    type="number"
                                    value={height}
                                    onChange={(e) => setHeight(e.target.value)}
                                    placeholder="Nhập chiều cao"
                                    className='w-full p-2 border rounded mt-1'
                                />
                            </label>
                            <button 
                                className='bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors w-full'
                                onClick={calculateBMI}
                            >
                                Tính BMI
                            </button>

                            {bmi !== null && (
                                <div className='mt-4 p-4 bg-gray-100 rounded'>
                                    <h3 className='font-medium'>Chỉ số BMI của bạn là: {bmi}</h3>
                                    <p className='mt-1'>Bạn nên chọn: {size}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BMICalculator;