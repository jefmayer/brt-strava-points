import React from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function RequestAccess() {
  return (
    <>
      <Head>
        <title>Bicycle Ranch Strava Points</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <h1 className="text-3xl font-bold">
            Sign-Up
          </h1>
        </div>
      </main>
    </>
  );
}
