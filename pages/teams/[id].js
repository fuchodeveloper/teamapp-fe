import React, { Fragment, useState, useEffect, useContext } from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import Skeleton from 'react-loading-skeleton';
import Link from 'next/link';

import Header from '~/components/Header';
import TeamDetails from '~/components/TeamDetails';
import TeamLeadDetails from '~/components/TeamLeadDetails';
import { withContext, appContext } from '~/utils/appContext';

const ViewTeam = (props) => {
  const { data: teamData, loading: teamLoading, error: teamError } = useQuery(GET_TEAM, {
    variables: { id: props.id },
  });

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

          {team?.members?.length ? (
            <>
              <TeamLeadDetails
                uniqueId={team?.uniqueId}
                lead={team?.teamLead?.lead}
                user={team?.teamLead?.user}
                members={team?.members}
              />

              <TeamDetails members={team?.members} />
            </>
          ) : (
            <section className="section">
              <div className="container has-text-centered">
                <div className="flex-center m-b-3">
                  <figure className="image has-text-centered">
                    <img src="/images/empty.png" />
                  </figure>
                </div>
                <Link href={`/teams/${props.id}/create-members`}>
                  <a className="button theme-color-bg has-text-white has-text-weight-bold">Create Team Members</a>
                </Link>
              </div>
            </section>
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
          team
        }
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

export async function getServerSideProps(ctx) {
  return {
    props: {
      id: ctx.query.id,
    },
  };
}

export default ViewTeam;
