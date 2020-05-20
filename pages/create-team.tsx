import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Field, Formik } from 'formik';
import Link from 'next/link';
import Router from 'next/router';
import { Fragment } from 'react';
import classnames from 'classnames';
import Cookies from 'js-cookie';
import LoadingContainer from '~/components/LoadingContainer';
import { getUser } from '~/utils/auth';
import Header from '../components/Header';
import { initialValues, teamSchema } from '../validation/team';

const CreateTeam = (props: any) => {
  const { _uid } = props?.pageProps;
  const [createTeam, { data: teamData, loading: teamLoading, error: teamError }] = useMutation(CREATE_TEAM);
  const { data: userData, loading: userLoading, error: userErr } = useQuery(GET_USER, {
    variables: { id: _uid || '' },
  });
  const teamId = teamData?.createTeam?.uniqueId;
  const hasTeam = userData?.user?.team;
  const loadingClass = classnames({ 'is-loading': teamLoading });

  if (teamId) {
    Cookies.set('_ut', teamId || '');
    Router.push(`/teams/${teamId}`);
  }

  if (userLoading) {
    return <LoadingContainer pageProps={props?.pageProps} />;
  }

  return (
    <Fragment>
      <Header pageProps={props?.pageProps} />
      <section className="hero">
        <div className="hero-body">
          <div className="container">
            <div className="card card-wrapper">
              <Formik
                initialValues={initialValues}
                validationSchema={teamSchema}
                onSubmit={(values, { setSubmitting }) => {
                  const request = {
                    creator: userData?.user?.id,
                    ...values,
                  };

                  createTeam({
                    variables: {
                      input: request,
                    },
                  });
                  setSubmitting(false);
                }}
              >
                {({ errors, touched, handleSubmit, isSubmitting, values, handleBlur, handleChange }) => {
                  const disabledState = !!errors.name || !!errors.duties || hasTeam;
                  return (
                    <form onSubmit={handleSubmit}>
                      <div className="card-content content-padding">
                        <div className="has-text-centered m-b-3">
                          <h2 className="title">Create New Team</h2>
                        </div>
                        {hasTeam && (
                          <div className="notification is-info is-light">
                            <p>
                              You have already created a team.{' '}
                              <a href={`/teams/${userData?.user?.team}`}>Go to team.</a>
                            </p>
                          </div>
                        )}
                        <div className="field is-horizontal m-b-2">
                          <div className="field-label is-normal">
                            <label className="label">Team Name</label>
                          </div>
                          <div className="field-body">
                            <div className="field is-expanded">
                              <div className="field">
                                <p className="control is-expanded">
                                  <Field name="name" className="input" required disabled={hasTeam} />
                                </p>
                              </div>
                              {errors.name && touched.name ? (
                                <span className="help is-danger">{errors.name}</span>
                              ) : null}
                            </div>
                          </div>
                        </div>

                        <div className="field is-horizontal">
                          <div className="field-label is-normal">
                            <label className="label">Duties</label>
                          </div>
                          <div className="field-body">
                            <div className="field">
                              <div className="control">
                                <textarea
                                  name="duties"
                                  className="textarea"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.duties}
                                  placeholder="Enter description of duties, responsibilities or a link to an exising document."
                                  required
                                  disabled={hasTeam}
                                />
                              </div>
                              {errors.duties && touched.duties ? (
                                <span className="help is-danger">{errors.duties}</span>
                              ) : null}
                            </div>
                          </div>
                        </div>

                        <hr />

                        <div className="field is-horizontal">
                          <div className="field-label"></div>
                          <div className="field-body">
                            <div className="field">
                              <div className="control has-text-right">
                                <button
                                  disabled={isSubmitting || disabledState || loadingClass}
                                  type="submit"
                                  className={`button has-text-white has-text-weight-bold theme-color-bg m-r-1 no-border ${loadingClass}`}
                                >
                                  Submit
                                </button>
                                <Link href="/">
                                  <a className="button has-text-weight-bold theme-color-text">Go Back</a>
                                </Link>
                              </div>
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
      </section>
    </Fragment>
  );
};

const CREATE_TEAM = gql`
  mutation createTeamMutation($input: CreateTeamInput) {
    createTeam(team: $input) {
      id
      name
      duties
      creator
      uniqueId
    }
  }
`;

const GET_USER = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      firstName
      lastName
      team
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

export default CreateTeam;
