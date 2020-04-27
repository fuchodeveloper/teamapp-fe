export type authUser = {
  pageProps?: {
    loggedIn: boolean;
    _uid: string;
    user: {
      id: string;
    };
    authenticated: boolean;
    logout: Function;
  };
};
