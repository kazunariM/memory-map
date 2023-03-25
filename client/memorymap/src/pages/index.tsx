import Head from 'next/head'
import dynamic from 'next/dynamic'
import { Inter } from 'next/font/google'

const Map = dynamic(() => import('@/map/display'), { ssr: false })

import styles from '@/styles/index.module.scss'

import Header from '@/components/header'
import Side from '@/components/side'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>思い出マップ</title>
      </Head>

      <Header />
      
      <main className={styles.main}>

        <Side />

        <div className={styles.contents}>
          <div className={styles.map_area}>
            <form><label>検索</label><input type="text" /></form>
            <Map />
          </div>
          <div className={styles.list_area}>
            <div>
              <p>event</p>
            </div>
          </div>
        </div>

      </main>
    </>
  )
}
