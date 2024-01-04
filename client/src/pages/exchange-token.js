import '@/config';
import { verifyUser } from '../api/strava';
import Head from 'next/head';

export default function ExchangeToken() {
  const isUser = verifyUser();
  return (
    <>
      <Head>
        <title>Redirecting - { global.config.i18n.siteTitle.en }</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="container mx-auto">
          <p>...Redirecting</p>
        </div>
      </main>
    </>
  )
}
