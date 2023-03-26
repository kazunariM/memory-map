import axios from 'axios'
import Cookies from 'js-cookie';
import Head from 'next/head'
import Image from 'next/image'
import { ChangeEvent, FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
const Map = dynamic(() => import('@/map/click'), { ssr: false })

import styles_index from '@/styles/index.module.scss'
import styles from '@/styles/event_post.module.scss'

import Header from '@/components/header'
import Side from '@/components/side'
import ImageUpload from '@/img/upload'

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const Post: FC = () => {
    const router = useRouter()

    const [image, setImage] = useState<string | ArrayBuffer | null>(null)
    const [exifLat, setexifLat] = useState<number | null>(null)
    const [exifLon, setexifLon] = useState<number | null>(null)
    const [exifDate, setexifDate] = useState<string | null>(null)

    const [Lat, setLat] = useState<number | null>(null)
    const [Lon, setLon] = useState<number | null>(null)

    const [Title, setTitle] = useState<string>()
    const [Text, setText] = useState<string>()
    
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

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    const changeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value)
    }

    const handleSubmit = async () => {
        
        const res_csrf = await axios.get('http://127.0.0.1:8000/api/csrf/')
        Cookies.set('csrftoken', res_csrf.data.csrftoken);
        if (Title && image && Lat && Lon) {
            const data = {
                title: Title,
                text: Text,
                // thumbnail: image,
                hold_date: exifDate ? (exifDate.slice(0,10).replace(/:/g, '-') + 'T' + exifDate.slice(11)) : null,
                lat: Lat,
                lon: Lon
            }

            const headers = {
                'Content-Type': 'application/json',
            };

            const response = await axios.post('http://localhost:8000/api/event/', data, {headers: headers})

            router.push('/')

        } else {
            window.alert('入力してください')
        }
    }

    return (
        <>
        <Head>
            <title>イベント作成 | 思い出マップ</title>
        </Head>
        
        <Header />

        <main className={styles_index.main}>
            
            <Side />

            <section className={styles.contents}>
                <h2>投稿画面</h2>
                <div className={styles.post_area}>
                    <div className={styles.post_area_top}>
                        <p>イベントを投稿しよう！</p>
                        <button onClick={handleSubmit}>作成</button>
                    </div>
                    <div className={styles.post_area_container}>
                        <div className={styles.post_area_media}>
                            <ImageUpload loadedData={uploadImg}/>
                            <div>{image ? <Image src={image.toString()} layout={"fill"} objectFit={"contain"} objectPosition={"50% 50%;"} alt="" /> : <p><small>画像を選択してください</small></p>}</div>
                        </div>
                        <div className={styles.post_area_input}>
                            <input type="text" name="" placeholder='イベントタイトル' value={Title} onChange={changeTitle}/>
                            <textarea name="" id="" placeholder='投稿本文' value={Text} onChange={changeText}></textarea>
                            <span>中心地を選んでください</span>
                            <Map lat={Lat} lon={Lon} changeLatLon={changeLatLon}/>
                            {(Lat && Lon) ? <span>{Lat},{Lon}</span> : <span>選択されていません</span>}
                        </div>
                    </div>
                </div>
            </section>
        </main>
        </>
    )
}

export default Post