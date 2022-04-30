import React from 'react'
import style from './ReferralRow.module.scss'

function ReferralRow(props) {

    const { id, address, amount, date, locktime} = props
    return (
            <tr className={style.tr}>
                <td className={style.td}>{id}</td>
                <td className={style.td}>{address}</td>
                <td className={style.td}>{amount}</td>
                <td className={style.td}>{date}</td>
                <td className={style.td}>{locktime}</td>
            </tr>
    )
}

export default ReferralRow
