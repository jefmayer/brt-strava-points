import '@/config';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

// import styles from '@/styles/Home.module.css';

export default function Home() {
  return (
    <>
      <Head>
        <title>{ global.config.i18n.siteTitle.en }</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="bg-white border-solid border border-gray-200 container flex mt-5 mx-auto overflow-hidden rounded-lg">
          <div className="px-24 py-72 w-1/2">
            <Image
              alt=""
              className="mb-2"
              height={80}
              src="/images/brt-logo.svg"
              width={234}
            />
            <h1 className="font-bold mb-3 text-5xl">
              Bicycle Ranch<br />Strava Points<br />Challenge
            </h1>
            <p className=" mb-4 text-lg">See how you measure up on the all the leg-sapping segments you know and love around Tucson and southwest Arizona.</p>
            <div className="flex">
              <Link
                className="btn mr-2"
                href={ process.env.NEXT_PUBLIC_STRAVA_AUTHORIZATION_URL }
              >Sign In</Link>
              <Link
                className="action-link"
                href="/"
              >Request Access</Link>
            </div> 
          </div>
          <div className="relative w-1/2 ">
          <Image
            alt=""
            fill
            style={{objectFit: "cover"}}
            src="/images/brt-group-ride.jpg"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          </div>
        </div>
      </main>
    </>
  )
}
