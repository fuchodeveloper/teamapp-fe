import Link from 'next/link';
import { authUser } from '~/components/interfaces/authUser';
import { getUser } from '~/utils/auth';
import Header from '../components/Header';

const Index = (props: authUser) => {
  const { _uid } = props?.pageProps || {};
  const loggedIn = _uid || false;

  return (
    <div>
      <Header pageProps={props?.pageProps} />
      <section className="hero is-link is-fullheight-with-navbar">
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title">Team Lead Picker</h1>
            <h5 className="subtitle">Automate the process of managing team responsibilities</h5>
            {!loggedIn && (
              <Link href="/signup">
                <a className="button theme-color-bg has-text-white no-border m-r-1 has-text-weight-bold">Get Started</a>
              </Link>
            )}
            <a className="button no-border has-text-weight-bold theme-color-text">How It Works</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export const getServerSideProps = async (context: object) => {
  // Check user's session
  const session = getUser(context);

  return {
    props: session,
  };
};

export default Index;
