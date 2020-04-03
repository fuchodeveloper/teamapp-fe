import { Fragment } from 'react';
import Link from "next/link";
import { useRouter } from 'next/router';
import { Formik, Field } from 'formik';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import classnames from 'classnames';

import Header from '../components/Header';
import { signupSchema, initialValues } from '../validation/signup';
import errorMessages from '../errors';

const SignUp = () => {
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
                  {({ errors, touched, handleSubmit, isSubmitting }) => (
                    <form onSubmit={handleSubmit}>
                      <div className="field is-horizontal m-b-2">
                        <div className="field-label is-normal">
                          <label className="label">First Name</label>
                        </div>
                        <div className="field-body">
                          <div className="field is-expanded">
                            <div className="field">
                              <p className="control is-expanded has-icons-left">
                                <Field name="firstName" className="input" />
                                <span className="icon is-small is-left">
                                  <i className="fas fa-user" />
                                </span>
                              </p>
                            </div>
                            {errors.firstName && touched.firstName ? (
                              <span className="help is-danger">{errors.firstName}</span>
                            ) : null}
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
                                <Field name="lastName" className="input" />
                                <span className="icon is-small is-left">
                                  <i className="fas fa-user" />
                                </span>
                              </p>
                            </div>
                            {errors.lastName && touched.lastName ? (
                              <span className="help is-danger">{errors.lastName}</span>
                            ) : null}
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
                                <Field name="email" className="input" type="email" />
                                <span className="icon is-small is-left">
                                  <i className="fas fa-envelope" />
                                </span>
                              </p>
                            </div>
                            {errors.email && touched.email ? (
                              <span className="help is-danger">{errors.email}</span>
                            ) : null}
                            {code === 'DUPLICATE_EMAIL' && (
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
                                <Field name="password" className="input" type="password" />
                                <span className="icon is-small is-left">
                                  <i className="fas fa-lock" />
                                </span>
                              </p>
                            </div>
                            {errors.password && touched.password ? (
                              <span className="help is-danger">{errors.password}</span>
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
                                type="submit"
                                disabled={isSubmitting}
                                className={`button has-text-white has-text-weight-bold theme-color-bg m-r-1 no-border ${dynamicClasses}`}
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
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}

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

export default SignUp;
