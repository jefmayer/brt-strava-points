import Head from 'next/head';
import React from 'react';

export default function RequestAccess() {
  return (
    <>
      <Head>
        <title>Bicycle Ranch Strava Points</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="container mb-6 mt-12 mx-auto">
          <h1 className="font-bold text-5xl text-center">Request Access</h1>
        </div>
      </main>
    </>
  );
}
