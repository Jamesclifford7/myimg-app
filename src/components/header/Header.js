import React from 'react'; 
import '../header/Header.css'
import { Link } from 'react-router-dom'

class Header extends React.Component {
    constructor() {
        super(); 
        this.state = {
            showMenu: false
        }
    }

    toggleMenu = (event) => {
        event.preventDefault(); 
        this.setState(prevState => ({
            showMenu: !prevState.showMenu
        })); 
    }

    handleHome = (event) => {
        this.setState({
            showMenu: false
        }); 
        this.props.history.push(`/profile/${this.props.user.username}`); 
    }

    handleUpload = (event) => {
        this.setState({
            showMenu: false
        }); 
        this.props.history.push('/upload')
    }

    handleEditProfile = (event) => {
        this.setState({
            showMenu: false
        }); 
        this.props.history.push('/editprofile')
    }

    render() {
        return (
            <header>
                {
                    this.props.user
                    ? <h3><Link to={`/profile/${this.props.user.username}`}>MyImg</Link></h3>
                    : <h3><Link to='/'>MyImg</Link></h3>
                }
                <nav>
                    {
                        this.props.user
                        ? <ul>
                            <li><button onClick={event => this.toggleMenu(event)}><img src="https://cdn3.iconfinder.com/data/icons/mini-icon-set-general-office/91/General_-_Office_30-512.png" alt="menu bars" /></button></li>
                            {
                                this.state.showMenu
                                ? <li className="dropdown">
                                    <div className="dropdown-container">
                                        <button onClick={event => this.handleHome(event)}>Home</button>
                                        <button onClick={event => this.handleUpload(event)}>Upload</button>
                                        <button onClick={event => this.handleEditProfile(event)}>Edit Profile</button>
                                        <button onClick={event => this.props.handleLogout(event)}>Logout</button>

                                        {/* <Link to="/profile">Home</Link>
                                        <Link>Upload</Link>
                                        <Link>Edit Profile</Link>
                                        <Link>Logout</Link> */}
                                    </div>
                                </li>
                                : null
                            }
                        </ul>
                        : <ul>
                            <li><Link to="/signup">Sign Up</Link></li>
                            <li><Link to="/login">Login</Link></li>
                        </ul>
                    }
                </nav>
            </header> 
        )
    }
}

export default Header


