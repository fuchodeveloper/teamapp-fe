import format from 'date-fns/format';
import { Fragment, useState } from 'react';
import ManageTeamLeadModal from './team/ManageTeamLeadModal';

const TeamLeadDetails = (props: any) => {
  const { uniqueId, lead, user, members } = props || {};
  const [showModal, setShowModal] = useState(false);

  const renderModal = () => {
    return (
      <ManageTeamLeadModal
        uniqueId={uniqueId}
        user={user}
        showModal={showModal}
        members={members}
        toggleModal={toggleModal}
        {...props}
      />
    );
  };

  const toggleModal = (val: boolean) => {
    setShowModal(val);
  };

  return (
    <Fragment>
      <section className="section">
        <div className="container has-text-centered">
          <div className="table-container notification">
            <table className="table is-fullwidth bg-transparent">
              <caption>
                <h3 className="subtitle is-3 has-text-weight-bold align-left m-b-1">Current Team Lead</h3>
              </caption>
              <thead>
                <tr>
                  <th>
                    <abbr title="Position">#</abbr>
                  </th>
                  <th>
                    <abbr title="Position">First Name</abbr>
                  </th>
                  <th>
                    <abbr title="Played">Last Name</abbr>
                  </th>
                  <th>
                    <abbr title="Won">From</abbr>
                  </th>
                  <th>
                    <abbr title="Drawn">To</abbr>
                  </th>
                  <th>
                    <abbr title="Lost">Responsibilities</abbr>
                  </th>
                </tr>
              </thead>
              <tbody>
                {lead?.id ? (
                  <Fragment>
                    <tr>
                      <th>1</th>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{format(new Date(lead.start), 'E, dd MMM. yyyy')}</td>
                      <td>{format(new Date(lead.stop), 'E, dd MMM. yyyy')}</td>
                      <td>
                        <a title="">
                          View duties
                        </a>
                      </td>
                    </tr>
                  </Fragment>
                ) : (
                  <Fragment>
                    <tr>
                      <td style={{ width: '10rem' }}>No team lead.</td>
                    </tr>
                  </Fragment>
                )}
              </tbody>
            </table>
          </div>
          <div className="has-text-right">
            <button className="button" onClick={() => toggleModal(true)}>
              Manage Team Lead
            </button>
          </div>
        </div>
        {showModal && renderModal()}
      </section>
    </Fragment>
  );
};

export default TeamLeadDetails;
