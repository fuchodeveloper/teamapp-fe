export default function Custom404() {
  return (
    <section className="hero has-background-white-bis is-fullheight">
      <div className="hero-head rc-Header">
      <nav className="navbar header-nav">
        <div className="container">
          <div className="navbar-brand">
            <a className="navbar-item" href="/">
              <h2 className="subtitle has-text-weight-bold">Team App</h2>
            </a>
          </div>
        </div>
      </nav>
      </div>
      <div className="hero-body">
        <div className="container has-text-centered">
          <>
            <p>
              <strong>404 - Page not found.</strong>
            </p>
            <p>
              Go to <a href="/">home</a>
            </p>
          </>
        </div>
      </div>
    </section>
  );
}
