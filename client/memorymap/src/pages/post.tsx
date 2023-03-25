import Head from 'next/head'
import Image from 'next/image'
import { FC, useState } from 'react'

import styles_index from '@/styles/index.module.scss'
import styles from '@/styles/event_post.module.scss'

import Header from '@/components/header'
import Side from '@/components/side'
import ImageUpload from '@/img/upload'

const Post: FC = () => {
    const [image, setImage] = useState<string | ArrayBuffer | null>(null)

    const uploadImg = (img: string | ArrayBuffer | null) => {
        setImage(img)
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
                        <button>作成</button>
                    </div>
                    <div className={styles.post_area_container}>
                        <div className={styles.post_area_media}>
                            <ImageUpload loadedData={uploadImg}/>
                            <div>{image ? <Image src={image.toString()} layout={"fill"} objectFit={"contain"} objectPosition={"50% 50%;"} alt="" /> : <p><small>画像を選択してください</small></p>}</div>
                        </div>
                        <div className={styles.post_area_input}>
                            <input type="text" name="" placeholder='イベントタイトル'/>
                            <textarea name="" id="" placeholder='投稿本文'></textarea>
                        </div>
                    </div>
                </div>
            </section>
        </main>
        </>
    )
}

export default Post