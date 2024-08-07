import axios from 'axios'
import React, { useEffect, useState } from 'react'

import { key } from '../../assets/apiKey'
import { BookCard } from '../BookCard'
import { FavoritesPage } from '../FavoritesPage'
import styles from './styles.module.scss'

export const MainPage = () => {
  const [data, setData] = useState<any[]>([])
  const [loaded, setLoaded] = useState<boolean>(false)
  const [totalItems, setTotalItems] = useState(0)
  const [inputValue, setInputValue] = useState('')
  const [storedValue, setStoredValue] = useState('')
  const [category, setCategory] = useState('')
  const [sort, setSort] = useState('relevance')
  const [index, setIndex] = useState(0)
  const [isSelected, setIsSelected] = useState(false)
  const [selectedId, setSelectedId] = useState('')
  const [favorites, setFavorites] = useState<any[]>([])
  const [isSelectedFavorite, setIsSelectedFavorite] = useState(false)

  const handleInputChange = (event: any) => {
    // Не знаю как типизировать правильно, по идеи string надо, но .target с string не  работает
    setInputValue(event.target.value)
  }

  const handleButtonClick = (e: any) => {
    // Не знаю как типизировать правильно, по идеи string надо, но e.preventDefault() с string не  работает
    e.preventDefault()
    if (storedValue != inputValue) {
      setLoaded(false)
    }
    setStoredValue(inputValue)
    setIsSelected(false)
  }

  const handleCategoryChange = (e: string) => {
    setCategory(e)
    setLoaded(false)
  }

  const handleSortingChange = (e: string) => {
    setSort(e)
    setLoaded(false)
  }

  const handleBackClick = () => {
    setIsSelected(false)
  }

  const handleFavClick = (
    id: any,
    img: any,
    category: any,
    title: any,
    author: any,
  ) => {
    const info = {
      id: id,
      img: img,
      category: category,
      title: title,
      author: author,
    }
    setFavorites([...favorites, info])
  }

  useEffect(() => {
    const fetchData = async () => {
      const resp = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q="${storedValue}"+subject:"${category}"&orderBy=${sort}&maxResults=30&startIndex=${index}&key=${key}`,
      )
      const books = resp.data.items || []
      const totalItemsCount = resp.data.totalItems
      setTotalItems(totalItemsCount)
      setData(books)
      setLoaded(true)
    }

    fetchData()
  }, [storedValue, category, sort, index])

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
        <div>
          <button onClick={() => setIsSelectedFavorite(true)}>
            Show favorites
          </button>
        </div>
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
          isSelected ? (
            <>
              <button
                className={styles.Body__backBtn}
                onClick={() => handleBackClick()}>
                Back
              </button>

              <button
                className={styles.Body__backBtn}
                onClick={() => handleBackClick()}>
                Back
              </button>
              <BookCard id={selectedId} />
            </>
          ) : isSelectedFavorite ? (
            <FavoritesPage favArr={favorites} />
          ) : (
            <>
              <p className={styles.Body__text}>Found {totalItems} results</p>
              <div className={styles.Body__books}>
                {data.map((e) => (
                  <div key={e.id} className={styles.Body__books__item}>
                    <button
                      className={styles.Body__books__item__fav}
                      onClick={() =>
                        handleFavClick(
                          e.id,
                          e.volumeInfo.imageLinks.thumbnail,
                          e.volumeInfo.categories,
                          e.volumeInfo.title,
                          e.volumeInfo.authors,
                        )
                      }>
                      {
                        <p> Add to favorites</p>
                        // No work on deploy =(
                        /* <img 
                        src="./src/assets/favicon.png"
                        alt="fav"
                        width={30}
                        height={30}></img> */
                      }
                    </button>
                    <button
                      className={styles.Body__books__item__btn}
                      onClick={() => (
                        setSelectedId(e.id), setIsSelected(true)
                      )}>
                      {e.volumeInfo.imageLinks &&
                        e.volumeInfo.imageLinks.thumbnail && (
                          <img
                            src={e.volumeInfo.imageLinks.thumbnail}
                            alt="Thumbnail"
                            className={styles.Body__books__item__img}
                          />
                        )}
                      <div className={styles.Body__books__item__link}>
                        <a href="/">
                          {e.volumeInfo.categories || 'No Category'}
                        </a>
                      </div>
                      <div className={styles.Body__books__item__name}>
                        {e.volumeInfo.title || 'No Title'}
                      </div>
                      <div className={styles.Body__books__item__authors}>
                        {e.volumeInfo.authors
                          ? e.volumeInfo.authors.join(', ')
                          : 'No Authors'}
                      </div>
                    </button>
                  </div>
                ))}
              </div>
              <div className={styles.Body__moreBtn}>
                <button
                  className={styles.Body__moreBtn__btn}
                  onClick={() => {
                    setIndex(index + 30),
                      window.scrollTo(0, 0),
                      setLoaded(false)
                  }}>
                  Load more
                </button>
              </div>
            </>
          )
        ) : (
          <div className={styles.Loading}>
            <div className={styles.Loading__pic} />
          </div>
        )}
      </div>
    </nav>
  )
}
