import styles from '@/styles/index.module.scss'
import Link from 'next/link'

const Side = () => {
    return (
        <div className={styles.side}>
          <aside>
            <ul>
              <li><Link href={"/"}>ホーム</Link></li>
              <li><Link href={"/post/"}>投稿</Link></li>
              <li><Link href={"/profile/"}>アカウント</Link></li>
            </ul>
          </aside>
        </div>
    )
}

export default Side