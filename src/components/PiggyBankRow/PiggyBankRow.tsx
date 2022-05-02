import React, { useState } from 'react'
import style from './PiggyBankRow.module.scss'
import up from "../../assets/up.svg"
import down from "../../assets/down.svg"

function PiggyBankRow(props) {

    const { id, piglets, trufflesavailable, trufflesvalue, time, maxpayout} = props
    const [state, showModal] = useState(false)

    return (
            <tr className={style.tr}>
                <td >{id}</td>
                <td>{piglets}</td>
                <td >{trufflesavailable}</td>
                <td >{trufflesvalue}</td>
                <td >{time}</td>
                <td >{ maxpayout}</td>
                <td >
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
