import React from 'react'
import { Link } from 'react-router-dom'
import styles from './SideNavigation.module.scss'
import logo from '../../assets/svgg.png'
import home from '../../assets/home.png'
import shop from '../../assets/shop.png'
import book from '../../assets/book.png'
import home__svg from '../../assets/home__svg.svg'
import { Icon } from '@iconify/react';

function SideNavigation() {
  return (
    <div className={styles.side}>
        <header>
            <img src={logo} alt="" />
            <h3>Animal Farm</h3>
            
        </header>
        <ul>
            <Link className={styles.link} to="/">
                <Icon icon="clarity:home-line" />
                <p>Home</p>
            </Link>
            <Link className={styles.link} to="pigs-credit" >
                <Icon icon="iconoir:small-shop" />
                <p>Pigs Credit</p>
            </Link>
            <Link to="" className={styles.link}>
                <Icon icon="fluent:book-20-regular" />
                <p>Pigs Pen</p>
            </Link>
            <Link to="" className={styles.link}>
                <Icon icon="iconoir:piggy-bank" />
                <p>Piggy Bank</p>
            </Link>
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