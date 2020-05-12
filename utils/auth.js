import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import nextCookie from 'next-cookies';
import Router from 'next/router';
import React, { Component } from 'react';

// TODO: deprecate method
export const auth = (ctx) => {
  const { token } = nextCookie(ctx);

  // if (ctx.req && !token) {
  //   ctx.res.writeHead(302, { Location: '/signin' });
  //   ctx.res.finished = true;
  //   ctx.res.end();
  //   return {};
  // }

  // if (!token) {
  //   Router.push('/signin');
  // }

  if (token) {
    let decodedToken;
    let userPayload = {};
    const decoded = jwt.decode(token, { complete: true });
    decodedToken = decoded?.payload;
    userPayload = {
      user: decodedToken,
      authenticated: true,
      admin: false,
    };

    return {
      token,
      loggedIn: true,
      ...userPayload,
    };
  }

  return { loggedIn: false, token: token || 'no token' };
};

/**
 * Saves user data from token to cookies for future use
 * @param {obj} userData
 */
export const saveUser = (userData) => {
  Cookies.set('_uid', userData?.id || '');
  Cookies.set('_ut', userData?.team || '');
  Cookies.set('_uf', userData?.firstName || '');
  Cookies.set('_ul', userData?.lastName || '');
  Cookies.set('_ue', userData?.email || '');
};

/**
 * Return current authenticated user from context
 * Redirect user if no id is gotten from cookie
 * @param {obj} ctx
 */
export const getUser = (ctx) => {
  const guestRoutes = ['/signin', '/signup', '/'];
  const authRoutes = ['/profile'];

  const user = nextCookie(ctx);
  
  if (ctx?.req && !user?._uid && !guestRoutes.includes(ctx?.req?.url)) {
    ctx.res.writeHead(302, { Location: '/signin' });
    ctx.res.end();
    return;
  }

  // if (ctx.req && user?._uid && guestRoutes.includes(ctx?.req?.url)) {
  //   ctx.res.writeHead(302, { Location: '/profile' });
  //   ctx.res.end();
  //   return;
  // }


  return user || { user: null };
};

/**
 * Removes user cookie data as part of logout process
 */
export const removeUser = () => {
  Cookies.remove('_uid');
  Cookies.remove('_ut');
  Cookies.remove('_uf');
  Cookies.remove('_ul');
  Cookies.remove('_ue');
};

// TODO: deprecate method
export const logout = () => {
  Cookies.remove('token');
  localStorage.removeItem('token');
  // To trigger the event listener we save some random data into the `logout` key
  window.localStorage.setItem('logout', Date.now()); // new
  Router.push('/');
};

// Gets the display name of a JSX component for dev tools
const getDisplayName = (Component) => Component.displayName || Component.name || 'Component';

export const withAuthSync = (WrappedComponent) =>
  class extends Component {
    static displayName = `withAuthSync(${getDisplayName(WrappedComponent)})`;

    static async getServerSideProps(ctx) {
      const token = auth(ctx);

      const componentProps = WrappedComponent.getServerSideProps && (await WrappedComponent.getServerSideProps(ctx));

      return { ...componentProps, token };
    }

    // New: We bind our methods
    constructor(props) {
      super(props);

      this.syncLogout = this.syncLogout.bind(this);
    }

    // New: Add event listener when a restricted Page Component mounts
    componentDidMount() {
      window.addEventListener('storage', this.syncLogout);
    }

    // New: Remove event listener when the Component unmount and
    // delete all data
    componentWillUnmount() {
      window.removeEventListener('storage', this.syncLogout);
      window.localStorage.removeItem('logout');
    }

    // New: Method to redirect the user when the event is called
    syncLogout(event) {
      if (event.key === 'logout') {
        console.log('logged out from storage!');
        Router.push('/signin');
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
