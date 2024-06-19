import axios from 'axios'
import React, { useEffect, useState } from 'react'

import styles from './styles.module.scss'

export const Body = () => {
  const key = 'AIzaSyDcH3ab8575hvkzDCJbrei1UaaiO2HsCCY'

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
    <div>
      {loaded ? (
        <div> {data.map((e) => e.accessInfo.country)} </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}
