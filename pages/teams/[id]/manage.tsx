import { useMutation, useQuery } from '@apollo/react-hooks';
import classnames from 'classnames';
import { addDays } from 'date-fns';
import { Formik } from 'formik';
import Link from 'next/link';
import Router from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import Header from '~/components/Header';
import LoadingContainer from '~/components/LoadingContainer';
import NotFound from '~/components/team/NotFound';
import { getUser } from '~/utils/auth';
import { DELETE_MEMBER, DELETE_TEAM, GET_TEAM, GET_TEAM_LEAD, MANAGE_TEAMLEAD } from '~/utils/manageTeamUtil';
import { manageTeamLeadSchema } from '~/validation/team';
import { showNotification } from '~/utils/notification';

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
    members: [],
    teamLead: { user: { firstName: '' }, lead: { start: '', stop: '' } },
    teamMembers: [],
  };
  const { teamId, _uid } = props?.pageProps;

  // component states: show/hide delete modal, team and delete modal data
  const [showModal, setShowModal] = useState(false);
  const [teamState, setTeamState] = useState(initialState);
  const [modalState, setModalState] = useState({
    memberId: '',
    memberEmail: '',
    uniqueId: '',
    creator: '',
  });
  const [showDeleteTeamModal, setShowDeleteTeamModal] = useState(false);

  const { data: teamData, loading: teamLoading, error: teamError } = useQuery(GET_TEAM, {
    variables: { id: _uid, uniqueId: teamId },
  });

  const { data: teamLData, loading: teamLLoading, error: teamLError } = useQuery(GET_TEAM_LEAD, {
    variables: { input: { teamUniqueId: teamId, creator: _uid } },
  });

  const [createOrUpdateTeamLead, { data: teamLeadData, loading: teamLeadLoading, error: teamLeadError }] = useMutation(
    MANAGE_TEAMLEAD,
  );
  const [deleteMember, { data: deleteData, loading: deleteLoading, error: deleteError }] = useMutation(DELETE_MEMBER);
  const [deleteTeam, { data: deleteTeamData, loading: deleteTeamLoading, error: deleteTeamError }] = useMutation(
    DELETE_TEAM,
  );

  const teamMembersCount = teamData?.team?.members?.length;
  const { start, stop, duties, user } = teamLeadData?.createOrUpdateTeamLead || {};
  const teamLeadUpdated = start || stop || user || duties;

  const newDuties = teamLeadData?.createOrUpdateTeamLead?.duties;
  const updatedTeamUsers = deleteData?.deleteUser;

  /**
   * Handle changes in state based on returned data
   * re-hydrate component state using updated data from server
   */
  useEffect(() => {
    if (teamData?.team) {
      setTeamState({ ...teamData?.team });
    }
    if (newDuties) {
      setTeamState({ ...teamData?.team, duties: newDuties });
    }
    if (updatedTeamUsers?.length || updatedTeamUsers?.length === 0) {
      // const options = { message: 'Team member deleted.', type: 'success' };
      // showNotification(options);
      setTeamState({ ...teamData?.team, members: [...updatedTeamUsers] });
    }
    if (updatedTeamUsers) {
      setShowModal(false);
    }
    if (teamLeadUpdated) {
      const options = { message: 'Team lead updated.', type: 'success' };
      // showNotification(options);
    }
  }, [teamData?.team, newDuties, updatedTeamUsers]);

  if (deleteTeamData?.deleteTeam?.success) {
    Router.push('/profile');
  }

  const showModalClass = classnames({ 'is-active': showModal });
  const showDeleteTeamModalClass = classnames({ 'is-active': showDeleteTeamModal });
  const teamLeadLoadingClass = classnames({ 'is-loading': teamLeadLoading });

  if (teamLoading) return <LoadingContainer pageProps={props?.pageProps} />;
  if (teamLLoading) return <LoadingContainer pageProps={props?.pageProps} />;

  // if (teamError) return <div>An unexpected error occurred!</div>;

  const { team } = teamData || {};
  const { uniqueId } = team || {};
  const members = teamState?.members || [];

  const toggleModal = (val: boolean) => {
    setShowModal(val);
  };
  const toggleDeleteTeamModal = (val: boolean) => {
    setShowDeleteTeamModal(val);
  };

  const handleDelete = (state: boolean, memberId: string, memberEmail: string) => {
    toggleModal(state);
    setModalState({ memberId, memberEmail, uniqueId, creator: _uid });
  };

  const handleDeleteTeam = (state: boolean) => {
    toggleDeleteTeamModal(state);
  };

  const TeamRosterModal = (props: any) => {
    const { toggleModal, showModalClass, modalState } = props || {};

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
              <p className="subtitle">
                Do you want to remove <strong>{modalState?.memberEmail}</strong> from the team?
              </p>
              <div className="buttons">
                <button
                  className="button is-danger"
                  onClick={() =>
                    deleteMember({
                      variables: {
                        uniqueId: modalState?.uniqueId,
                        userId: modalState?.memberId,
                        creator: modalState?.creator,
                      },
                    })
                  }
                >
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

  const DeleteTeamModal = () => {
    return (
      <div className={`modal ${showDeleteTeamModalClass}`}>
        <div className="modal-background" onClick={() => toggleDeleteTeamModal(false)}></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Confirm Action</p>
            <button className="delete" aria-label="close" onClick={() => toggleDeleteTeamModal(false)}></button>
          </header>
          <section className="modal-card-body">
            <div className="field">
              <p className="subtitle">
                Do you want to delete <strong>{team?.name}</strong>? This action is irreversible.
              </p>
              <div className="buttons">
                <button
                  className="button is-danger"
                  onClick={() => deleteTeam({ variables: { uniqueId, creator: _uid } })}
                >
                  <span className="icon is-small">
                    <i className="fas fa-check"></i>
                  </span>
                  <span>Yes</span>
                </button>
                <button className="button is-outlined" onClick={() => toggleDeleteTeamModal(false)}>
                  <span aria-label="close">No</span>
                  <span className="icon is-small">
                    <i className="fas fa-times"></i>
                  </span>
                </button>
              </div>
            </div>
          </section>
        </div>
        <button
          className="modal-close is-large"
          aria-label="close"
          onClick={() => toggleDeleteTeamModal(false)}
        ></button>
      </div>
    );
  };

  if (!team?.id) {
    return <NotFound pageProps={props?.pageProps} />;
  }

  return (
    <>
      <Header pageProps={props?.pageProps} />
      <section className="hero">
        <div className="hero-body">
          <div className="container">
            <div className="card-wrapper align-container-right">
              <div style={{ marginBottom: '0.5rem' }}>
                <p className="buttons">
                  <Link href={`/teams/${teamId}`}>
                    <button className="button">
                      <span className="icon">
                        <i className="fas fa-arrow-left"></i>
                      </span>
                      <span>Back to team</span>
                    </button>
                  </Link>
                </p>
              </div>
            </div>
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
                        <div className="field is-horizontal" style={{ marginBottom: '2rem' }}>
                          <div className="field-body">
                            <div className="field">
                              <label className="label">Name</label>
                              <div className="control has-icons-left is-expanded">
                                <span className="select is-fullwidth">
                                  <select
                                    name="name"
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
                                  {errors.name && touched.name && <span className="help is-danger">{errors.name}</span>}
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
                                {errors.start && touched.start && (
                                  <span className="help is-danger">{errors.start}</span>
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
                                {errors.stop && touched.stop && <span className="help is-danger">{errors.stop}</span>}
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
                              className={`button has-text-white has-text-weight-bold theme-color-bg no-border m-r-1 ${teamLeadLoadingClass}`}
                              disabled={isSubmitting || teamLeadLoading}
                            >
                              Submit
                            </button>
                            <button
                              onClick={() => {
                                handleReset();
                              }}
                              type="button"
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
                                      className="icon is-small has-text-danger"
                                      style={{ cursor: 'pointer' }}
                                      onClick={() => handleDelete(true, member.id, member.email)}
                                    >
                                      <i className="fas fa-trash-alt" />
                                    </span>
                                  </td>
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
                {showModal && (
                  <TeamRosterModal toggleModal={toggleModal} showModalClass={showModalClass} modalState={modalState} />
                )}
                <div className="has-text-right m-b-05">
                  <span className="help">Members count: {members?.length}/10</span>
                </div>
                <div className="has-text-right">
                  <Link href={`/teams/${uniqueId}/add-members`}>
                    <a className="has-text-weight-bold">
                      <button className="button" disabled={teamMembersCount >= 10}>
                        Add Team Members
                      </button>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
            <br />
            <div className="card card-wrapper">
              <div className="card-content content-padding danger-wrapper">
                <div className="m-b-1">
                  <h2 className="title">Danger Zone</h2>
                </div>
                <hr />
                <div className="field is-horizontal">
                  <div className="field-body">
                    <div className="field">
                      <div className="space-text">
                        <div>
                          <strong>Delete Team</strong>
                          <p>Once you delete a team, there is no going back. Please be sure.</p>
                        </div>
                        <div>
                          <button
                            className="button has-text-weight-bold is-danger"
                            onClick={() => handleDeleteTeam(true)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <br />
                {showDeleteTeamModal && <DeleteTeamModal />}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export async function getServerSideProps(ctx: Context) {
  // Check user's session
  const session = getUser(ctx);
  const teamId = ctx.query.id;

  return {
    props: { teamId, ...session },
  };
}

export default Manage;
