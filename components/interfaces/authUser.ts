export interface authUser {
  user: {
    id: string;
  };
  authenticated: boolean;
  logout: Function;
};
