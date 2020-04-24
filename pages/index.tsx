import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { authUser } from '~/components/interfaces/authUser';
import { auth } from '~/utils/auth';
import Header from '../components/Header';

const Index = ({ pageProps }: authUser) => {
  const { user, loggedIn } = pageProps || {};

  return (
    <div>
      <Header pageProps={pageProps} />
      <section className="hero is-link is-fullheight-with-navbar">
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title">Team Lead Picker</h1>
            <h5 className="subtitle">Automate the process of managing team responsibilities</h5>
            {!user?.id && !loggedIn && (
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // Check user's session
  const session = auth(ctx);

  return {
    props: session,
  };
};

export default Index;
