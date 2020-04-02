import Link from "next/link";

const Header = () => {
  return (
    <div className="hero-head rc-Header">
      <nav className="navbar header-nav">
        <div className="container">
          <div className="navbar-brand">
            <Link href="/">
              <a className="navbar-item">
                <h2 className="subtitle has-text-weight-bold">Team App</h2>
              </a>
            </Link>
            <span className="navbar-burger burger" data-target="navbarMenuHeroA">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </div>
          <div id="navbarMenuHeroA" className="navbar-menu">
            <div className="navbar-end">
              {/* <a className="navbar-item is-active">Home</a> */}
              <Link href="/signin">
                <a className="navbar-item">Sign In</a>
              </Link>
              <Link href="/signup">
                <a className="navbar-item">Sign Up</a>
              </Link>
              {/* TODO: remove after testing */}
              <Link href="/create-account">
                <a className="navbar-item">Create Account</a>
              </Link>
              <Link href="/view-team">
                <a className="navbar-item">View Team</a>
              </Link>
              {/* <span className="navbar-item">
                  <a className="button is-primary is-inverted">
                    <span className="icon">
                      <i className="fab fa-github"></i>
                    </span>
                    <span>Download</span>
                  </a>
                </span> */}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
