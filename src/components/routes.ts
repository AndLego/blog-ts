interface Route {
  id: number,
  to: string,
  text: string,
  private: boolean,
  publicOnly?: boolean
}

export const routes: Route[] = [
  {
    id: 1,
    to: "/",
    text: "Home",
    private: false,
  },
  {
    id: 2,
    to: "/blog",
    text: "Blog",
    private: false,
  },
  {
    id: 3,
    to: "/profile",
    text: "Profile",
    private: true,
  },
  {
    id: 4,
    to: "/logIn",
    text: "LogIn",
    private: false,
    publicOnly: true,
  },
  {
    id: 5,
    to: "/logOut",
    text: "LogOut",
    private: true,
  },
];
