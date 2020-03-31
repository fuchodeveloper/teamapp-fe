import { Fragment } from 'react';
import Link from "next/link";

import Header from '../components/Header';

const SignUp = () => {
  return (
    <Fragment>
      <Header />
      <section className="hero">
        <div className="hero-body">
          <div className="container">
            <div className="card card-wrapper">
              <div className="card-content content-padding">
                <div className="has-text-centered m-b-3">
                  <h2 className="title">Create Account</h2>
                </div>
                {/* <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">Name</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <p className="control is-expanded has-icons-left">
                        <input
                          className="input"
                          type="text"
                          placeholder="First Name"
                        />
                        <span className="icon is-small is-left">
                          <i className="fas fa-user" />
                        </span>
                      </p>
                    </div>
                    <div className="field">
                      <p className="control is-expanded has-icons-left has-icons-right">
                        <input
                          className="input is-success"
                          type="email"
                          placeholder="Last Name"
                        />
                        <span className="icon is-small is-left">
                          <i className="fas fa-envelope" />
                        </span>
                        <span className="icon is-small is-right">
                          <i className="fas fa-check"></i>
                        </span>
                      </p>
                    </div>
                  </div>
                </div> */}

                <div className="field is-horizontal m-b-2">
                  <div className="field-label is-normal">
                    <label className="label">First Name</label>
                  </div>
                  <div className="field-body">
                    <div className="field is-expanded">
                      <div className="field">
                        {/* <p className="control">
                          <a className="button is-static">+44</a>
                        </p> */}
                        <p className="control is-expanded">
                          <input className="input" type="tel" />
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="field is-horizontal m-b-2">
                  <div className="field-label is-normal">
                    <label className="label">Last Name</label>
                  </div>
                  <div className="field-body">
                    <div className="field is-expanded">
                      <div className="field">
                        {/* <p className="control">
                          <a className="button is-static">+44</a>
                        </p> */}
                        <p className="control is-expanded">
                          <input className="input" type="tel" />
                        </p>
                      </div>
                      {/* <p className="help">Do not enter the first zero</p> */}
                    </div>
                  </div>
                </div>

                <div className="field is-horizontal m-b-2">
                  <div className="field-label is-normal">
                    <label className="label">Email Address</label>
                  </div>
                  <div className="field-body">
                    <div className="field is-expanded">
                      <div className="field">
                        <p className="control is-expanded">
                          <input className="input" type="tel" />
                        </p>
                      </div>
                      {/* <p className="help">Do not enter the first zero</p> */}
                    </div>
                  </div>
                </div>

                <div className="field is-horizontal m-b-2">
                  <div className="field-label is-normal">
                    <label className="label">Password</label>
                  </div>
                  <div className="field-body">
                    <div className="field is-expanded">
                      <div className="field">
                        <p className="control is-expanded">
                          <input className="input" type="tel" />
                        </p>
                      </div>
                      <p className="help">Do not enter the first zero</p>
                    </div>
                  </div>
                </div>

                {/* <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">Subject</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <div className="control">
                        <input
                          className="input is-danger"
                          type="text"
                          placeholder="e.g. Partnership opportunity"
                        />
                      </div>
                      <p className="help is-danger">This field is required</p>
                    </div>
                  </div>
                </div> */}

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
                          <a className="button has-text-weight-bold theme-color-text">
                            Go Back
                          </a>
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

export default SignUp;
