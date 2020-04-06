import { Fragment, useState } from 'react';
import { Formik } from 'formik';

import Header from '../components/Header';
import { createTeamMembersSchema } from '../validation/team';
import { withContext } from '../utils/appContext';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

const CreateTeamMembers = () => {
  const [inputFields, setInputFields] = useState([{ firstName: '', lastName: '', email: '' }]);
  const [createTeamMembers, { data: membersData, loading: membersLoading, error: membersError }] = useMutation(
    CREATE_TEAM_MEMBERS,
  );

  console.log(membersData, membersLoading, membersError);
  

  const handleInputChange = (index: number, event: any, handleChange: Function) => {
    handleChange(event);
    const values = [...inputFields];
    if (event.target.name === 'firstName') {
      values[index].firstName = event.target.value;
    } else if (event.target.name === 'lastName') {
      values[index].lastName = event.target.value;
    } else {
      values[index].email = event.target.value;
    }

    setInputFields(values);
  };

  const handleAddFields = () => {
    const values = [...inputFields];
    values.push({ firstName: '', lastName: '', email: '' });
    setInputFields(values);
  };

  const handleRemoveFields = (index: number) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  return (
    <Fragment>
      <Header />
      <section className="hero">
        <div className="hero-body">
          <div className="container">
            <div className="card card-wrapper">
              <div className="card-content content-padding">
                <Formik
                  initialValues={inputFields}
                  // validationSchema={createTeamMembersSchema}
                  onSubmit={(values, { setSubmitting }) => {

                    // createTeam({
                    //   variables: {
                    //     input: request,
                    //   },
                    // });
                    console.log('inputFields', inputFields);
                    
                    createTeamMembers({ variables: { input: inputFields } });

                    setSubmitting(false);
                  }}
                >
                  {({ errors, touched, handleSubmit, isSubmitting, values, handleBlur, handleChange }) => {
                    console.log('errors', errors);
                    
                    return (
                      <form onSubmit={handleSubmit}>
                        <div className="has-text-centered m-b-3">
                          <h2 className="title">Create Team Members</h2>
                        </div>
                        {inputFields.map((field, index) => {
                          console.log('field', field);
                          
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
                                      />
                                      <span className="icon is-small is-left">
                                        <i className="fas fa-user" />
                                      </span>
                                    </p>
                                  </div>
                                  <div className="field">
                                    <p className="control is-expanded has-icons-left has-icons-right">
                                      <input
                                        name="lastName"
                                        className="input is-success"
                                        type="text"
                                        placeholder="Last Name"
                                        onBlur={handleBlur}
                                        onChange={(event) => handleInputChange(index, event, handleChange)}
                                        value={field.lastName}
                                      />
                                      <span className="icon is-small is-left">
                                        <i className="fas fa-user"></i>
                                      </span>
                                    </p>
                                  </div>
                                  <div className="field">
                                    <p className="control is-expanded has-icons-left has-icons-right">
                                      <input
                                        name="email"
                                        className="input is-success"
                                        type="email"
                                        placeholder="Email Address"
                                        onBlur={handleBlur}
                                        onChange={(event) => handleInputChange(index, event, handleChange)}
                                        value={field.email}
                                      />
                                      <span className="icon is-small is-left">
                                        <i className="fas fa-envelope"></i>
                                      </span>
                                    </p>
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

                        <hr />

                        <div className="field is-horizontal">
                          <div className="field-label"></div>
                          <div className="field-body">
                            <div className="field">
                              <div className="control has-text-right">
                                <button
                                  disabled={isSubmitting}
                                  type="submit"
                                  className="button has-text-white has-text-weight-bold theme-color-bg m-r-1 no-border"
                                >
                                  Create Members
                                </button>
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
      firstName
      lastName
      email
      team
    }
  }
`;

export default withContext(CreateTeamMembers);
