import Head from 'next/head'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { Key, useEffect, useState } from 'react'
import { Inter } from 'next/font/google'

const Map = dynamic(() => import('@/map/display'), { ssr: false })

import styles from '@/styles/index.module.scss'

import Header from '@/components/header'
import Side from '@/components/side'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [events, setEvents] = useState<Array<any>|null>(null)
  const [lat, setLat] = useState<number|null>(null)
  const [lon, setLon] = useState<number|null>(null)

  useEffect(() => {
    setEvents([
      {
        uuid: "01234567-89ab-cdef-0123-456789abcdef",
        title: "aaa",
        lat: 35.65811861690838,
        lon: 139.70142772467423,
        member: [
          {
            username: "aさん"
          },
        ]
      },
    ])
  }, [])

  const changeLatLon = (uid: string) => {
    const items = events?.filter(event => event.uuid === uid)
    if (items) {
      setLat(items[0].lat)
      setLon(items[0].lon)
    }
  }

  const toArray = () => {
    const items = []
    let data: any
    if (events) for (data of events) {
      items.push(
        <div className={styles.event} onClick={() => changeLatLon(data.uuid)}>
          <p><Link href={`/event/${data.uuid}/`}>{data.title}</Link></p>
          <p>{ data.member.map((user: any, index: Key)=><span key={index}>{user.username}</span>) }</p>
        </div>
    )}
    return items
  }

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
            <Map lat={lat} lon={lon}/>
          </div>
          <div className={styles.list_area}>
            <div>
              {events ? toArray() : <p className={styles.empty}>投稿がありません</p>}
            </div>
          </div>
        </div>

      </main>
    </>
  )
}
