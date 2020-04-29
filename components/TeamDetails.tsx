import { Fragment } from 'react';

const TeamDetails = ({ members }: { members: { id: string; length: number; map: Function } }) => {
  return (
    <Fragment>
      <section className="section">
        <div className="container has-text-centered">
          <h4 className="subtitle is-4 has-text-weight-bold align-left m-b-1">Team Roster</h4>
          <div className="table-container notification">
            <table className="table is-fullwidth is-striped bg-transparent">
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
                    <abbr>Email Address</abbr>
                  </th>
                </tr>
              </thead>
              <tbody>
                {members?.length ? (
                  <Fragment>
                    {members.map(
                      (
                        member: { id: string; firstName: string; lastName: string; start: string; email: string },
                        index: number,
                      ) => {
                        return (
                          <tr key={member.id}>
                            <th>{index + 1}</th>
                            <td>{member.firstName}</td>
                            <td>{member.lastName}</td>
                            <td>{member.email}</td>
                          </tr>
                        );
                      },
                    )}
                  </Fragment>
                ) : (
                  <Fragment>
                    <tr>
                      <td>Nothing to show.</td>
                    </tr>
                  </Fragment>
                )}
              </tbody>
            </table>
          </div>
          <div className="has-text-right">
            <button className="button" disabled>
              Add Team Members
            </button>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default TeamDetails;
