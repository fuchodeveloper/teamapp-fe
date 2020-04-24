import React from 'react';

export const appContext = React.createContext({});

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
