import format from 'date-fns/format';
import { Fragment, useState } from 'react';
import ManageTeamLeadModal from './team/ManageTeamLeadModal';
import Link from 'next/link';
import Cookies from 'js-cookie';

const TeamLeadDetails = (props: any) => {
  const { uniqueId, lead, user, members } = props || {};
  const [showModal, setShowModal] = useState(false);
  const authUserTeamId = Cookies.get('_ut');
  const isUserCreator = uniqueId === authUserTeamId

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
          <h4 className="subtitle is-4 has-text-weight-bold align-left m-b-1">Current Team Lead</h4>
          <div className="table-container notification">
            <table className="table is-fullwidth bg-transparent">
              <thead>
                <tr>
                  <th>
                    <abbr>S/N</abbr>
                  </th>
                  <th>
                    <abbr>First Name</abbr>
                  </th>
                  <th>
                    <abbr>Last Name</abbr>
                  </th>
                  <th>
                    <abbr>From</abbr>
                  </th>
                  <th>
                    <abbr>To</abbr>
                  </th>
                  <th>
                    <abbr>Responsibilities</abbr>
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
                        <a>View duties</a>
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
            {/* <button className="button" onClick={() => toggleModal(true)}>
              Manage Team Lead
            </button> */}
            {isUserCreator && (
              <Link href={`/teams/${uniqueId}/manage`}>
                <a className="button has-text-white has-text-weight-bold theme-color-bg no-border">Edit Team</a>
              </Link>
            )}
          </div>
        </div>
        {showModal && renderModal()}
      </section>
    </Fragment>
  );
};

export default TeamLeadDetails;
