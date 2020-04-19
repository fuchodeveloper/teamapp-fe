import Link from 'next/link';
import { useContext } from 'react';
import { appContext } from '~/utils/appContext';
import Header from '../components/Header';

const Index = () => {
  const ctx = useContext(appContext);
  const { user, authenticated }: any = ctx;

  return (
    <div>
      <Header />
      <section className="hero is-link is-fullheight-with-navbar">
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title">Team Lead Picker</h1>
            <h5 className="subtitle">Automate the process of managing team responsibilities</h5>
            {!user?.id && !authenticated && (
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

export default Index;
