import React, { useState } from 'react';
import './SearchBar.css';
import d from "../../Assets/360_F_558272798_DNqj4q2TXE7EsDM9Zp2wdyap8gzatwlF.webp";

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        // Handle search logic here
    };

    return (
        <div className="search-bar">
            <input 
                type="text" 
                placeholder="Search..." 
                value={searchQuery} 
                onChange={handleSearch} 
            />
            <button onClick={() => console.log("Search clicked!")}>
                
                <img src={d} alt="Search" />
            </button>
        </div>
    );
}

export default SearchBar;
