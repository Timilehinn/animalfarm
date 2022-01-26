import React from 'react'
import style from './jaguarWidget.module.css'
import stroke from '../../assets/img/maximize-1.png'
import rec from '../../assets/img/rec.png'

function Jaquar() {
    return (
        <div className={style.jaq}>
            <nav>
              
                <ul>
                    <li>
                        <img src={rec} alt="" />
                    </li>
                    <li className={style.jaq__li2} >
                        <h3>Jaquar</h3>
                        {/* <p className={style.token}>Keep track of your bsc token</p> */}
                    </li>
                    <li >
                        <img src={stroke} alt="" />
                    </li>
                </ul>
            
            </nav>
            <div className={style.transaction}>
                <p>Market cap</p>
                <p>$89,414,685,272</p>
                <p style={{color:'red'}}>1.98%</p>
            </div>
        </div>
    )
}

export default Jaquar
