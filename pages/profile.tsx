import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { GetServerSideProps, NextPage } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Router from 'next/router';
import { Fragment, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import Header from '~/components/Header';
import { authUser } from '~/components/interfaces/authUser';
import { auth } from '~/utils/auth';

const SigninPage: NextPage = dynamic(() => import('./signin'));

const Profile = (props: any) => {
  if (!props.pageProps) {
    return (
      <div>Props still loading...</div>
    )
  }

  const { user, authenticated } = props?.pageProps;
  const loggedIn = props?.pageProps?.loggedIn || false;
  console.log('loggedIn:before', props);

  // useEffect(() => {
  //   if (loggedIn) return; // do nothing if the user is logged in
  //   Router.replace('/profile', '/signin', { shallow: true });
  // }, [loggedIn]);
  // useEffect(() => {
  //   console.log('loggedIn:useEffect:ptopss', pageProps);
    
  // }, [pageProps])

  // if (!loggedIn) return <SigninPage />;
  // console.log('loggedIn:after', loggedIn);
  

  const { data: userData, loading: userLoading, error: userError } = useQuery(GET_USER, {
    variables: { id: user?.id || '' },
  });

  const { data: teamData, loading: teamLoading, error: teamError } = useQuery(GET_TEAM, {
    variables: { id: user?.id, uniqueId: userData?.user?.team || '' },
  });

  const loadingContainer = (
    <Fragment>
      <Header pageProps={props?.pageProps} />
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

  if (userLoading) return loadingContainer;
  if (teamLoading) return loadingContainer;

  if (teamError) return <div>An unexpected error occurred!</div>;

  const { team } = teamData || {};

  return (
    <>
      <Header pageProps={props?.pageProps} />
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
  query Team($id: ID!, $uniqueId: String!) {
    team(id: $id, uniqueId: $uniqueId) {
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const token = ctx.req.headers.cookie?.slice(6);
  // Check user's session
  const session = auth(token);

  return {
    props: session,
  };
};

export default Profile;
