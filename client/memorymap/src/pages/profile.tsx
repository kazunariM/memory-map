import Head from 'next/head'

import styles_index from '@/styles/index.module.scss'
import styles from '@/styles/profile.module.scss'

import Header from '@/components/header'
import Side from '@/components/side'

export default function Profile() {
    return (
        <>
        <Head>
            <title>プロフィール編集 | 思い出マップ</title>
        </Head>

        <Header />

        <main className={styles_index.main}>
            
            <Side />

            <section>
                <h2>プロフィール編集</h2>
                <form action="">
                    <div className={styles.field}></div>
                    <div className={styles.field}>
                        <label htmlFor="name">表示名</label>
                        <input type="text" id="name" />
                    </div>
                </form>
            </section>

        </main>
        </>
    )
}

