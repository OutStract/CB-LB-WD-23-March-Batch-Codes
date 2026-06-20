import { useState, useEffect, useRef } from 'react';
import SearchInput from './SearchInput';
import useKeyboardShortcut from '../useKeyboardShortcut';

// 1. state for data, loading, error
// 2. useEffect with [] - fetch on mount
// 3. Conditional Rendering - show loading, error, or data.

function UserDirectory() {
    // Step 1: Three pieces of state for any api.
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    // Theme state
    const [darkMode, setDarkMode] = useState(false);

    // Search state
    const [searchTerm, setSearchTerm] = useState('');
    const searchInputRef = useRef(null);

    // favorite state
    const [favoriteList, setFavoriteList] = useState([2]);

    // Step 2: Fetch data on mount
    useEffect(() => {
        async function fetchUsers() {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch('https://jsonplaceholder.typicode.com/users');

                if (!response && !response.ok) {
                    throw new Error("HTTP ERROR: Could not reach the API endpoint.");
                }

                // We know that this API endpoint always returns an array.
                const data = await response.json();
                setUsers(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchUsers();
    }, []);

    useKeyboardShortcut('/', () => {
        console.log("Focus set to the search field");
        searchInputRef.current.focus();
    })

    // const handleFavouriteCheck = (id) => {
    //     console.log("Handle Favorite Triggered.", favoriteList);
    //     if (getFavorite(id)) {
    //         favoriteList.filter(item => item != id);
    //     } else {
    //         favoriteList.push(id);
    //     }

    //     // if(getFavorite(id)) {
    //     //     const list = favoriteList.filter(favorite => favorite != id);
    //     //     setFavoriteList(list);
    //     // } else {
    //     //     if (favoriteList) {
    //     //         const list = [...favoriteList.values];
    //     //         console.log("setFavorite else block", list);
    //     //         list.push(id);
    //     //     }
    //     //     setFavoriteList(list);
    //     // }
    // }

    // const getFavorite = (id) => {
    //     return favoriteList.includes(id);
    // }

    // Step 3: Conditionally rendering the UI.
    if (loading) {
        return (
            <div>
                ⌛Loading users...
            </div>
        )
    }

    if (error) {
        // TODO: add some navigation from error page to some other page.
        return (
            <div>
                <h2>❌ Something went wrong.</h2>
                <p>{error}</p>
            </div>
        )
    }

    const filteredUsers = users.filter(user => {
        localStorage.setItem('filteredUser', user.id);
        return user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.company.name.toLowerCase().includes(searchTerm.toLowerCase())
    })

    const theme = {
    bg: darkMode ? '#333' : '#fff',
    text: darkMode ? '#fff' : '#333',
  }

    return (
        <div>
            <div>
                <input
                    ref={searchInputRef}
                    type="text"
                    placeholder='🔍 Search users...'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            {searchTerm !== '' && <p>Showing {filteredUsers.length} of {users.length} users</p>}
            {searchTerm !== '' && (
                <div>
                    {filteredUsers.map(user => (
                        <div key={user.id} style={{ border: `1px solid ${theme.text}`, padding: '10px', margin: '10px', borderRadius: '5px' }}>
                            <h2>{user.name}</h2>
                            <p>{user.email}</p>
                            <p>Company: {user.company.name}</p>
                        </div>
                    ))}
                </div>)}
            {filteredUsers.length === 0 && searchTerm !== '' && <p>No users found.</p>}
        </div>
    )
}

export default UserDirectory;
