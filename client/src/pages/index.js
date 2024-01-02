import Head from 'next/head'
import { Lexend_Peta } from '@next/font/google'
import styles from '@/styles/Home.module.css'

const lexandPeta = Lexend_Peta({ subsets: ['latin'] })

export default function Home() {
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
          <h1 className={`${lexandPeta.className} text-3xl font-bold`}>
            Bicycle Ranch Strava Points
          </h1>
        </div>
      </main>
    </>
  )
}
