import { Fragment, useEffect } from 'react';
import Link from 'next/link';
import { Formik, Field } from 'formik';
import { gql } from 'apollo-boost';
import { useMutation, useQuery } from '@apollo/react-hooks';
import classnames from 'classnames';
import jwt from 'jsonwebtoken';

import Header from '../components/Header';
import { initialValues, teamSchema } from '../validation/team';

const CreateTeam = () => {
  const [createTeam, { data, loading, error }] = useMutation(CREATE_TEAM);
  const { data: userData, loading: userLoading, error: userErr } = useQuery(GET_USER, {
    variables: { id: '5e87359ec2dda07e47d1af00' },
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: string | { [key: string]: string } | null | any = jwt.decode(token, { complete: true });
      console.log(decoded?.payload);
    }
  });

  return (
    <Fragment>
      <Header />
      <section className="hero">
        <div className="hero-body">
          <div className="container">
            <div className="card card-wrapper">
              <Formik
                initialValues={initialValues}
                validationSchema={teamSchema}
                onSubmit={(values, { setSubmitting }) => {
                  console.log(values);
                  const request = {
                    creator: '5e80dcf959877ff31837a425',
                    ...values,
                  };
                  console.log(request);

                  createTeam({
                    variables: {
                      input: request,
                    },
                  });
                  setSubmitting(false);
                }}
              >
                {({ errors, touched, handleSubmit, isSubmitting, values, handleBlur, handleChange }) => {
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
                                  <Field name="name" className="input" />
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
    {user(id: "5e87359ec2dda07e47d1af00") {
      firstName
      lastName
    }}
`;

export default CreateTeam;
