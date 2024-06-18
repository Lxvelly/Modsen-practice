import React from 'react'

import styles from './styles.module.scss'

export const Header = () => {
  return (
    <div className={styles.Header}>
      <h1 className={styles.Header__h1}> Search for books </h1>
      <form className={styles.Header__form}>
        <input className={styles.Header__form__input} type="text" />
        <button className={styles.Header__form__btn}>
          {/* TODO: search onClick */}
          <img
            src="./src/assets/SearchIcon.svg"
            alt="search"
            width={30}
            height={30}
          />
        </button>
      </form>
    </div>
  )
}
