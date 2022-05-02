import React, { useState } from 'react'
import style from './PiggyBankRow.module.scss'
import up from "../../assets/up.svg"
import down from "../../assets/down.svg"

function PiggyBankRow(props) {

    const { id, piglets, trufflesavailable, trufflesvalue, time, maxpayout} = props
    const [state, showModal] = useState(false)

    return (
            <tr className={style.tr}>
                <td className={style.td}>{id}</td>
                <td className={style.td}>{piglets}</td>
                <td className={style.td}>{trufflesavailable}</td>
                <td className={style.td}>{trufflesvalue}</td>
                <td className={style.td}>{time}</td>
                <td className={style.td}>{ maxpayout}</td>
                <td className={style.td}>
                    <div className={style.action}>
                        <button className={style.button} type='button' onClick={() => showModal(!state)} >
                            Action 
                            {state === false ? <img src={up} alt="" />  :<img src={down} alt=""/>}
                        </button>
                        <div className={state ? style.modal : style.modal_off}>
                            <button type='button' className={style.modal__button}>Sell</button><hr/>
                            <button type='button' className={style.modal__button}>compound</button><hr/>
                            <button type='button' className={style.modal__button}>Deposit</button>
                        </div>
                    </div>
                </td>
            </tr>
    )
}

export default PiggyBankRow
