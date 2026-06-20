import { Link, NavLink } from 'react-router-dom'

function Navbar() {
    function linkClass ({isActive}) {
        return isActive ? 'nav-link active' : 'nav-link'
    }
    return (
        <nav className='navbar'>
            <style>{`
                .navbar {
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    padding: 14px 24px;
                    background: #1a1717;
                    color: #fff;
                }
                .navbar .brand {
                    font-size: 20px;
                    font-weight: 700;
                    color: #ffd166;
                    text-decoration: none;
                }
                .navbar .nav-link {
                    color: white;
                    text-decoration: none;
                    font-weight: 500;
                }
                .navbar .nav-link:hover {color: #ffd166}
                .navbar .nav-link.active {
                    color: #ffd166;
                    border-bottom: 2px solid #ffd166;
                }
            `}</style>

            <Link to="/" className='brand'>🍴 Tasty</Link>
            <NavLink to="/" end className={linkClass}>Home</NavLink>
            <NavLink to="/browse" className={linkClass}>Browse</NavLink>
        </nav>
    )
}

export default Navbar;