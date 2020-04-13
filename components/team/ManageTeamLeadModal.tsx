import { Fragment, useState } from 'react';
import classnames from 'classnames';
import DatePicker from 'react-datepicker';

interface Props {
  showModal: boolean;
  toggleModal: Function;
  user: {
    id: string;
    firstName: string;
    lastName: string;
  };
}

const ManageTeamLeadModal = (props: Props) => {
  const showModalClass = classnames({ 'is-active': props.showModal });
  const [teamLeadName, setTeamLeadName] = useState('');
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div className={`modal ${showModalClass}`}>
      <div className="modal-background" onClick={() => props.toggleModal(false)}></div>
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
                <select
                  value={teamLeadName}
                  onChange={() => setTeamLeadName(`${props?.user?.firstName} ${props?.user?.lastName}`)}
                >
                  <option>{teamLeadName}</option>
                </select>
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
                    selected={startDate}
                    onChange={(date: Date) => setStartDate(date)}
                    className="input is-fullwidth"
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-calendar" />
                  </span>
                </div>
              </div>
              <div className="field">
                <label className="label">Stop</label>
                <div className="control is-expanded date-picker-wrapper has-icons-left">
                  <DatePicker
                    selected={startDate}
                    onChange={(date: Date) => setStartDate(date)}
                    className="input is-fullwidth"
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-calendar" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <footer className="modal-card-foot">
          <button className="button is-success">Save changes</button>
          <button className="button" onClick={() => props.toggleModal(false)}>
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};

export default ManageTeamLeadModal;
