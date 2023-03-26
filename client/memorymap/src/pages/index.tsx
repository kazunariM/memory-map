import axios from 'axios'
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
    async function fetchData() {
        const res = await axios.get(`http://127.0.0.1:8000/api/events/`)
        setEvents(res.data)
    }

    fetchData()
  }, [])

  const changeLatLon = (uid: string) => {
    if (events) {
      const item = events.find(elm => {
        return elm.uuid === uid
      })
      if (item) {
        setLat(item.lat)
        setLon(item.lon)
      }
    }
  }

  const toArray = () => {
    const items = []
    let data: any
    if (events) for (data of events) {
      const uuid = data.uuid
      items.push(
        <div className={styles.event} onClick={() => changeLatLon(uuid)}>
          <p><Link href={`/event/${data.uuid}/`}>{data.title}</Link></p>
          <p>{data.hold_date}</p>
          {data.member && <p>{ data.member.map((user: any, index: Key)=><span key={index}>{user.username}</span>) }</p>}
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
