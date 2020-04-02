import { Fragment } from 'react';
import Link from 'next/link';

import Header from '../components/Header';
import TeamDetails from '../components/TeamDetails';
import TeamLeadDetails from '../components/TeamLeadDetails';


const ViewTeam = () => {
  return (
    <Fragment>
      <Header />
      <section className="section">
        <div className="container">
          <nav className="level">
            <div className="level-left">
              <div className="level-item">
                <p className="subtitle is-5">
                  Team: <strong>Zebra</strong>
                </p>
              </div>
            </div>

            <div className="level-right">
              <p className="level-item">
                Team ID: &nbsp; <strong>57DU9OuY</strong>
              </p>
              <p className="level-item">
                <span className="icon">
                  <i className="far fa-copy"></i>
                </span>
              </p>
            </div>
          </nav>

          <TeamLeadDetails />

          <TeamDetails />
          
          {/* <section className="section">
            <div className="container has-text-centered">
              <div className="flex-center m-b-3">
                <figure className="image has-text-centered">
                  <img src="/images/empty.png" />
                </figure>
              </div>
              <Link href="/create-team-members">
                <a className="button theme-color-bg has-text-white has-text-weight-bold">Create Team Members</a>
              </Link>
            </div>
          </section> */}
        </div>
      </section>
    </Fragment>
  );
}

export default ViewTeam;
