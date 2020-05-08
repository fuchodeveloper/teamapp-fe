import { gql } from 'apollo-boost';

export const GET_TEAM = gql`
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

export const MANAGE_TEAMLEAD = gql`
  mutation createOrUpdateTeamLead($input: CreateOrUpdateTeamLeadInput!) {
    createOrUpdateTeamLead(input: $input) {
      id
      teamUniqueId
      creator
      start
      stop
      user {
        id
        firstName
        lastName
      }
      duties
    }
  }
`;

export const GET_TEAM_LEAD = gql`
  query GetTeamLead($input: GetTeamLeadInput!) {
    getTeamLead(input: $input) {
      id
      teamUniqueId
      creator
      start
      stop
      user {
        id
        firstName
        lastName
      }
      duties
    }
  }
`;

export const DELETE_MEMBER = gql`
  mutation deleteUser($uniqueId: String!, $userId: String!, $creator: String!) {
    deleteUser(uniqueId: $uniqueId, userId: $userId, creator: $creator) {
      id
      firstName
      lastName
      email
      teamUniqueId
    }
  }
`;

export const DELETE_TEAM = gql`
  mutation deleteTeam($uniqueId: String!, $creator: String!) {
    deleteTeam(uniqueId: $uniqueId, creator: $creator) {
      success
    }
  }
`;
