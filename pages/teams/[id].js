import React, { Fragment, useState } from 'react';
import { gql } from 'apollo-boost';

import Header from '~/components/Header';
import TeamDetails from '~/components/TeamDetails';
import TeamLeadDetails from '~/components/TeamLeadDetails';
import { withContext, appContext } from '~/utils/appContext';
import Link from 'next/link';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks';
import Skeleton from 'react-loading-skeleton';

const ViewTeam = ({ contextProps }) => {
  const router = useRouter();
  // const { id } = router.query || '';

  const [isTeamEmpty, setIsTeamEmpty] = useState(false);
  const { data: teamData, loading: teamLoading, error: teamError } = useQuery(GET_TEAM, {
    variables: { id: router?.query?.id },
  });

  const ctx = useContext(appContext);

  
  const loadingContainer = (
    <Fragment>
      <Header />
      <section className="section">
        <Skeleton count={5} />
        <div className="container"></div>
      </section>
    </Fragment>
  );
  
  if (teamLoading) return loadingContainer;
  
  if (teamError) return <div>An unexpected error occurred!</div>;
  
  console.log('teamData', teamData, 'teamLoading', teamLoading, 'teamError', teamError, router?.query?.id);
  const { team } = teamData || {};
  return (
    <Fragment>
      <Header />
      <section className="section">
        <div className="container">
          <nav className="level">
            <div className="level-left">
              <div className="level-item">
                <p className="subtitle is-5">
                  Team: <strong>{team.name}</strong>
                </p>
              </div>
            </div>

            <div className="level-right">
              <p className="level-item">
                Team ID: &nbsp; <strong>{team.uniqueId}</strong>
              </p>
              <p className="level-item">
                <span className="icon">
                  <i className="far fa-copy"></i>
                </span>
              </p>
            </div>
          </nav>

          {isTeamEmpty ? (
            <section className="section">
              <div className="container has-text-centered">
                <div className="flex-center m-b-3">
                  <figure className="image has-text-centered">
                    <img src="/images/empty.png" />
                  </figure>
                </div>
                <Link href={`/teams/${router?.query?.id}/create-members`}>
                  <a className="button theme-color-bg has-text-white has-text-weight-bold">Create Team Members</a>
                </Link>
              </div>
            </section>
          ) : (
            <>
              <TeamLeadDetails lead={team?.lead} />

              <TeamDetails members={team?.members} />
            </>
          )}
        </div>
      </section>
    </Fragment>
  );
};

const GET_TEAM = gql`
  query Team($id: ID!) {
    team(id: $id) {
      id
      name
      duties
      creator
      uniqueId
      lead {
        id
        start
        stop
      }
      members {
        id
        firstName
        lastName
        email
        team
      }
    }
  }
`;

export default withContext(ViewTeam);
