import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Head from 'next/head';
import '../config';
import RedirectComponent from '../components/redirect';
import { updateStandings } from '../actions';

class Standings extends Component {
  constructor(props) {
    console.log('standings loaded');
    super(props);
    this.onupdateStandings = this.onupdateStandings.bind(this);
  }

  onupdateStandings(event) {
    const { dispatch } = this.props;
    event.preventDefault();
    dispatch(updateStandings());
  }

  render() {
    const {
      role,
      isAuthenticated,
      isAuthenticatedError,
    } = this.props;
    const redirectCondition = !isAuthenticated || isAuthenticatedError;
    return (
      <>
        <Head>
          <title>{ global.config.i18n.siteTitle.en }</title>
          <meta name="description" content="" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          { redirectCondition
              && (
                <RedirectComponent
                  route="/"
                />
              )}
          <div className="container mx-auto">
            <div className="flex my-5">
              <div>
                <h1 className="font-bold text-xl">Standings</h1>
                <p className="text-xs">
                  Role:&nbsp;
                  { role }
                </p>
                <p className="text-xs">Last updated on: </p>
              </div>
              <div>
                <button
                  className="btn btn-primary"
                  onClick={this.onupdateStandings}
                  type="button"
                >
                  Update Standings
                </button>
              </div>
            </div>
            <table className="table-auto">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Rider</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </>
    );
  }
}

Standings.propTypes = {
  dispatch: PropTypes.func,
  isAuthenticated: PropTypes.bool,
  isAuthenticatedError: PropTypes.bool,
  role: PropTypes.string,
};

const mapStateToProps = (state) => {
  const { userStatus } = state;
  const {
    isAuthenticated,
    isAuthenticatedError,
    role,
  } = userStatus;
  return {
    isAuthenticated,
    isAuthenticatedError,
    role,
  };
};

export default connect(mapStateToProps)(Standings);
