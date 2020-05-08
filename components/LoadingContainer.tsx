import { Fragment } from 'react';
import Header from './Header';
import Skeleton from 'react-loading-skeleton';

const LoadingContainer = (props: { pageProps: any }) => (
  <Fragment>
    <Header pageProps={props?.pageProps} />
    <section className="section">
      <div className="container">
        <div className="card card-wrapper">
          <div className="card-content content-padding">
            <Skeleton count={5} />
            <p className="m-b-3" />
            <Skeleton count={5} />
          </div>
        </div>
      </div>
    </section>
  </Fragment>
);

export default LoadingContainer;
