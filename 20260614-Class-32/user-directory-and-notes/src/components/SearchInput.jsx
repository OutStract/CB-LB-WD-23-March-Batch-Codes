import { useRef } from 'react';
import { useKeyboardShortcut } from '../useKeyboardShortcut';

function SearchInput({ searchTerm, onSearchChange }) {
    const inputRef = useRef(null);

    function handleClear() {
        onSearchChange('');
        inputRef.current.focus();
    }

    useKeyboardShortcut('a', () => {
        console.log("use Keyboard pressed..!");
        alert('A key pressed..!');
    })

    return (
        <div>
            <input 
                ref={inputRef}
                type="text" 
                placeholder="Search users by name or email"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
            />
            <button
                onClick={handleClear}
            >
                x Clear
            </button>
        </div>
    );
}

export default SearchInput;