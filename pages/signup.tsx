import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import classnames from 'classnames';
import { Field, Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import Header from '../components/Header';
import errorMessages from '../errors';
import { initialValues, signupSchema } from '../validation/signup';
import { getUser } from '~/utils/auth';

const SignUp = (props: any) => {
  const [createUsers, { data, loading, error }] = useMutation(SIGN_UP);
  const { code }: { [key: string]: string } = error?.graphQLErrors?.[0].extensions || {};
  const router = useRouter();
  const dynamicClasses = classnames({ 'is-loading': loading });

  if (data?.createUsers?.length) {
    router.push('/signin');
  }

  return (
    <Fragment>
      <Header />
      <section className="hero">
        <div className="hero-body">
          <div className="container">
            <div className="card card-wrapper">
              <div className="card-content content-padding">
                <div className="has-text-centered m-b-3">
                  <h2 className="title">Create Account</h2>
                </div>

                <Formik
                  initialValues={initialValues}
                  validationSchema={signupSchema}
                  onSubmit={(values, { setSubmitting }) => {
                    createUsers({
                      variables: {
                        input: [values],
                      },
                    });
                    setSubmitting(false);
                  }}
                >
                  {({ errors, touched, handleSubmit, isSubmitting }) => {
                    const disabledState =
                      !!errors.firstName || !!errors.lastName || !!errors.email || !!errors.password;
                    const showOnlyServerErr =
                      !errors.firstName && !errors.lastName && !errors.password && !errors.email;
                    return (
                      <form onSubmit={handleSubmit}>
                        <div className="field is-horizontal m-b-2">
                          <div className="field-label is-normal">
                            <label className="label">First Name</label>
                          </div>
                          <div className="field-body">
                            <div className="field is-expanded">
                              <div className="field">
                                <p className="control is-expanded has-icons-left">
                                  <Field name="firstName" className="input" required />
                                  <span className="icon is-small is-left">
                                    <i className="fas fa-user" />
                                  </span>
                                </p>
                              </div>
                              {errors.firstName && touched.firstName ? (
                                <span className="help is-danger">{errors.firstName}</span>
                              ) : (
                                <br />
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="field is-horizontal m-b-2">
                          <div className="field-label is-normal">
                            <label className="label">Last Name</label>
                          </div>
                          <div className="field-body">
                            <div className="field is-expanded">
                              <div className="field">
                                <p className="control is-expanded has-icons-left">
                                  <Field name="lastName" className="input" required />
                                  <span className="icon is-small is-left">
                                    <i className="fas fa-user" />
                                  </span>
                                </p>
                              </div>
                              {errors.lastName && touched.lastName ? (
                                <span className="help is-danger">{errors.lastName}</span>
                              ) : (
                                <br />
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="field is-horizontal m-b-2">
                          <div className="field-label is-normal">
                            <label className="label">Email Address</label>
                          </div>
                          <div className="field-body">
                            <div className="field is-expanded">
                              <div className="field">
                                <p className="control is-expanded has-icons-left">
                                  <Field name="email" className="input" type="email" required />
                                  <span className="icon is-small is-left">
                                    <i className="fas fa-envelope" />
                                  </span>
                                </p>
                              </div>
                              {errors.email && touched.email ? (
                                <span className="help is-danger">{errors.email}</span>
                              ) : (
                                <br />
                              )}
                              {code === 'DUPLICATE_EMAIL' && showOnlyServerErr && (
                                <span className="help is-danger">{errorMessages.DUPLICATE_EMAIL}</span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="field is-horizontal m-b-2">
                          <div className="field-label is-normal">
                            <label className="label">Password</label>
                          </div>
                          <div className="field-body">
                            <div className="field is-expanded">
                              <div className="field">
                                <p className="control is-expanded has-icons-left">
                                  <Field name="password" className="input" type="password" required />
                                  <span className="icon is-small is-left">
                                    <i className="fas fa-lock" />
                                  </span>
                                </p>
                              </div>
                              {!errors.password && !touched.password && (
                                <span className="help">
                                  Use 7 - 15 characters, at least one numeric digit and a special character
                                </span>
                              )}
                              {errors.password && touched.password ? (
                                <span className="help is-danger">{errors.password}</span>
                              ) : (
                                <br />
                              )}
                              {code === 'INTERNAL_SERVER_ERROR' && showOnlyServerErr && (
                                <span className="help is-danger">{errorMessages.INTERNAL_SERVER_ERROR}</span>
                              )}
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
                                  type="submit"
                                  disabled={isSubmitting || disabledState}
                                  className={`button has-text-white has-text-weight-bold theme-color-bg m-r-1 no-border ${dynamicClasses} ${
                                    disabledState ? 'theme-color-bg' : ''
                                  }`}
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

const SIGN_UP = gql`
  mutation createUsers($input: [UserInput]) {
    createUsers(users: $input) {
      id
      firstName
      lastName
      email
    }
  }
`;

export const getServerSideProps = async (ctx: { query: { id: string } }) => {
  // Check user's session
  const session = getUser(ctx);
  const teamId = ctx?.query?.id || '';

  return {
    props: { teamId, ...session },
  };
};

export default SignUp;
