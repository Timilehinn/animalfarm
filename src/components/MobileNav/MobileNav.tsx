import React from 'react'
import styles from './MobileNav.module.scss'
import { Icon } from '@iconify/react';
import { useAppDispatch } from 'state/hooks';
import { toggleMobileNav } from 'state/toggle';
import { useAppSelector } from 'state/hooks';

function MobileNav() {

    const dispatch = useAppDispatch()
    const isNavActive = useAppSelector((state)=>state.toggleReducer.isMobileNavActive)

    const toggleNav = ( ) => {
        dispatch(toggleMobileNav(!isNavActive))
    }
  return (
    <div className={styles.mobilenav}>
        <nav>
            <h3>AnimalFarm</h3>
            <Icon onClick={()=>toggleNav()} icon="dashicons:menu" />
        </nav>
    </div>
  )
}

export default MobileNav