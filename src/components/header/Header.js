import React from 'react'; 
import '../header/Header.css'
import { Link } from 'react-router-dom'

class Header extends React.Component {
    render() {
        return (
            <header>
                <nav>
                    <ul>
                        <li>Sign Up</li>
                        <li><Link to="/login">Login</Link></li>
                    </ul>
                </nav>
            </header> 
        )
    }
}

export default Header
