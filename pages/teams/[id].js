import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Link from 'next/link';
import React, { Fragment } from 'react';
import Header from '~/components/Header';
import LoadingContainer from '~/components/LoadingContainer';
import TeamDetails from '~/components/TeamDetails';
import TeamLeadDetails from '~/components/TeamLeadDetails';
import { getUser } from '~/utils/auth';

const ViewTeam = (props) => {
  /**
   * use teamId and authenticated userId to fetch team data
   */
  const { teamId, _uid } = props?.pageProps || {};

  const { data: teamData, loading: teamLoading, error: teamError } = useQuery(GET_TEAM, {
    variables: { id: _uid, uniqueId: teamId },
  });

  if (teamLoading) return <LoadingContainer pageProps={props?.pageProps} />;

  if (teamError) {
    return Error('Unexpected error');
  }

  const { team } = teamData || {};

  return (
    <Fragment>
      <Header pageProps={props?.pageProps} />
      <section className="section" style={{ padding: '2rem 0.5rem' }}>
        <div className="container">
          <nav className="level">
            <div className="level-left">
              <div className="level-item">
                <p className="subtitle is-5">
                  Team: <strong>{team?.name || 'Team not found'}</strong>
                </p>
              </div>
            </div>

            <div className="level-right">
              <p className="level-item">
                Team ID: &nbsp; <strong>{team?.uniqueId || 'No id'}</strong>
              </p>
              {/* 
                TODO: add ability to copy team id using icon
              <p className="level-item">
                <span className="icon">
                  <i className="far fa-copy"></i>
                </span>
              </p> */}
            </div>
          </nav>

          {team?.members?.length ? (
            <>
              <TeamLeadDetails
                uniqueId={team?.uniqueId}
                lead={team?.teamLead?.lead}
                user={team?.teamLead?.user}
                members={team?.members}
                {...props?.pageProps}
              />

              <TeamDetails members={team?.members} {...props?.pageProps} />
            </>
          ) : (
            <>
              {team?.id ? (
                <section className="section">
                  <div className="container has-text-centered">
                    <div className="flex-center m-b-3">
                      <figure className="image has-text-centered">
                        <img src="/images/empty.png" />
                      </figure>
                    </div>
                    <Link href={`/teams/${teamId}/add-members`}>
                      <a className="button theme-color-bg has-text-white has-text-weight-bold">Create Team Members</a>
                    </Link>
                  </div>
                </section>
              ) : (
                <section className="section">
                  <div className="hero-body">
                    <div className="container has-text-centered">
                      <>
                        <p>
                          <strong>404 - Team not found.</strong>
                        </p>
                        <p>
                          Go to <a href="/">home</a>
                        </p>
                      </>
                    </div>
                  </div>
                </section>
              )}
            </>
          )}
        </div>
      </section>
    </Fragment>
  );
};

const GET_TEAM = gql`
  query Team($id: ID!, $uniqueId: String!) {
    team(id: $id, uniqueId: $uniqueId) {
      id
      name
      duties
      creator
      uniqueId
      teamLead {
        lead {
          id
          teamUniqueId
          start
          stop
        }
        user {
          id
          firstName
          lastName
          email
          teamUniqueId
        }
      }
      members {
        id
        firstName
        lastName
        email
        teamUniqueId
      }
    }
  }
`;

export const getServerSideProps = async (ctx) => {
  // Check user's session
  const session = getUser(ctx);
  const teamId = ctx.query.id;

  return {
    props: { teamId, ...session },
  };
};

export default ViewTeam;
