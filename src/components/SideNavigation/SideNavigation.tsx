import React from 'react'
import { Link } from 'react-router-dom'
import styles from './SideNavigation.module.scss'
import logo from '../../assets/svgg.png'
import home from '../../assets/home.png'
import shop from '../../assets/shop.png'
import book from '../../assets/book.png'

function SideNavigation() {
  return (
    <div className={styles.side}>
        <header>
            <img src={logo} alt="" />
            <h3>Animal Farm</h3>
            
        </header>
        <ul>
            <Link className={styles.link} to="/">
                <img src={home} alt="" />
                <p>Home</p>
            </Link>
            <Link className={styles.link} to="pigs-credit" >
                <img src={shop} alt="" />
                <p>Pigs Credit</p>
            </Link>
            <li className={styles.link}>
                <img src={book} alt="" />
                <p>Pigs Pen</p>
            </li>
            <li className={styles.link}>
                <img src={shop} alt="" />
                <p>Piggy Bank</p>
            </li>
        </ul>
        <div className={styles.side__coinprice}>
            <div className={styles.side__coinprice__in}>
                <ul>
                    <li>
                        <img src={logo} alt="" />
                        <p>$146</p>
                    </li>
                    <li>
                        <img src={logo} alt="" />
                        <p>$146</p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default SideNavigation