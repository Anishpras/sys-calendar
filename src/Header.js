import React, { useEffect, useRef } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import { auth } from './firebase.utils';
import { LOGIN_ACTION, LOGOUT_ACTION } from './store/reducers/user';
import { SHOW_MODAL } from './store/reducers/showLoginModal';
import './Header.css';

const Header = ({
  location,
  history,
  enqueueSnackbar,
}) => {
  const dispatch = useDispatch();
  const navbarRef = useRef();

  const user = useSelector((state) => state.user);

  // white background of navbar in small screen
  const isShowing = () => {
    const collapse = document.querySelector('.navbar-collapse');
    collapse.classList.toggle('bg-light');
  };

  // change navbar color on scroll
  const navbarStyleListener = () => {
    if (window.location.pathname === '/' && window.scrollY < 90) {
      navbarRef.current.className = 'navbar fixed-top navbar-expand-lg navbar-light';
    } else {
      navbarRef.current.className = 'bg-light shadow navbar fixed-top navbar-expand-lg navbar-light';
    }
  };

  const localStorageUpdated = () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const { email, displayName, emailVerified, uid } = currentUser;
      dispatch(LOGIN_ACTION({ displayName, email, emailVerified, uid }));
    } else {
      dispatch(LOGOUT_ACTION());
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', navbarStyleListener);
    window.addEventListener('storage', localStorageUpdated);
    auth.onAuthStateChanged((user) => {
      if (user) {
        const { email, displayName, emailVerified, uid } = user;
        dispatch(LOGIN_ACTION({ displayName, email, emailVerified, uid }));
      } else {
        dispatch(LOGOUT_ACTION());
      }
    });
    return () => {
      window.removeEventListener('scroll', navbarStyleListener);
      window.removeEventListener('storage', localStorageUpdated);
    };
  }, []);

  useEffect(() => {
    navbarStyleListener();
  }, [location]);

  const logout = () => {
    auth.signOut().then(() => {
      history.push('/');
    });
  };

  return (
    <div className="Header">
      <nav ref={navbarRef}>
        <Link className="navbar-brand" to="/">
          RAAHEE
          <hr />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={isShowing}
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink
                activeClassName="selected"
                className="nav-link navsize"
                exact
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                activeClassName="selected"
                className="nav-link navsize"
                to="/event"
              >
                Events
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                activeClassName="selected"
                className="nav-link navsize"
                to="/blog"
              >
                Blogs
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                activeClassName="selected"
                className="nav-link navsize"
                to="/activities"
              >
                Activities
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                activeClassName="selected"
                className="nav-link navsize"
                to="/therapists"
              >
                Therapists
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                activeClassName="selected"
                className="nav-link navsize pr-3"
                to="/community"
              >
                Community
              </NavLink>
            </li>
          </ul>
          <div className="vertical" />
          <ul className="navbar-nav user mx-lg-4">
            {!user && (
            <li className="nav-item">
              <button
                type="button"
                className="btn btn-secondary text-capitalize px-4"
                id="login-button"
                onClick={() => dispatch(SHOW_MODAL())}
              >
                Sign In
              </button>
            </li>
            )}
            {user && (
            <li
              className="nav-item dropdown"
              id="user-dropdown"
            >
              <i
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <AccountCircleRoundedIcon fontSize="large" style={{ color: '#bbb' }} />
              </i>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <button
                  className="dropdown-item"
                  id="login-button"
                  onClick={() => history.push('/profile')}
                >
                  Profile
                </button>
                <button
                  className="dropdown-item"
                  id="login-button"
                  onClick={logout}
                >
                  Log Out
                </button>
              </div>
            </li>
            )}
          </ul>
        </div>
      </nav>
      {user && !user.emailVerified && (
        <nav className="navbar fixed-top navbar-expand" style={{ color: 'white', backgroundColor: 'red', marginTop: '4.5rem' }}>
          <div className="navbar-collapse collapse" id="navbar2">
            <b>
              To get access to all the featues of the website, please verify
              {' '}
              <span role="button" style={{ textDecoration: 'underline' }} onClick={verifyEmail}>your email</span>
            </b>
          </div>
        </nav>
      )}
    </div>
  );
};

export default withRouter(Header);
