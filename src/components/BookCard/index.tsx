import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { PropsWithChildren } from 'react'

import styles from './styles.module.scss'

export interface BookInfo {
  id?: string
}

export const BookCard = (props: PropsWithChildren<BookInfo>) => {
  const [data, setData] = useState<any>()

  useEffect(() => {
    const fetchData = async () => {
      const resp = await axios.get(
        `https://www.googleapis.com/books/v1/volumes/${props.id}`,
      )
      const book = resp.data
      setData(book)
    }

    fetchData()
  }, [])

  return (
    <div>
      {data ? (
        <div className={styles.Card}>
          <div className={styles.Card__img}>
            <img src={data.volumeInfo.imageLinks.thumbnail} alt="img" />
          </div>
          <div className={styles.Card__text}>
            <p>{data.volumeInfo.categories}</p>
            <h1>{data.volumeInfo.title}</h1>
            <p>{data.volumeInfo.authors}</p>
            <div className={styles.Card__text__description}>{data.volumeInfo.description}</div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}
