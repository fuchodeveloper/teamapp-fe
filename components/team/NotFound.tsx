import Header from "../Header";

const NotFound = (props: any) => {
  return (
    <>
      <Header pageProps={props?.pageProps} />
      <section className="hero is-large mobile-hero">
        <div className="hero-body">
          <div className="container has-text-centered">
            <p>
              <strong>404 - Team not found.</strong>
            </p>
            <p>
              Go to <a href="/">home</a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default NotFound;