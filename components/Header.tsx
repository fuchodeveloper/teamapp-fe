import React, { Fragment, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { withContext } from '~/utils/appContext';
import { authUser } from './interfaces/authUser';

const Header = ({ user, authenticated, logout }: authUser) => {
  const [teamId, setTeamId] = useState('');
  const router = useRouter();

  useEffect(() => {
    const tid = localStorage.getItem('tid') || '';
    if (tid && typeof tid === 'string') {
      setTeamId(tid);
    }
  }, []);

  const logoutHandler = (): any => {
    logout();
    router.push('/');
  };

  return (
    <div className="hero-head rc-Header">
      <nav className="navbar header-nav">
        <div className="container">
          <div className="navbar-brand">
            <a className="navbar-item" href="/">
              <h2 className="subtitle has-text-weight-bold">Team App</h2>
            </a>
            <span className="navbar-burger burger" data-target="navbarMenuHeroA">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </div>
          <div id="navbarMenuHeroA" className="navbar-menu">
            <div className="navbar-end">
              {/* <a className="navbar-item is-active">Home</a> */}
              {authenticated ? (
                <div className="navbar-item has-dropdown is-hoverable">
                  <a className="navbar-link">My Profile</a>
                  <div className="navbar-dropdown">
                    <Link href="/home">
                      <a className="navbar-item">Home</a>
                    </Link>
                    {!teamId && (
                      <Link href="/create-team">
                        <a className="navbar-item">Create Team</a>
                      </Link>
                    )}
                    {teamId && (
                      <Link href={`/teams/${teamId}`}>
                        <a className="navbar-item">View Team</a>
                      </Link>
                    )}

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

export default withContext(Header);
