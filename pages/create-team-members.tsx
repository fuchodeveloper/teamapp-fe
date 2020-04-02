import { Fragment } from 'react';
import Link from 'next/link';

import Header from '../components/Header';

const CreateTeamMembers = () => {
  return (
    <Fragment>
      <Header />
      <section className="hero">
        <div className="hero-body">
          <div className="container">
            <div className="card card-wrapper">
              <div className="card-content content-padding">
                <div className="has-text-centered m-b-3">
                  <h2 className="title">Create Team Members</h2>
                </div>
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">1.</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <p className="control is-expanded has-icons-left">
                        <input className="input" type="text" placeholder="First Name" />
                        <span className="icon is-small is-left">
                          <i className="fas fa-user" />
                        </span>
                      </p>
                    </div>
                    <div className="field">
                      <p className="control is-expanded has-icons-left has-icons-right">
                        <input className="input is-success" type="email" placeholder="Last Name" />
                        <span className="icon is-small is-left">
                          <i className="fas fa-user"></i>
                        </span>
                        <span className="icon is-small is-right">
                          <i className="fas fa-check"></i>
                        </span>
                      </p>
                    </div>
                    <div className="field">
                      <p className="control is-expanded has-icons-left has-icons-right">
                        <input
                          className="input is-success"
                          type="email"
                          placeholder="Email Address"
                          value="alex@smith.com"
                        />
                        <span className="icon is-small is-left">
                          <i className="fas fa-envelope"></i>
                        </span>
                        <span className="icon is-small is-right">
                          <i className="fas fa-check"></i>
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">2.</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <p className="control is-expanded has-icons-left">
                        <input className="input" type="text" placeholder="First Name" />
                        <span className="icon is-small is-left">
                          <i className="fas fa-user" />
                        </span>
                      </p>
                    </div>
                    <div className="field">
                      <p className="control is-expanded has-icons-left has-icons-right">
                        <input className="input is-success" type="email" placeholder="Last Name" />
                        <span className="icon is-small is-left">
                          <i className="fas fa-user"></i>
                        </span>
                        <span className="icon is-small is-right">
                          <i className="fas fa-check"></i>
                        </span>
                      </p>
                    </div>
                    <div className="field">
                      <p className="control is-expanded has-icons-left has-icons-right">
                        <input
                          className="input is-success"
                          type="email"
                          placeholder="Email Address"
                          value="alex@smith.com"
                        />
                        <span className="icon is-small is-left">
                          <i className="fas fa-envelope"></i>
                        </span>
                        <span className="icon is-small is-right">
                          <i className="fas fa-check"></i>
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="field is-horizontal">
                  <div className="field-label"></div>
                  <div className="field-body">
                    <div className="field">
                      <div className="control has-text-right">
                        {/* <button className="button has-text-white has-text-weight-bold theme-color-bg m-r-1 no-border">
                          Add field
                        </button> */}
                        <Link href="/">
                          <button className="button has-text-weight-bold is-light">Add field</button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <hr />

                <div className="field is-horizontal">
                  <div className="field-label"></div>
                  <div className="field-body">
                    <div className="field">
                      <div className="control has-text-right">
                        <button className="button has-text-white has-text-weight-bold theme-color-bg m-r-1 no-border">
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
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}

export default CreateTeamMembers;
