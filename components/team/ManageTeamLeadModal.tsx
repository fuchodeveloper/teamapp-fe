import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import classnames from 'classnames';
import { addDays } from 'date-fns';
import { Formik } from 'formik';
import { useContext } from 'react';
import DatePicker from 'react-datepicker';
import { appContext } from '~/utils/appContext';
import { manageTeamLeadSchema } from '~/validation/team';

interface Props {
  uniqueId: string;
  showModal: boolean;
  toggleModal: Function;
  members: Array<any>;
  user: {
    id: string;
    firstName: string;
    lastName: string;
  };
}

interface Error {
  name?: string;
}

/**
 * create or update a team lead
 * @param props value from parent
 */
const ManageTeamLeadModal = (props: Props) => {
  const ctx = useContext(appContext);
  const [createOrUpdateTeamLead, { data: teamLeadData, loading: teamLeadLoading, error: teamLeadError }] = useMutation(
    MANAGE_TEAMLEAD,
  );

  console.log('teamLeadData', teamLeadData, 'teamLeadError', teamLeadError);

  const showModalClass = classnames({ 'is-active': props.showModal });
  const ctxProps: any = ctx && { ...ctx };

  return (
    <div className={`modal ${showModalClass}`}>
      <div className="modal-background" onClick={() => props.toggleModal(false)}></div>
      <Formik
        initialValues={{ name: '', start: '', stop: '' }}
        validationSchema={manageTeamLeadSchema}
        onSubmit={(values, { setSubmitting }) => {
          const nameArr = values?.name?.split('~');

          const request = {
            userId: nameArr[1],
            start: values.start,
            stop: values.stop,
            creator: ctxProps?.user?.id,
            teamUniqueId: props?.uniqueId,
          };
          createOrUpdateTeamLead({ variables: { input: request } });
          setSubmitting(false);
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, setFieldValue }) => {
          console.log('error', errors);
          return (
            <form onSubmit={handleSubmit}>
              <div className="modal-card">
                <header className="modal-card-head">
                  <p className="modal-card-title">Manage Team Lead</p>
                  <button className="delete" aria-label="close" onClick={() => props.toggleModal(false)}></button>
                </header>
                <section className="modal-card-body">
                  <div className="field">
                    <label className="label">Name</label>
                    <div className="control has-icons-left is-expanded">
                      <span className="select is-fullwidth">
                        <select name="name" value={values.name} onChange={handleChange} onBlur={handleBlur} required>
                          <option value="" disabled>
                            -- Select Name --
                          </option>
                          {props?.members?.map((member: any) => {
                            return (
                              <option
                                key={member.id}
                                value={`${member.firstName} ${member.lastName}~${member.id}`}
                                label={`${member.firstName} ${member.lastName}`}
                              >{`${member.firstName} ${member.lastName}`}</option>
                            );
                          })}
                        </select>
                        {errors.name && touched.name ? <span className="help is-danger">{errors.name}</span> : <br />}
                      </span>
                      <span className="icon is-small is-left">
                        <i className="fas fa-user" />
                      </span>
                    </div>
                  </div>

                  <div className="field is-horizontal">
                    <div className="field-body">
                      <div className="field">
                        <label className="label">Start</label>
                        <div className="control is-expanded date-picker-wrapper has-icons-left">
                          <DatePicker
                            name="start"
                            selected={new Date(values.start || Date.now())}
                            onChange={(value) => {
                              setFieldValue('start', value);
                            }}
                            className="input is-fullwidth"
                            minDate={new Date()}
                            placeholderText="Select start date"
                            required
                          />
                          <span className="icon is-small is-left">
                            <i className="fas fa-calendar" />
                          </span>
                          {errors.start && touched.start ? (
                            <span className="help is-danger">{errors.start}</span>
                          ) : (
                            <br />
                          )}
                        </div>
                      </div>
                      <div className="field">
                        <label className="label">Stop</label>
                        <div className="control is-expanded date-picker-wrapper has-icons-left">
                          <DatePicker
                            name="stop"
                            selected={new Date(values.stop || addDays(new Date(), 1))}
                            onChange={(value) => {
                              setFieldValue('stop', value);
                            }}
                            className="input is-fullwidth"
                            placeholderText="Select stop date"
                            minDate={addDays(new Date(), 1)}
                            maxDate={addDays(new Date(), 21)}
                          />
                          <span className="icon is-small is-left">
                            <i className="fas fa-calendar" />
                          </span>
                          {errors.stop && touched.stop ? <span className="help is-danger">{errors.stop}</span> : <br />}
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                <footer className="modal-card-foot">
                  <button className="button is-success" type="submit">
                    Save changes
                  </button>
                  <button className="button" onClick={() => props.toggleModal(false)}>
                    Cancel
                  </button>
                </footer>
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

const MANAGE_TEAMLEAD = gql`
  mutation createTeamLead($input: CreateTeamLeadInput!) {
    createTeamLead(input: $input) {
      id
      teamUniqueId
      creator
      start
      stop
      userId
    }
  }
`;

export default ManageTeamLeadModal;
