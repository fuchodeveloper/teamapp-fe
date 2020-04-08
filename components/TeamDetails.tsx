import { Fragment } from "react"

const TeamDetails = ({ members }: { members: { id: string, length: number, map: Function } }) => {
  return (
    <Fragment>
      <section className="section">
        <div className="container has-text-centered">
          <div className="table-container notification">
            <table className="table is-fullwidth is-striped bg-transparent">
              <caption>
                <h3 className="subtitle is-3 has-text-weight-bold align-left m-b-1">Team Roster</h3>
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
                    <abbr title="Played">Manage</abbr>
                  </th>
                </tr>
              </thead>
              <tbody>
                {members?.length ? (
                  <Fragment>
                    {members.map((member: { id: string; firstName: string; lastName: string }, index: number) => {
                      return (
                        <tr key={member.id}>
                          <th>{index + 1}</th>
                          <td>{member.firstName}</td>
                          <td>{member.lastName}</td>
                          <td>
                            <button className="button">Edit</button>
                          </td>
                        </tr>
                      );
                    })}
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
        </div>
      </section>
    </Fragment>
  );
}

export default TeamDetails;
