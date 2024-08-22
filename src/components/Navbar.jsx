import React, { useState, useEffect } from 'react';

const Navbar = () => {
    const [darkMode, setDarkMode] = useState(false);

    // Toggle dark mode
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    // Apply dark mode class to the body element
    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }, [darkMode]);

    return (
        <nav className={`flex justify-between py-2 ${darkMode ? 'bg-gray-800' : 'bg-green-800'} text-white`}>
            <div className="logo">
                <span className='font-bold text-xl mx-8'>Todo</span>
            </div>
            <ul className='flex gap-8 mx-9'>
                <li className='cursor-pointer hover:font-bold transition-all duration-75'>Home</li>
                <li 
                    className='cursor-pointer hover:font-bold transition-all duration-75' 
                    onClick={toggleDarkMode}
                >
                    {darkMode ? 'Light Mode' : 'Dark Mode'}
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
