import axios from 'axios'
import React, { useEffect, useState } from 'react'

import { key } from '../../assets/apiKey'
import styles from './styles.module.scss'

export const Body = () => {
  const [data, setData] = useState<any[]>([])
  const [loaded, setLoaded] = useState<boolean>(false)
  const [totalItems, setTotalItems] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=javascript&maxResults=30&key=${key}`,
        )
        const books = resp.data.items || []
        const totalItemsCount = resp.data.totalItems
        setTotalItems(totalItemsCount)
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
        <>
          <p className={styles.Body__text}>Found {totalItems} results</p>
          <div className={styles.Body__books}>
            {data.map((e) => (
              <div key={e.id} className={styles.Body__books__item}>
                <img
                  src={e.volumeInfo.imageLinks.thumbnail}
                  alt="Thumbnail"
                  className={styles.Body__books__item__img}
                />
                <div className={styles.Body__books__item__link}>
                  <a href="/">{e.volumeInfo.categories}</a>
                </div>
                <div className={styles.Body__books__item__name}>
                  {e.volumeInfo.title}
                </div>
                <div className={styles.Body__books__item__authors}>
                  {e.volumeInfo.authors.join(', ')}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}
