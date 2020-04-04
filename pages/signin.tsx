import { Fragment } from 'react';
import Link from "next/link";
import { Formik, Field } from 'formik';
import classnames from 'classnames';
import { useRouter } from 'next/router';

import Header from '../components/Header';
import { signinSchema, initialValues } from '../validation/signin';
import { gql } from 'apollo-boost';
import { useLazyQuery } from '@apollo/react-hooks';
import errorMessages from '../errors';

const SignIn = () => {
  const [loginUser, { called, loading, data, error }] = useLazyQuery(SIGN_IN);
  const { code }: { [key: string]: string } = error?.graphQLErrors?.[0].extensions || {};
  const router = useRouter();
  const dynamicClasses = classnames({ 'is-loading': called && loading });
  const userToken = data?.login?.token;
  
  if (data?.login?.token) {
    localStorage.setItem('token', userToken);
    router.push('/view-team');
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
                        <div className="field is-horizontal m-b-2">
                          <div className="field-label is-normal">
                            <label className="label">Email Address</label>
                          </div>
                          <div className="field-body">
                            <div className="field is-expanded">
                              <div className="field">
                                <p className="control is-expanded has-icons-left">
                                  <Field name="email" className="input" type="email" />
                                  <span className="icon is-small is-left">
                                    <i className="fas fa-envelope" />
                                  </span>
                                </p>
                              </div>
                              {errors.email && touched.email ? (
                                <span className="help is-danger">{errors.email}</span>
                              ) : null}
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
                                  <Field name="password" className="input" type="password" />
                                  <span className="icon is-small is-left">
                                    <i className="fas fa-lock" />
                                  </span>
                                </p>
                              </div>
                              {errors.password && touched.password ? (
                                <span className="help is-danger">{errors.password}</span>
                              ) : null}
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
      id
      token
    }
  }
`;

export default SignIn;
