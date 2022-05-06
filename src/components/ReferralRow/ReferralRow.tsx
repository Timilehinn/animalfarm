import React from 'react'
import style from './ReferralRow.module.scss'

function ReferralRow(props) {

    const { id, address, amount, date, locktime} = props

   
    const datee = (timestamp ) => {

        const d = new Date(timestamp * 1000).toLocaleDateString()

        // return d.getHours() + ":" + d.getMinutes() + ", " + d.toDateString();
        return d
        console.log( date );
    }
    return (
        <tr className={style.tr}>
            <td className={style.td}>{id}</td>
            <td className={style.td}>{address}</td>
            <td className={style.td}>{amount}</td>
            <td className={style.td}>{datee(Number(date))}</td>
            <td className={style.td}>{Number(locktime) > 1 ? `${locktime} weeks` : `${locktime} week` }</td>
        </tr>
    )
}

export default ReferralRow
