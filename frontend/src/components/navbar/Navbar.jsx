import React, { useContext } from 'react'
import './navbar.css'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext)

  return (
    <div className='navbar'>
      <div className='navContainer'>
        <Link to='/' style={{ color: 'inherit', textDecoration: 'none' }}>
          <span className='logo'>BookNStay</span>
        </Link>
        {user ? (
          <div className='navItems'>
            {user.username}
            <button
              className='navButton'
              onClick={() => dispatch({ type: 'LOGOUT' })}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className='navItems'>
            <button className='navButton'>Register</button>
            <Link
              to='/login'
              style={{ color: 'inherit', textDecoration: 'none' }}
            >
              {' '}
              <button className='navButton'>Login</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
