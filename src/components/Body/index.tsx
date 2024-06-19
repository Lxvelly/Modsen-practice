import axios from 'axios'
import React, { useEffect, useState } from 'react'

import { key } from '../../assets/apiKey'
import styles from './styles.module.scss'

export const Body = () => {
  const [data, setData] = useState<any[]>([])
  const [loaded, setLoaded] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=:keyes&key=${key}`,
        )
        const books = resp.data.items || []
        setData(books)
        setLoaded(true)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])

  return (
    <div className={styles.Body}>
      {loaded ? (
        <div className={styles.Body__books}>
          {data.map((e) => (
            <div key={e.id} className={styles.Body__books__item}>
              {e.volumeInfo.title}
            </div>
          ))}{' '}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}
