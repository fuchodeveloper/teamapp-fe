import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { useEffect, Fragment, useContext } from 'react';
import Skeleton from 'react-loading-skeleton';

import Header from '~/components/Header';
import { withContext, appContext } from '~/utils/appContext';
import { authUser } from '~/components/interfaces/authUser';

const Home = (context: any) => {
  const ctx = useContext(appContext);
  const { user, authenticated }: any = ctx;

  const { data: teamData, loading: teamLoading, error: teamError } = useQuery(GET_TEAM, {
    variables: { id: user?.id || '' },
  });

  useEffect(() => {
    if (teamData?.team?.id) {
      localStorage.setItem('tid', teamData?.team?.uniqueId);
    }
  });

  const loadingContainer = (
    <Fragment>
      <Header />
      <section className="section">
        <div className="container">
          <div className="card card-wrapper">
            <div className="card-content content-padding">
              <Skeleton count={5} />
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );

  if (teamLoading) return loadingContainer;

  if (teamError) return <div>An unexpected error occurred!</div>;

  console.log('teamData', teamData, 'teamLoading', teamLoading, 'teamError', teamError, user);
  const { team } = teamData || {};

  return (
    <>
      <Header />
      <section className="hero">
        <div className="hero-body">
          <div className="container">
            <div className="card card-wrapper">
              <div className="card-content content-padding">
                <div className="m-b-1">
                  <h2 className="title">My Details</h2>
                </div>
                <hr />
                <div>
                  <p>Name: John Doe</p>
                  <p>Email: john@gmail.com</p>
                </div>
                <button className="button has-text-weight-bold">Manage Details</button>
              </div>
            </div>
            <br />
            <div className="card card-wrapper">
              <div className="card-content content-padding">
                <div className="m-b-1">
                  <h2 className="title">Teams</h2>
                </div>
                <hr />
                <div>
                  <p>Team Name: {team?.name || 'No team created'}</p>
                </div>
                <br />
                <div className="buttons">
                  <button className="button has-text-white has-text-weight-bold theme-color-bg no-border">
                    Create Team
                  </button>
                  <button className="button has-text-weight-bold">Manage Team</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const GET_TEAM = gql`
  query Team($id: ID!) {
    team(id: $id) {
      id
      name
      uniqueId
    }
  }
`;

export default Home;
