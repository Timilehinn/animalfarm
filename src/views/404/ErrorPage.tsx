import React from 'react'
import { Link } from 'react-router-dom'
import styles from './ErrorPage.module.scss'


function ErrorPage() {
  return (
    <div className={styles.err} >
      <h3>Error 404</h3>
      <p>Page not found</p>
      <Link  to="/" >Back to home page</Link>
    </div>
  )
}

export default ErrorPage