import { Fragment } from 'react';
import Link from 'next/link';

import Header from '../components/Header';

const CreateAccount = () => {
  return (
    <Fragment>
      <Header />
      <section className="hero">
        <div className="hero-body">
          <div className="container">
            <div className="card card-wrapper">
              <div className="card-content content-padding">
                <div className="has-text-centered m-b-3">
                  <h2 className="title">Create New Team</h2>
                </div>
                <div className="field is-horizontal m-b-2">
                  <div className="field-label is-normal">
                    <label className="label">Team Name</label>
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

                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">Responsibilties</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <div className="control">
                        <textarea
                          className="textarea"
                          placeholder="Enter description of responsibilities or a link to an exising document."
                        ></textarea>
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

export default CreateAccount;
