function Error({ statusCode }) {
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
          {statusCode ? (
            <>
              <p>
                <strong>An unexpected error occurred.</strong>
              </p>
              <p>
                Go to <a href="/">home</a>
              </p>
            </>
          ) : (
            <>
              <p>
                <strong>404 - Looks like the resource failed to load. Try again.</strong>
              </p>
              <p>
                Go to <a href="/">home</a>
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
