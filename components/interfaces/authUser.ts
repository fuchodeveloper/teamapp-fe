export type authUser = {
  pageProps?: {
    loggedIn: boolean;
    user: {
      id: string;
    };
    authenticated: boolean;
    logout: Function;
  };
};
