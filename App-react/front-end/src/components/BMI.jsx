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
        <div className='bmi-calculator '>
            <button className='' onClick={() => setShowCalculator(!showCalculator)}>
                {showCalculator ? 'Ẩn ' : 'Hướng dẫn chọn size'}
            </button>

            {showCalculator && (
                <div>
                    <h2>Tính BMI</h2>
                    <label>
                        Cân nặng (kg):
                        <input
                            type="number"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            placeholder="Nhập cân nặng"
                        />
                    </label>
                    <label>
                        Chiều cao (m):
                        <input
                            type="number"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            placeholder="Nhập chiều cao"
                        />
                    </label>
                    <button className='ms-1 mb-2' onClick={calculateBMI}>Tính BMI</button>
                    

                    {bmi !== null && (
                        <div>
                            <h3>Chỉ số BMI của bạn là: {bmi}</h3>
                            <p>Bạn nên chọn: {size}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default BMICalculator;