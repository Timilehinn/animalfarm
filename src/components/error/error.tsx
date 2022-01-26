import React from 'react'
import error from '../../assets/img/error.png'
import style from './error.module.css'


function Error() {
    return (
        <div className={style.error}>
            <img src={error} alt="" />
            <p>Chart data not available.</p>
        </div>
    )
}

export default Error
