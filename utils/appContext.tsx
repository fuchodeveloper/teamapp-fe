import React, { useEffect } from 'react';
import Router from 'next/router';

export const appContext = React.createContext({
  authenticated: false,
  user: {},
  logout: () => {},
});

export const withContext = (Component: any) => {
  return (props: JSX.IntrinsicAttributes) => {
    useEffect(() => {
      const token = localStorage.getItem('token');
      let decodedToken: string;
      if (!token) {
        Router.push('/signin');
      }
      return undefined;
    }, []);

    return (
      <appContext.Consumer>
        {(globalState) => {
          return <Component {...globalState} {...props} />;
        }}
      </appContext.Consumer>
    );
  };
};

export const Provider = appContext.Provider;
export const Consumer = appContext.Consumer;
