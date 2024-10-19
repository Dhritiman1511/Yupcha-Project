import React, { useState, useEffect } from 'react';

const ThemeToggle = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        >
            {theme === 'light' ? (
                // New Moon SVG Icon for Light Mode
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                    <path d="M479.9-111.52q-153.49 0-260.93-107.45Q111.52-326.41 111.52-479.9t107.47-261.32Q326.47-849.04 480-849.04q12.3 0 24.67.71 12.37.72 24.24 2.72-34.21 31.26-55.04 74.65t-20.83 92.87q0 94.01 66.14 159.81 66.13 65.8 160.6 65.8 49.35 0 92.52-20.54 43.18-20.55 73.87-54.76 1.44 11.87 2.16 23.51.71 11.63.71 23.7 0 153.4-107.82 261.22Q633.39-111.52 479.9-111.52Zm.1-106q73.3 0 134.26-37.2 60.96-37.19 93.52-98.8-14.35 2.74-28.69 4.04-14.35 1.31-28.13.18-120.74-9.61-205.83-93.29-85.09-83.67-95.83-208.93-.56-13.78.46-28.13t4.33-28.13q-61.05 33.13-98.81 94.09-37.76 60.95-37.76 133.69 0 108.74 76.87 185.61 76.87 76.87 185.61 76.87Zm-17.35-245.13Z"/>
                </svg>
            ) : (
                // New Sun SVG Icon for Dark Mode
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                    <path d="M480.07-386q39.19 0 66.56-27.44Q574-440.87 574-480.07q0-39.19-27.44-66.56Q519.13-574 479.93-574q-39.19 0-66.56 27.44Q386-519.13 386-479.93q0 39.19 27.44 66.56Q440.87-386 480.07-386ZM480-280q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM213-427H27v-106h186v106Zm720 0H747v-106h186v106ZM427-747v-186h106v186H427Zm0 720v-186h106v186H427ZM255.43-630.78 136.91-745.87l74.52-78.22 115.22 116.96-71.22 76.35Zm493.14 494.87L632.35-253.87 704-328.09l119.09 113.96-74.52 78.22ZM631.91-704l113.96-119.09 78.22 74.52-116.96 115.22L631.91-704Zm-496 492.57 117.96-116.22L328.09-256 214.13-136.91l-78.22-74.52ZM480-480Z"/>
                </svg>
            )}
        </button>
    );
};

export default ThemeToggle;
