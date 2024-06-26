import axios from 'axios'
import React, { useEffect, useState } from 'react'

import { key } from '../../assets/apiKey'
import styles from './styles.module.scss'

export const Body = () => {
  const [data, setData] = useState<any[]>([])
  const [loaded, setLoaded] = useState<boolean>(false)
  const [totalItems, setTotalItems] = useState(0)
  const [inputValue, setInputValue] = useState('')
  const [storedValue, setStoredValue] = useState('')
  const [category, setCategory] = useState('')
  const [sort, setSort] = useState('relevance')

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value)
  }

  const handleButtonClick = (e: any) => {
    e.preventDefault()
    if (storedValue != inputValue) {
      setLoaded(false)
    }
    setStoredValue(inputValue)
  }

  const handleCategoryChange = (e: any) => {
    setCategory(e)
    setLoaded(false)
  }

  const handleSortingChange = (e: any) => {
    setSort(e)
    setLoaded(false)
  }

  useEffect(() => {
    const fetchData = async () => {
      const resp = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q="${storedValue}"+subject:"${category}"&orderBy=${sort}&maxResults=30&key=${key}`,
      )
      const books = resp.data.items || []
      const totalItemsCount = resp.data.totalItems
      setTotalItems(totalItemsCount)
      setData(books)
      setLoaded(true)
    }

    fetchData()
  }, [storedValue, category, sort])

  return (
    <nav>
      <div className={styles.Header}>
        <h1 className={styles.Header__h1}> Search for books </h1>
        <form className={styles.Header__form}>
          <input
            className={styles.Header__form__input}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
          />
          <button
            className={styles.Header__form__btn}
            onClick={(e) => handleButtonClick(e)}>
            <img
              src="./src/assets/SearchIcon.svg"
              alt="search"
              width={30}
              height={30}
            />
          </button>
        </form>
        <div className={styles.Header__selectors}>
          Categories
          <select
            name="category"
            value={category}
            onChange={(event) => handleCategoryChange(event.target.value)}
            className={styles.Header__selectors__selector}>
            <option id="0" value={''}>
              All
            </option>
            <option id="1" value={'art'}>
              Art
            </option>
            <option id="2" value={'biography'}>
              Biography
            </option>
            <option id="3" value={'computers'}>
              Computers
            </option>
            <option id="4" value={'history'}>
              History
            </option>
            <option id="5" value={'medical'}>
              Medical
            </option>
            <option id="6" value={'poetry'}>
              Poetry
            </option>
          </select>
          Sorting by
          <select
            name="sorting"
            value={sort}
            onChange={(event) => handleSortingChange(event.target.value)}
            className={styles.Header__selectors__selector}>
            <option id="0" value={'relevance'}>
              Relevance
            </option>
            <option id="1" value={'newest'}>
              Newest
            </option>
          </select>
        </div>
      </div>
      <div className={styles.Body}>
        {loaded ? (
          <>
            <p className={styles.Body__text}>Found {totalItems} results</p>
            <div className={styles.Body__books}>
              {data.map((e) => (
                <div key={e.id} className={styles.Body__books__item}>
                  {e.volumeInfo.imageLinks &&
                    e.volumeInfo.imageLinks.thumbnail && (
                      <img
                        src={e.volumeInfo.imageLinks.thumbnail}
                        alt="Thumbnail"
                        className={styles.Body__books__item__img}
                      />
                    )}
                  <div className={styles.Body__books__item__link}>
                    <a href="/">{e.volumeInfo.categories || 'No Category'}</a>
                  </div>
                  <div className={styles.Body__books__item__name}>
                    {e.volumeInfo.title || 'No Title'}
                  </div>
                  <div className={styles.Body__books__item__authors}>
                    {e.volumeInfo.authors
                      ? e.volumeInfo.authors.join(', ')
                      : 'No Authors'}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className={styles.Loading}>
            <div className={styles.Loading__pic} />
          </div>
        )}
      </div>
    </nav>
  )
}
