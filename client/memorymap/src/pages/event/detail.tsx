import Head from 'next/head'
import dynamic from 'next/dynamic'
const Map = dynamic(() => import('@/map/display'), { ssr: false })

import styles_index from '@/styles/index.module.scss'
import styles from '@/styles/detail.module.scss'

import Header from '@/components/header'
import Side from '@/components/side'

export default function Detail() {
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
                            <p>タイトル</p>
                            <p>テキスト</p>
                            <div className={styles.spread}>画像</div>
                        </div>
                        <div className={styles.container_column}>
                            <div className={styles.map}><Map /></div>
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