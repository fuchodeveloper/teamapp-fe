import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import classnames from 'classnames';
import { addDays } from 'date-fns';
import { Formik } from 'formik';
import { Fragment, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import Skeleton from 'react-loading-skeleton';
import Header from '~/components/Header';
import { getUser } from '~/utils/auth';
import { manageTeamLeadSchema } from '~/validation/team';
import LoadingContainer from '~/components/LoadingContainer';

type Props = {
  pageProps: {
    teamId: string;
    _uid: string;
    uniqueId: string;
  };
};

type Context = {
  query: {
    id: string;
  };
};

/**
 * Manage details of a given team
 * @param props user object
 */
const Manage = (props: Props) => {
  const initialState = {
    duties: '',
    teamLead: { user: { firstName: '' }, lead: { start: '', stop: '' } },
  };
  const { teamId, _uid } = props?.pageProps;
  const [showModal, setShowModal] = useState(false);
  const [teamState, setTeamState] = useState(initialState);

  const { data: teamData, loading: teamLoading, error: teamError } = useQuery(GET_TEAM, {
    variables: { id: _uid, uniqueId: teamId },
  });

  const { data: teamLData, loading: teamLLoading, error: teamLError } = useQuery(GET_TEAM_LEAD, {
    variables: { input: { teamUniqueId: teamId, creator: _uid } },
  });

  const [createOrUpdateTeamLead, { data: teamLeadData, loading: teamLeadLoading, error: teamLeadError }] = useMutation(
    MANAGE_TEAMLEAD,
  );
  const newDuties = teamLeadData?.createOrUpdateTeamLead?.duties;

  useEffect(() => {
    if (teamData?.team) {
      setTeamState({ ...teamData?.team });
    }
    if (newDuties) {
      setTeamState({ ...teamData?.team, duties: newDuties });
    }
  }, [teamData?.team, newDuties]);

  const showModalClass = classnames({ 'is-active': showModal });

  if (teamLoading) return <LoadingContainer pageProps={props?.pageProps} />;
  if (teamLLoading) return <LoadingContainer pageProps={props?.pageProps} />;

  // if (teamError) return <div>An unexpected error occurred!</div>;

  const { team } = teamData || {};
  const { members, uniqueId } = team || {};

  const toggleModal = (val: boolean) => {
    setShowModal(val);
  };

  const renderModal = () => {
    return (
      <div className={`modal ${showModalClass}`}>
        <div className="modal-background" onClick={() => toggleModal(false)}></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Confirm Action</p>
            <button className="delete" aria-label="close" onClick={() => toggleModal(false)}></button>
          </header>
          <section className="modal-card-body">
            <div className="field">
              <p>Do you want to remove john@doe.com from the team?</p>
              <div className="buttons">
                <button className="button is-danger">
                  <span className="icon is-small">
                    <i className="fas fa-check"></i>
                  </span>
                  <span>Yes</span>
                </button>
                <button className="button is-outlined" onClick={() => toggleModal(false)}>
                  <span aria-label="close">No</span>
                  <span className="icon is-small">
                    <i className="fas fa-times"></i>
                  </span>
                </button>
              </div>
            </div>
          </section>
        </div>
        <button className="modal-close is-large" aria-label="close" onClick={() => toggleModal(false)}></button>
      </div>
    );
  };

  return (
    <>
      <Header pageProps={props?.pageProps} />
      <section className="hero">
        <div className="hero-body">
          <div className="container">
            <div className="card card-wrapper">
              <Formik
                initialValues={{ name: '', start: '', stop: '', duties: '' }}
                validationSchema={manageTeamLeadSchema}
                onSubmit={(values, { setSubmitting }) => {
                  const nameArr = values?.name?.split('~');

                  const request = {
                    userId: nameArr[1],
                    start: values.start,
                    stop: values.stop,
                    creator: _uid,
                    teamUniqueId: uniqueId,
                    duties: values.duties,
                  };

                  createOrUpdateTeamLead({ variables: { input: request } });
                  setSubmitting(false);
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  setFieldValue,
                  handleReset,
                }) => {
                  return (
                    <form onSubmit={handleSubmit}>
                      <div className="card-content content-padding">
                        <div className="m-b-1">
                          <h2 className="title">Team Lead</h2>
                        </div>
                        <hr />
                        <div className="field is-horizontal">
                          <div className="field-body">
                            <div className="field">
                              <label className="label">Name</label>
                              <div className="control has-icons-left is-expanded">
                                <span className="select is-fullwidth">
                                  <select
                                    name="name"
                                    // defaultValue={`${teamState?.teamLead?.user?.firstName}`}
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    required
                                  >
                                    <option value="" disabled>
                                      -- Select Name --
                                    </option>
                                    {members?.map((member: any) => {
                                      return (
                                        <option
                                          key={member.id}
                                          value={`${member.firstName} ${member.lastName}~${member.id}`}
                                          label={`${member.firstName} ${member.lastName}`}
                                        >{`${member.firstName} ${member.lastName}`}</option>
                                      );
                                    })}
                                  </select>
                                  {errors.name && touched.name ? (
                                    <span className="help is-danger">{errors.name}</span>
                                  ) : (
                                    <br />
                                  )}
                                </span>
                                <span className="icon is-small is-left">
                                  <i className="fas fa-user" />
                                </span>
                              </div>
                            </div>
                            <div className="field">
                              <label className="label">Start</label>
                              <div className="control is-expanded date-picker-wrapper has-icons-left">
                                <DatePicker
                                  name="start"
                                  selected={new Date(values.start || teamState?.teamLead?.lead?.start || Date.now())}
                                  onChange={(value) => {
                                    setFieldValue('start', value);
                                  }}
                                  className="input is-fullwidth"
                                  minDate={new Date()}
                                  maxDate={addDays(new Date(), 21)}
                                  placeholderText="Select start date"
                                  dateFormat="MMMM d, yyyy"
                                  required
                                />
                                <span className="icon is-small is-left">
                                  <i className="fas fa-calendar" />
                                </span>
                                {errors.start && touched.start ? (
                                  <span className="help is-danger">{errors.start}</span>
                                ) : (
                                  <br />
                                )}
                              </div>
                            </div>
                            <div className="field">
                              <label className="label">Stop</label>
                              <div className="control is-expanded date-picker-wrapper has-icons-left">
                                <DatePicker
                                  name="stop"
                                  selected={
                                    new Date(values.stop || teamLData?.getTeamLead?.stop || addDays(new Date(), 1))
                                  }
                                  onChange={(value) => {
                                    setFieldValue('stop', value);
                                  }}
                                  className="input is-fullwidth"
                                  placeholderText="Select stop date"
                                  minDate={addDays(new Date(), 1)}
                                  maxDate={addDays(new Date(), 30)}
                                  dateFormat="MMMM d, yyyy"
                                />
                                <span className="icon is-small is-left">
                                  <i className="fas fa-calendar" />
                                </span>
                                {errors.stop && touched.stop ? (
                                  <span className="help is-danger">{errors.stop}</span>
                                ) : (
                                  <br />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="field is-horizontal">
                          <div className="field-body">
                            <div className="field">
                              <textarea
                                name="duties"
                                className="textarea"
                                placeholder="e.g. Hello world"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                defaultValue={teamState?.duties} // team?.duties
                              />
                            </div>
                          </div>
                        </div>
                        <br />
                        <div className="space-text">
                          <div>
                            <input type="checkbox" name="" id="" /> Notify user via email
                          </div>
                          <div className="display-flex">
                            <button
                              type="submit"
                              className="button has-text-white has-text-weight-bold theme-color-bg no-border m-r-1"
                              disabled={isSubmitting}
                            >
                              Submit
                            </button>
                            <button
                              onClick={handleReset}
                              type="reset"
                              // onClick={() =>
                              //   setTeamState({
                              //     duties: teamState?.duties,
                              //     teamLead: { user: { firstName: '' }, lead: { start: teamState?.teamLead?.lead?.start } },
                              //   })
                              // }
                              className="button"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  );
                }}
              </Formik>
            </div>
            <br />
            <div className="card card-wrapper">
              <div className="card-content content-padding">
                <div className="m-b-1">
                  <h2 className="title">Team Roster</h2>
                </div>
                <hr />
                <div className="table-container">
                  <table className="table is-fullwidth is-striped bg-transparent">
                    <thead>
                      <tr>
                        <th>S/N</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email Address</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {members?.length ? (
                        <Fragment>
                          {members.map(
                            (
                              member: { id: string; firstName: string; lastName: string; start: string; email: string },
                              index: number,
                            ) => {
                              return (
                                <tr key={member.id}>
                                  <th>{index + 1}</th>
                                  <td>{member.firstName}</td>
                                  <td>{member.lastName}</td>
                                  <td>{member.email}</td>
                                  <td style={{ paddingLeft: '2rem' }}>
                                    <span
                                      className="icon is-small"
                                      style={{ cursor: 'pointer' }}
                                      onClick={() => toggleModal(true)}
                                    >
                                      <i className="fas fa-trash-alt" />
                                    </span>
                                  </td>
                                  {showModal && renderModal()}
                                </tr>
                              );
                            },
                          )}
                        </Fragment>
                      ) : (
                        <Fragment>
                          <tr>
                            <td>Nothing to show.</td>
                          </tr>
                        </Fragment>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <br />
            <div className="card card-wrapper">
              <div className="card-content content-padding">
                <div className="m-b-1">
                  <h2 className="title">Danger Zone</h2>
                </div>
                <hr />
                <div className="field is-horizontal">
                  <div className="field-body">
                    <div className="field">
                      <div>
                        Delete team <input type="checkbox" name="" id="" />
                      </div>
                    </div>
                  </div>
                </div>
                <br />
                <div className="has-text-right">
                  <button className="button has-text-weight-bold is-danger">Delete</button>
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

const MANAGE_TEAMLEAD = gql`
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

const GET_TEAM_LEAD = gql`
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

export async function getServerSideProps(ctx: Context) {
  // Check user's session
  const session = getUser(ctx);
  const teamId = ctx.query.id;

  return {
    props: { teamId, ...session },
  };
}

export default Manage;
