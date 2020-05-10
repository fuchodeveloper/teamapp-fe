import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Link from 'next/link';
import Header from '~/components/Header';
import LoadingContainer from '~/components/LoadingContainer';
import { getUser } from '~/utils/auth';

const Profile = (props: any) => {
  const { _uid } = props?.pageProps || {};
  const loggedIn = _uid || false;

  const { data: userData, loading: userLoading, error: userError } = useQuery(GET_USER, {
    variables: { id: _uid },
  });

  const { data: teamData, loading: teamLoading, error: teamError } = useQuery(GET_TEAM, {
    variables: { id: _uid, uniqueId: userData?.user?.team || '' },
  });

  if (userLoading) return <LoadingContainer pageProps={props?.pageProps} />;
  if (teamLoading) return <LoadingContainer pageProps={props?.pageProps} />;

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
                    <strong>Name:</strong> {`${userData?.user?.firstName || ''} ${userData?.user?.lastName || ''}`}
                  </p>
                  <p>
                    <strong>Email:</strong> {`${userData?.user?.email || ''}`}
                  </p>
                </div>
                <br />
                {/* <button className="button has-text-weight-bold" disabled>Manage Details</button> */}
              </div>
            </div>
            <br />
            <div className="card card-wrapper">
              <div className="card-content content-padding">
                <div className="m-b-1">
                  <h2 className="title">My Team</h2>
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
                    <>
                      <Link href={`/teams/${team?.uniqueId}`}>
                        <a className="button has-text-weight-bold m-r-1">View Team</a>
                      </Link>
                      <Link href={`/teams/${team?.uniqueId}/manage`}>
                        <a className="button has-text-weight-bold">Edit Team</a>
                      </Link>
                    </>
                  ) : (
                    <Link href="/create-team">
                      <a className="button has-text-white has-text-weight-bold theme-color-bg no-border">Create Team</a>
                    </Link>
                  )}
                </div>
              </div>
            </div>
            <br />
            {/* 
              TODO: Implement other teams
            <div className="card card-wrapper">
              <div className="card-content content-padding">
                <div className="m-b-1">
                  <h2 className="title">Other Teams</h2>
                </div>
                <hr />
                <p>You don't belong to any team.</p>
              </div>
            </div> */}
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

export const getServerSideProps = async (ctx: any) => {
  // Check user's session
  const session = getUser(ctx);

  return {
    props: session,
  };
};

export default Profile;
