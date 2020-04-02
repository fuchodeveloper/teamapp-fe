import { Fragment } from 'react';

const TeamLeadDetails = () => {
  return (
    <Fragment>
      <section className="section">
        <div className="container has-text-centered">
          <div className="table-container notification">
            <table className="table is-fullwidth is-striped bg-transparent">
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
                <tr>
                  <th>1</th>
                  <td>John</td>
                  <td>Doe</td>
                  <td>Wed, 15 Oct. 2020</td>
                  <td>Thu, 23 Oct. 2020</td>
                  <td>
                    <a href="https://en.wikipedia.org/wiki/Leicester_City_F.C." title="Leicester City F.C.">
                      View
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </Fragment>
  );
}

export default TeamLeadDetails;
