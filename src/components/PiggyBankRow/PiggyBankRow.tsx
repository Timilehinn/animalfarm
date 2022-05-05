import React, { useState } from 'react'
import { useAppDispatch } from 'state/hooks'
import { toggleModalBackDrop,toggleDepositModal } from 'state/toggle'
import { BigNumber } from 'bignumber.js'
import { sellPiglets,compound } from 'api/piggyBank/getMyPiggyBanks'
import style from './PiggyBankRow.module.scss'
import up from "../../assets/up.svg"
import down from "../../assets/down.svg"

import useActiveWeb3React from '../../hooks/useActiveWeb3React'





function PiggyBankRow(props) {

    const { id, piglets, trufflesavailable, truffleLocker, trufflesvalue, time, maxpayout} = props
    const [state, showModal] = useState(false)
    const dispatch = useAppDispatch()
    const { library } = useActiveWeb3React()
    const signer = library.getSigner()

    const openDepositModal = () => {
        dispatch( toggleDepositModal(true) )
        dispatch( toggleModalBackDrop(true) )
    }

    function secondsToString(seconds) {
        const secondsMaxxed = Math.max(seconds, 0)
        const numdays = Math.floor(secondsMaxxed / 86400)
        const numhours = Math.floor((secondsMaxxed % 86400) / 3600)
        const numminutes = Math.floor(((secondsMaxxed % 86400) % 3600) / 60)
        const numseconds = ((secondsMaxxed % 86400) % 3600) % 60
        const endstr = ''
        // return numhours + "h " + numminutes + "m "//+numseconds+"s";
        return `${numdays}d ${numhours}h ${numminutes}m`
    }

    function getRemainingTime(){
        const durationTimestamp = truffleLocker?.durationTimestamp
        const startLockTimestamp = truffleLocker?.startLockTimestamp
        const timeNow = Date.now() / 1000
        const endDate = Number(startLockTimestamp) + Number(durationTimestamp)

        return secondsToString(Math.round(endDate - timeNow))
    }

    


    const _sellPiglets = async ()=> {

        try{
            const res = await sellPiglets(id,signer)
            console.log(res,"sold piglet")

        }catch(err){
            console.log(err)
        }
        
    }
    const _compound = async ()=> {

        try{
            const res = await compound(id,signer)
            console.log(res,"compounded")

        }catch(err){
            console.log(err)
        }
        
    }

    return (
            <tr className={style.tr}>
                <td >{id}</td>
                <td>{new BigNumber(piglets).toString() }</td>
                <td >{trufflesavailable}</td>
                <td >{trufflesvalue}</td>
                <td >{getRemainingTime()}</td>
                <td >{maxpayout}</td>
                <td >
                    <div className={style.action}>
                        <button className={style.button} type='button' onClick={() => showModal(!state)} >
                            Action 
                            {state === false ? <img src={up} alt="" />  :<img src={down} alt=""/>}
                        </button>
                        <div className={state ? style.modal : style.modal_off}>
                            <button onClick={()=>_sellPiglets()} type='button' className={style.modal__button}>Sell</button><hr/>
                            <button onClick={()=>_sellPiglets()} type='button' className={style.modal__button}>compound</button><hr/>
                            <button onClick={()=>openDepositModal()} type='button' className={style.modal__button}>Deposit</button>
                        </div>
                    </div>
                </td>
            </tr>
    )
}

export default PiggyBankRow
