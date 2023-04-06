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
            <Link to="/dashboard">Dashboard</Link>
          </div>

          
          {isAuthenticated &&
          <div className="user">
          <Link to="/search">Search</Link>
          <Link to="/create">Upload</Link>
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