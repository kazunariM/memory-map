import Head from 'next/head'
import { useState } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
const Map = dynamic(() => import('@/map/display'), { ssr: false })

import styles_index from '@/styles/index.module.scss'
import styles from '@/styles/detail.module.scss'

import Header from '@/components/header'
import Side from '@/components/side'

export default function Detail() {
    const router = useRouter();
    const { event_id } = router.query;
    
    const [locations, setLocations] = useState<Array<any>>()
    

    return (
        <>
        <Head>
            <title>イベント詳細 | 思い出マップ</title>
        </Head>

        <Header />

        <main className={styles_index.main}>

            <Side />

            <section className={styles.contents}>
                <h2>イベント詳細</h2>

                <div className={styles.container}>
                    <div className={styles.container_detail}>
                        <div className={styles.container_column}>
                            <p>{ event_id }</p>
                            <p className={styles.text}>テキスト</p>
                            <div className={styles.spread}>画像</div>
                        </div>
                        <div className={styles.container_column}>
                            <div className={styles.map}><Map lat={null} lon={null}/></div>
                            <p className={styles.spread}>詳細</p>
                        </div>
                    </div>
                    <div className={styles.locations}>
                        <div>ロケーション</div>
                        <div>ロケーション</div>
                        <div>ロケーション</div>
                    </div>
                </div>
            </section>
        </main>
        </>
    )
}