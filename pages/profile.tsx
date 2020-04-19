import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Link from 'next/link';
import { Fragment, useContext } from 'react';
import Skeleton from 'react-loading-skeleton';
import Header from '~/components/Header';
import { appContext } from '~/utils/appContext';

const Profile = (context: any) => {
  const ctx = useContext(appContext);
  const { user, authenticated }: any = ctx;

  const { data: teamData, loading: teamLoading, error: teamError } = useQuery(GET_TEAM, {
    variables: { id: user?.id || '' },
  });
  const { data: userData, loading: userLoading, error: userError } = useQuery(GET_USER, {
    variables: { id: user?.id || '' },
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

  // console.log('teamData', teamData, 'teamLoading', teamLoading, 'teamError', teamError, user);
  console.log('userData', userData, 'userLoading', userLoading, 'userError', userError);
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
                  <p>
                    <strong>Name:</strong> {`${userData?.user?.firstName} ${userData?.user?.lastName}`}
                  </p>
                  <p>
                    <strong>Email:</strong> {`${userData?.user?.email}`}
                  </p>
                </div>
                <br />
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
                  <p>
                    <strong>Team Name:</strong> {team?.name || 'No team created'}
                  </p>
                </div>
                <br />
                <div className="buttons">
                  {team?.id ? (
                    <Link href={`/teams/${team?.uniqueId}`}>
                      <a className="button has-text-weight-bold">View Team</a>
                    </Link>
                  ) : (
                    <Link href="/create-team">
                      <a className="button has-text-white has-text-weight-bold theme-color-bg no-border">Create Team</a>
                    </Link>
                  )}
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

const GET_USER = gql`
  query User($id: ID!) {
    user(id: $id) {
      firstName
      lastName
      username
      team
      role
      email
    }
  }
`;

export default Profile;
