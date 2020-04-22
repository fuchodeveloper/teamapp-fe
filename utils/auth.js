import cookie from 'js-cookie';
import jwt from 'jsonwebtoken';
import nextCookie from 'next-cookies';
import Router from 'next/router';
import { Component } from 'react';

export const auth = (ctx) => {
  const { token } = nextCookie(ctx);
  let decodedUser;
  let userPayload;

  if (ctx.req && !token) {
    ctx.res.writeHead(302, { Location: '/signin' });
    ctx.res.end();
    return;
  }

  if (!token) {
    Router.push('/signin');
  }

  const decoded = jwt.decode(token, { complete: true });
  decodedUser = decoded?.payload;
  userPayload = {
    user: decodedUser,
    authenticated: true,
  };

  return {token, ...userPayload};
};

export const logout = () => {
  cookie.remove('token');
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
        Router.push('/login');
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
