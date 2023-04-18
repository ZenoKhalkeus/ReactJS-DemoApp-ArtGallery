import "./Header.css"

import { Link } from 'react-router-dom'
import { useAuthContext } from '../../contexts/AuthContext'


export const Header = () => {

    const {isAuthenticated, userEmail } = useAuthContext()
    return (
        <header>
            <a id="logo" href="/">
            <img id="logo-img" src="/images/logo.png" alt=""/>
        </a>

        <span className="greeting">Welcome, {!isAuthenticated && "Guest!"}{isAuthenticated && `${userEmail}!`}</span>
        <nav>
          <div>
            <Link to="/dashboard">
            <div className="dropdown">Dashboard
                    <div class="dropdown-content">
                    <Link to="/dashboard">Artworks</Link>
                    <Link to="/jobdashboard">Job offers</Link>
                    </div>
                </div>
            </Link>
          </div>

          
          {isAuthenticated &&
          <div className="user">
          <Link to="/search" className="search">Search</Link>
          <Link to="/create">
          <div className="dropdown">Upload
                    <div class="dropdown-content">
                    <Link to="/create">Artwork</Link>
                    <Link to="/createJob">Job offer</Link>
                    </div>
                </div>
          </Link>
          <Link to="/collection">Collection</Link>
          <Link to="/logout">Logout</Link>
        </div>
          }
          
          {!isAuthenticated &&
            <div className="guest">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            </div>
          }
        </nav>
        </header>
    )

}