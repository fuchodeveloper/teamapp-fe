import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import classnames from 'classnames';
import Link from 'next/link';
import Router from 'next/router';
import React, { useState } from 'react';
import { removeUser } from '~/utils/auth';

const Header = (props: any) => {
  const [showNavbar, setShowNavbar] = useState(false);

  const { _uid, _uf = '' } = props?.pageProps || {};
  const loggedIn = _uid || false;
  const [logoutRequest] = useMutation(LOGOUT);
  const capitaliseName = _uf && _uf?.[0]?.toUpperCase() + _uf?.slice(1);
  
  const addNavbarClass = classnames({ 'is-active': showNavbar });

  /**
   * handle logout call to GraphQL API
   * dehydrate session in the browser
   */
  const logoutHandler = (): any => {
    logoutRequest();
    removeUser();
    // To trigger the event listener we save some random data into the `logout` key
    window.localStorage.setItem('logout', JSON.stringify(Date.now()));
    Router.push('/');
  };

  const toggleNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  return (
    <div className="hero-head rc-Header">
      <nav className="navbar header-nav">
        <div className="container">
          <div className="navbar-brand">
            <a className="navbar-item" href="/">
              <h2 className="subtitle has-text-weight-bold">Team App</h2>
            </a>
            <span
              className={`navbar-burger burger ${addNavbarClass}`}
              data-target="navbarMenuHeroA"
              onClick={toggleNavbar}
            >
              <span></span>
              <span></span>
              <span></span>
            </span>
          </div>
          <div id="navbarMenuHeroA" className={`navbar-menu ${addNavbarClass}`}>
            <div className="navbar-end">
              {/* <a className="navbar-item is-active">Home</a> */}
              {loggedIn ? (
                <div className="navbar-item has-dropdown is-hoverable">
                  <a className="navbar-link">{`${capitaliseName}`}</a>
                  <div className="navbar-dropdown">
                    <Link href="/profile">
                      <a className="navbar-item">Profile</a>
                    </Link>

                    <hr className="navbar-divider" />
                    <a onClick={() => logoutHandler()} className="navbar-item has-text-danger">
                      Log out
                    </a>
                  </div>
                </div>
              ) : (
                <>
                  <Link href="/signin">
                    <a className="navbar-item">Sign In</a>
                  </Link>
                  <Link href="/signup">
                    <a className="navbar-item">Sign Up</a>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

const LOGOUT = gql`
  mutation {
    logout {
      success
    }
  }
`;

export default Header;
