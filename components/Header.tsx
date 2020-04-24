import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Link from 'next/link';
import Router from 'next/router';
import React from 'react';

const Header = ({ pageProps }: any) => {
  const { user, authenticated, loggedIn } = pageProps || {};
  const [logoutRequest] = useMutation(LOGOUT);

  /**
   * handle logout call to GraphQL API
   * dehydrate session in the browser
   */
  const logoutHandler = (): any => {
    logoutRequest();
    // To trigger the event listener we save some random data into the `logout` key
    window.localStorage.setItem('logout', JSON.stringify(Date.now()));
    Router.push('/');
  };

  return (
    <div className="hero-head rc-Header">
      <nav className="navbar header-nav">
        <div className="container">
          <div className="navbar-brand">
            <Link href="/">
              <a className="navbar-item">
                <h2 className="subtitle has-text-weight-bold">Team App</h2>
              </a>
            </Link>
            <span className="navbar-burger burger" data-target="navbarMenuHeroA">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </div>
          <div id="navbarMenuHeroA" className="navbar-menu">
            <div className="navbar-end">
              {/* <a className="navbar-item is-active">Home</a> */}
              {loggedIn ? (
                <div className="navbar-item has-dropdown is-hoverable">
                  <a className="navbar-link">Menu</a>
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
