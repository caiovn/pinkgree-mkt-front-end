import Head from 'next/head'
import { Input } from '../components'
import styles from './search.module.scss'

export default function Search() {
  return (
    <>
      <Head>
        <title>Search.</title>
      </Head>
      <section>
        <h1>Search</h1>
        <div className={styles.inputWrapper}>
          <Input placeholder='Pesquisar' width="100%" />
          <button className={styles.button}>
            <i className="fas fa-search"></i>
          </button>
        </div>
      </section>
    </>
  )
}
