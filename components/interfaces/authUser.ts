export type authUser = {
  user: {
    id: string;
  };
  authenticated: boolean;
  logout: Function;
};
