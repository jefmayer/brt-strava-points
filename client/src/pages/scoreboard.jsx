import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Head from 'next/head';
import '../config';
import { updateScoreboard } from '../actions';

class Scoreboard extends Component {
  constructor(props) {
    super(props);
    const { isAuthenticated } = props;
    // Check if user is logged in...
    console.log(isAuthenticated);
    this.onUpdateScoreboard = this.onUpdateScoreboard.bind(this);
    // Get users
  }

  onUpdateScoreboard(event) {
    const { dispatch } = this.props;
    event.preventDefault();
    dispatch(updateScoreboard());
  }

  render() {
    return (
      <>
        <Head>
          <title>{ global.config.i18n.siteTitle.en }</title>
          <meta name="description" content="" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <div className="container mx-auto">
            <div className="flex my-5">
              <div>
                <h1 className="font-bold text-xl">Scoreboard</h1>
                <p className="text-sm">Last updated on: </p>
              </div>
              <div>
                <button
                  className="btn btn-primary"
                  onClick={this.onUpdateScoreboard}
                  type="button"
                >
                  Update Scoreboard
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

Scoreboard.propTypes = {
  dispatch: PropTypes.func,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => {
  const { userStatus } = state;
  const {
    isAuthenticated,
  } = userStatus;
  return {
    isAuthenticated,
  };
};

export default connect(mapStateToProps)(Scoreboard);
