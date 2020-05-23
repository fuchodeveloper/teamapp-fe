import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import classnames from 'classnames';
import { Formik } from 'formik';
import Link from 'next/link';
import Router from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import Header from '~/components/Header';
import { getUser } from '~/utils/auth';

const CreateMembers = (props) => {
  const { _uid } = props?.pageProps;
  const teamId = props?.pageProps?.id;

  const [inputFields, setInputFields] = useState([{ firstName: '', lastName: '', email: '', teamUniqueId: '' }]);
  const [createTeamMembers, { data: membersData, loading: membersLoading, error: membersError }] = useMutation(
    CREATE_TEAM_MEMBERS,
  );

  const [getTeam, { called, loading, data: teamData, error: teamError }] = useLazyQuery(GET_TEAM);
  const serverError = membersError?.graphQLErrors?.[0] || {};
  const { code } = membersError?.graphQLErrors?.[0]?.extensions || {};
  const loadingClass = classnames({ 'is-loading': membersLoading });
  const teamMembersCount = teamData?.team?.members?.length;

  useEffect(() => {
    if (teamId) {
      getTeam({ variables: { id: _uid, uniqueId: teamId } });
    }
  }, [teamId]);

  if (!membersLoading && membersData?.createTeamUsers?.length > 0) {
    Router.push(`/teams/${teamId}`);
  }

  const handleInputChange = (index, event, handleChange) => {
    handleChange(event);
    const values = [...inputFields];
    if (event.target.name === 'firstName') {
      values[index].firstName = event.target.value;
    } else if (event.target.name === 'lastName') {
      values[index].lastName = event.target.value;
    } else if (event.target.name === 'email') {
      values[index].email = event.target.value;
    }
    values[index].teamUniqueId = teamData?.team?.uniqueId;

    setInputFields(values);
  };

  const handleAddFields = () => {
    const values = [...inputFields];
    values.push({ firstName: '', lastName: '', email: '', teamUniqueId: '' });
    setInputFields(values);
  };

  const handleRemoveFields = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  const validate = (values) => {
    // TODO: Map through `values` array and show errors for the given `index`
    values = values[0];
    const errors = {};
    if (!values.firstName.trim()) {
      errors.firstName = 'First name is required';
    } else if (values.firstName.length < 3 || values.firstName.length > 40) {
      errors.firstName = 'Must be between 3-40 characters';
    }

    if (!values.lastName.trim()) {
      errors.lastName = 'Last name is required';
    } else if (values.lastName.length < 3 || values.lastName.length > 40) {
      errors.lastName = 'Must be between 3-40 characters';
    }

    if (!values.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    return errors;
  };

  return (
    <Fragment>
      <Header pageProps={props?.pageProps} />
      <section className="hero">
        <div className="hero-body">
          <div className="container">
            <div className="card card-wrapper">
              <div className="card-content content-padding">
                <Formik
                  initialValues={inputFields}
                  validate={() => validate(inputFields)}
                  onSubmit={(values, { setSubmitting }) => {
                    createTeamMembers({ variables: { input: inputFields } });
                    setSubmitting(false);
                  }}
                >
                  {({ errors, touched, handleSubmit, isSubmitting, values, handleBlur, handleChange }) => {
                    const disabledState = !!errors.firstName || !!errors.lastName || !!errors.email;
                    const showOnlyServerErr = !errors.firstName && !errors.lastName && !errors.email;

                    return (
                      <form onSubmit={handleSubmit}>
                        <div className="has-text-centered m-b-3">
                          <h2 className="title">Create Team Members</h2>
                        </div>
                        {code === 'DUPLICATE_USER' && showOnlyServerErr && (
                          <div className="notification">
                            <span className="help is-danger">{serverError.message}</span>
                          </div>
                        )}
                        {inputFields.map((field, index) => {
                          return (
                            <Fragment key={`${field}~${index}`}>
                              <div className="field is-horizontal">
                                <div className="field-label is-normal">
                                  <label className="label">{index + 1}.</label>
                                </div>
                                <div className="field-body">
                                  <div className="field">
                                    <p className="control is-expanded has-icons-left">
                                      <input
                                        name="firstName"
                                        className="input"
                                        type="text"
                                        placeholder="First Name"
                                        onBlur={handleBlur}
                                        onChange={(event) => handleInputChange(index, event, handleChange)}
                                        value={field.firstName}
                                        required
                                      />
                                      <span className="icon is-small is-left">
                                        <i className="fas fa-user" />
                                      </span>
                                    </p>
                                    {errors.firstName && touched.firstName ? (
                                      <span className="help is-danger">{errors.firstName}</span>
                                    ) : (
                                      <br />
                                    )}
                                  </div>
                                  <div className="field">
                                    <p className="control is-expanded has-icons-left has-icons-right">
                                      <input
                                        name="lastName"
                                        className="input"
                                        type="text"
                                        placeholder="Last Name"
                                        onBlur={handleBlur}
                                        onChange={(event) => handleInputChange(index, event, handleChange)}
                                        value={field.lastName}
                                        required
                                      />
                                      <span className="icon is-small is-left">
                                        <i className="fas fa-user"></i>
                                      </span>
                                    </p>
                                    {errors.lastName && touched.lastName ? (
                                      <span className="help is-danger">{errors.lastName}</span>
                                    ) : (
                                      <br />
                                    )}
                                  </div>
                                  <div className="field">
                                    <p className="control is-expanded has-icons-left has-icons-right">
                                      <input
                                        name="email"
                                        className="input"
                                        type="email"
                                        placeholder="Email Address"
                                        onBlur={handleBlur}
                                        onChange={(event) => handleInputChange(index, event, handleChange)}
                                        value={field.email}
                                        required
                                      />
                                      <input
                                        name="teamUniqueId"
                                        className="input"
                                        type="hidden"
                                        value={field.teamUniqueId}
                                      />
                                      <span className="icon is-small is-left">
                                        <i className="fas fa-envelope"></i>
                                      </span>
                                    </p>
                                    {errors.email && touched.email ? (
                                      <span className="help is-danger">{errors.email}</span>
                                    ) : (
                                      <br />
                                    )}
                                  </div>
                                </div>
                                <div className="field">
                                  <div className="buttons">
                                    <button
                                      className="button no-border"
                                      type="button"
                                      onClick={() => handleRemoveFields(index)}
                                      disabled={inputFields.length <= 1}
                                    >
                                      <span className="icon is-small">
                                        <i className="fas fa-minus"></i>
                                      </span>
                                    </button>
                                    <button
                                      className="button no-border"
                                      type="button"
                                      onClick={() => handleAddFields()}
                                      disabled={inputFields.length === 10}
                                    >
                                      <span className="icon is-small">
                                        <i className="fas fa-plus"></i>
                                      </span>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </Fragment>
                          );
                        })}

                        {/* <span className="help has-text-right">Members count: 6/10</span> */}
                        <hr />

                        <div className="field is-horizontal">
                          <div className="field-label"></div>
                          <div className="field-body">
                            <div className="field">
                              <div className="control has-text-right">
                                <button
                                  disabled={isSubmitting || disabledState || membersLoading}
                                  type="submit"
                                  className={`button has-text-white has-text-weight-bold theme-color-bg m-r-1 no-border ${loadingClass}`}
                                >
                                  Add Members
                                </button>
                                <Link href={`/teams/${teamId}/manage`}>
                                  <a className="button has-text-weight-bold">
                                    Go Back
                                  </a>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    );
                  }}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

const CREATE_TEAM_MEMBERS = gql`
  mutation createTeamUsers($input: [CreateTeamUsersInput]) {
    createTeamUsers(input: $input) {
      id
      firstName
      lastName
      email
      teamUniqueId
    }
  }
`;

const GET_TEAM = gql`
  query Team($id: ID!, $uniqueId: String!) {
    team(id: $id, uniqueId: $uniqueId) {
      id
      uniqueId
      members {
        id
      }
    }
  }
`;

export async function getServerSideProps(ctx) {
  // Check user's session
  const session = getUser(ctx);
  const id = ctx.query.id;

  return {
    props: { id, ...session },
  };
}

export default CreateMembers;
