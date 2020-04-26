import { useLazyQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import classnames from 'classnames';
import { Field, Formik } from 'formik';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Router from 'next/router';
import { Fragment } from 'react';
import { auth } from '~/utils/auth';
import Header from '../components/Header';
import errorMessages from '../errors';
import { initialValues, signinSchema } from '../validation/signin';

const ProfilePage = dynamic(() => import('./profile'));

const SignIn = (props: any) => {
  console.log('SignIn:props', props);

  const [loginUser, { called, loading, data, error }] = useLazyQuery(SIGN_IN);
  const { code }: { [key: string]: string } = error?.graphQLErrors?.[0]?.extensions || {};
  const loggedIn = props?.pageProps?.loggedIn;

  const dynamicClasses = classnames({ 'is-loading': called && loading });

  const loginStatus = data?.login?.success;

  if (loginStatus) {
    // cookie.set('signedin', 'true');
    Router.push('/profile');
    // window.location.href = '/profile';
  }

  return (
    <Fragment>
      <Header {...props} />
      <section className="hero">
        <div className="hero-body">
          <div className="container">
            <div className="card card-wrapper">
              <div className="card-content content-padding">
                <div className="has-text-centered m-b-3">
                  <h2 className="title">Welcome back</h2>
                </div>

                <Formik
                  initialValues={initialValues}
                  validationSchema={signinSchema}
                  onSubmit={({ email, password }, { setSubmitting }) => {
                    loginUser({
                      variables: {
                        email,
                        password,
                      },
                    });
                    setSubmitting(false);
                  }}
                >
                  {({ errors, touched, handleSubmit, isSubmitting }) => {
                    const showOnlyServerErr = !errors.password && !errors.email;
                    return (
                      <form onSubmit={handleSubmit}>
                        <div className="field is-horizontal m-b-1">
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
                            </div>
                          </div>
                        </div>

                        <div className="field is-horizontal m-b-1">
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
                              {errors.password && touched.password ? (
                                <span className="help is-danger">{errors.password}</span>
                              ) : (
                                <br />
                              )}
                              {code === 'INVALID_CREDENTIAL' && showOnlyServerErr && (
                                <span className="help is-danger">{errorMessages.INVALID_CREDENTIAL}</span>
                              )}
                              {code === 'INTERNAL_SERVER_ERROR' && showOnlyServerErr && (
                                <span className="help is-danger">{errorMessages.INTERNAL_SERVER_ERROR}</span>
                              )}
                              {code === 'NO_USER' && showOnlyServerErr && (
                                <span className="help is-danger">{errorMessages.NO_USER}</span>
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
                                  disabled={isSubmitting || !!errors.email || !!errors.password}
                                  className={`button has-text-white has-text-weight-bold theme-color-bg m-r-1 no-border ${dynamicClasses} ${
                                    !!errors.email || !!errors.password ? 'theme-color-bg' : ''
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

const SIGN_IN = gql`
  query loginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      success
    }
  }
`;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // Check user's session
  const session = auth(ctx);

  return {
    props: session,
  };
};

// SignIn.getInitialProps = async (ctx: { ctx: any; }) => {
//   // Check user's session
//   const token = auth(ctx?.ctx || ctx) || '';

//   console.log('SignIn.getInitialProps:token', token);
//   return token;
//   // return {
//   //   props: { token },
//   // };
// };

export default SignIn;
// export default withAuthSync(SignIn);
