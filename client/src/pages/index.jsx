import '../config';

import React, { Component } from 'react';
import {
  authenticate,
  getSegments,
} from '../api/brt';
import {
  login,
  updateSegments,
  updateUserSessionData,
} from '../actions';

import Head from 'next/head';
import Header from '../components/header';
import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserId } from '../utils/localstorage-utils';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const id = getUserId();
    const { dispatch } = this.props;
    authenticate(id)
      .then((data) => {
        if (data.success) {
          dispatch(updateUserSessionData(data));
          dispatch(login());
        }
      });
    getSegments()
      .then((data) => {
        dispatch(updateSegments(data));
      });
  }

  render() {
    const { segments } = this.props;
    return (
      <>
        <Head>
          <title>{ global.config.i18n.siteTitle.en }</title>
          <meta name="description" content="" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        <main>
          <div className="bg-neutral-100 py-32">
            <div className="items-center flex max-w-7xl mx-auto">
              <div className="w-1/2">
                <div className="max-w-lg">
                  <Image
                    alt=""
                    className="mb-4"
                    height={59}
                    src="/images/brt-strava-logo-lockup.svg"
                    width={407}
                  />
                  <h1 className="font-extrabold mb-8 text-7xl">
                    Bicycle Ranch
                    <br />
                    Strava Points
                    <br />
                    Challenge
                  </h1>
                  <p className=" mb-6 text-xl">See how we measure up on the most the leg-sapping segments around Tucson and southwest Arizona.</p>
                  <div className="flex">
                    <Link
                      className="btn btn-secondary"
                      href="/standings"
                    >
                      View Standings
                    </Link>
                  </div>
                </div>
              </div>
              <div className="flex justify-end w-1/2">
                <Image
                  alt=""
                  height={500}
                  priority={true}
                  src="/images/brt-group-ride.jpg"
                  width={375}
                />
              </div>
            </div>
          </div>
          <div>
            <div className="max-w-7xl mx-auto py-6">
              <h2 className="font-extrabold mb-3 text-6xl text-center text-brt-red">The chase is always on.</h2>
              <p className="max-w-md mx-auto text-center text-xl">The battle for the top spot on the leaderboard is fought across these { segments.length } Strava climbs.</p>
            </div>
          </div>
          <div className="py-32">
            <div className="items-center flex max-w-7xl mx-auto">
              <div className="w-1/2">
              </div>
              <div className="w-1/2">
                <h2 className="font-extrabold mb-3 text-6xl text-brt-red">How Alex claims it works:</h2>
                <ol>
                  <li>Every rider who completes a segment will score points</li>
                  <li>The fastest time always receives 10 points</li>
                  <li>The rest of the riders receive points based on an  exponential decay* scoring system</li>
                </ol>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }
}

Home.propTypes = {
  dispatch: PropTypes.func,
  segments: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = (state) => {
  const {
    appData,
  } = state;
  const {
    segments,
  } = appData;
  return {
    segments,
  };
};

export default connect(mapStateToProps)(Home);
