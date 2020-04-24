import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Field, Formik } from 'formik';
import { GetServerSideProps, NextPage } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Router from 'next/router';
import { Fragment } from 'react';
import { authUser } from '~/components/interfaces/authUser';
import { auth } from '~/utils/auth';
import Header from '../components/Header';
import { initialValues, teamSchema } from '../validation/team';

const SigninPage: NextPage = dynamic(() => import('./signin'));

const CreateTeam = ({ pageProps }: authUser) => {
  const { user, authenticated } = pageProps || {};
  const loggedIn = pageProps?.loggedIn || false;
  const [createTeam, { data: teamData, loading: teamLoading, error: teamError }] = useMutation(CREATE_TEAM);
  const { data: userData, loading: userLoading, error: userErr } = useQuery(GET_USER, {
    variables: { id: user?.id || '' },
  });
  const teamId = teamData?.createTeam?.uniqueId;

  if (teamId) {
    Router.push(`/teams/${teamId}`);
  }

  if (!loggedIn) return <SigninPage />;

  return (
    <Fragment>
      <Header pageProps={pageProps} />
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
                  const disabledState = !!errors.name || !!errors.duties;
                  return (
                    <form onSubmit={handleSubmit}>
                      <div className="card-content content-padding">
                        <div className="has-text-centered m-b-3">
                          <h2 className="title">Create New Team</h2>
                        </div>
                        <div className="field is-horizontal m-b-2">
                          <div className="field-label is-normal">
                            <label className="label">Team Name</label>
                          </div>
                          <div className="field-body">
                            <div className="field is-expanded">
                              <div className="field">
                                <p className="control is-expanded">
                                  <Field name="name" className="input" required />
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
                                  disabled={isSubmitting || disabledState}
                                  type="submit"
                                  className="button has-text-white has-text-weight-bold theme-color-bg m-r-1 no-border"
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
    }
  }
`;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // Check user's session
  const session = auth(ctx) || {};

  return {
    props: session,
  };
};

export default CreateTeam;
