import Head from 'next/head'
import Image from 'next/image'
import { FC, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
const Map = dynamic(() => import('@/map/click'), { ssr: false })

import styles_index from '@/styles/index.module.scss'

import Header from '@/components/header'
import Side from '@/components/side'
import ImageUpload from '@/img/upload'

const Edit: FC = () => {
    const [image, setImage] = useState<string | ArrayBuffer | null>(null)
    const [exifLat, setexifLat] = useState<number | null>(null)
    const [exifLon, setexifLon] = useState<number | null>(null)
    const [exifDate, setexifDate] = useState<string | null>(null)

    const [Lat, setLat] = useState<number | null>(null)
    const [Lon, setLon] = useState<number | null>(null)
    
    const changeLatLon = ( lat: number, lon: number ) => {
        setLat(lat)
        setLon(lon)
    }

    useEffect(() => {
        setLat(exifLat)
        setLon(exifLon)
    }, [exifLat, exifLon])

    const uploadImg = (date: string|null, src: string|ArrayBuffer|null, lat: number|null, lon: number|null) => {
        setImage(src)
        setexifDate(date)
        setexifLat(lat)
        setexifLon(lon)
    }

    return (
        <>
        <Head>
            <title>ロケーション追加 | 思い出マップ</title>
        </Head>
        
        <Header />

        <main className={styles_index.main}>
            
            <Side />

            <section>
                <h2>ロケーション追加画面</h2>

            </section>
        </main>
        </>
    )
}

export default Edit