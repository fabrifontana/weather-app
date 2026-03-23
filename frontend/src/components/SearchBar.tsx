import { useState } from "react";
import '../styles/SearchBar.css'

interface SearchBarProps {
  onSearch: (city: string) => void
}

export default function SearchBar({ onSearch }: SearchBarProps) {
    const [city, setCity] = useState('');
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (city){
            onSearch(city);
            setCity('');
        }
    }

    return (
        <form onSubmit={handleSubmit} className="search-bar">
            <span className="search-icon">🔍</span>
            <input
                type="text"
                placeholder="Buenos Aires"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="search-input"
                required
            />
        </form>
    )
}