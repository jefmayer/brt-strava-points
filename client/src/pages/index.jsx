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

import GoogleMap from '../components/maps/all-segments/map';
import Head from 'next/head';
import Header from '../components/header';
import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Routes from '../routes';
import { connect } from 'react-redux';
import { getUserId } from '../utils/localstorage-utils';
import styles from '../styles/segments-map.module.scss';

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
    const segmentCt = segments ? segments.length : 0;
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
                  <p className=" mb-6 text-xl">See how we measure up on the most the leg-sapping segments in and around Tucson, Arizona.</p>
                  <div className="flex">
                    <Link
                      className="btn btn-secondary"
                      href={Routes.Standings}
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
                  src="/images/brt-group-ride-1.jpg"
                  width={375}
                />
              </div>
            </div>
          </div>
          <div>
            <div className={styles.homepage}>
              <GoogleMap
                lat={32.274132}
                lng={-110.9103777}
                segments={segments}
                zoom={10}
              />
            </div>
            <div className="max-w-7xl mx-auto py-6">
              <h2 className="font-extrabold mb-3 text-6xl text-center text-brt-red">The chase is always on.</h2>
              <p className="max-w-md mx-auto text-center text-xl">The battle for the top spot on the leaderboard is fought across these { segmentCt} Strava climbs.</p>
            </div>
          </div>
          <div className="py-32">
            <div className="items-center flex max-w-7xl mx-auto">
              <div className="w-1/2">
                <Image
                  alt=""
                  height={300}
                  src="/images/brt-group-ride-2.jpg"
                  width={600}
                />
              </div>
              <div className="w-1/2 flex justify-center">
                <div className="max-w-80">
                  <h2 className="font-extrabold mb-3 text-6xl text-brt-red">How <a href="https://www.strava.com/athletes/760273" className="underline hover:no-underline">Alex</a> claims it works:</h2>
                  <ol className="list-decimal text-xl">
                    <li className="mb-2">Every rider who completes a segment will score points</li>
                    <li className="mb-2">The fastest time always receives 10 points</li>
                    <li className="mb-2">The rest of the riders receive points based on an  <a className="underline hover:no-underline" href="https://en.wikipedia.org/wiki/Exponential_decay">exponential decay*</a> scoring system</li>
                  </ol>
                </div>
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
