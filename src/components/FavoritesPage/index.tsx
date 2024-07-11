import React from 'react'
import { PropsWithChildren } from 'react'

import styles from './styles.module.scss'

export interface favProps {
  favArr: any[]
}

export const FavoritesPage = (props: PropsWithChildren<favProps>) => {
  console.log(props.favArr)

  return (
    <div className={styles.books}>
      {props.favArr.map((e) => (
        <div key={e.id}>
          <div className={styles.books__item}>
            {e.img && (
              <img
                src={e.img}
                alt="Thumbnail"
                className={styles.books__item__img}
              />
            )}
            <div className={styles.books__item__link}>
              <a href="/">{e.category || 'No Category'}</a>
            </div>
            <div className={styles.books__item__name}>
              {e.title || 'No Title'}
            </div>
            <div className={styles.books__item__authors}>
              {e.author ? e.author.join(', ') : 'No Authors'}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
