import React, { createContext, useEffect } from 'react';

// export const appContext = React.createContext({});

// export const Provider = appContext.Provider;
// export const Consumer = appContext.Consumer;

export const appContext = React.createContext({
  authenticated: false,
  user: {},
  // setSession: () => undefined,
  // logout: () => undefined,
});

export const withContext = (Component: any) => {
  return (props: JSX.IntrinsicAttributes) => {
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
