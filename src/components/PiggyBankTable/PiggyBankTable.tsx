import React from 'react'
import PiggyBankRow from 'components/PiggyBankRow/PiggyBankRow'
import style from './PiggyBankTable.module.scss'

function ReferralTable() {

    const refdata = [{
        id: 1,
        piglets: 1234567,
        trufflesavailable: 1234567,
        trufflesvalue: 12345678,
        time: 456789,
        maxpayout:4454565
    },
    {
        id: 2,
        piglets: 1234567,
        trufflesavailable: 1234567,
        trufflesvalue: 12345678,
        time: 456789,
        maxpayout:4454565
    },
    {
        id: 3,
        piglets: 1234567,
        trufflesavailable: 1234567,
        trufflesvalue: 12345678,
        time: 456789,
        maxpayout:4454565
    },
    {
        id: 4,
        piglets: 1234567,
        trufflesavailable: 1234567,
        trufflesvalue: 12345678,
        time: 456789,
        maxpayout:4454565
    },
    {
        id: 5,
        piglets: 1234567,
        trufflesavailable: 1234567,
        trufflesvalue: 12345678,
        time: 456789,
        maxpayout:4454565
    },
    {
        id: 6,
        piglets: 1234567,
        trufflesavailable: 1234567,
        trufflesvalue: 12345678,
        time: 456789,
        maxpayout:4454565
    },
    {
        id: 7,
        piglets: 1234567,
        trufflesavailable: 1234567,
        trufflesvalue: 12345678,
        time: 456789,
        maxpayout:4454565
    },
    {
        id: 8,
        piglets: 1234567,
        trufflesavailable: 1234567,
        trufflesvalue: 12345678,
        time: 456789,
        maxpayout:4454565
    },
    {
        id: 9,
        piglets: 1234567,
        trufflesavailable: 1234567,
        trufflesvalue: 12345678,
        time: 456789,
        maxpayout:4454565
    },
    {
        id: 10,
        piglets: 1234567,
        trufflesavailable: 1234567,
        trufflesvalue: 12345678,
        time: 456789,
        maxpayout:4454565
    },
    {
        id: 11,
        piglets: 1234567,
        trufflesavailable: 1234567,
        trufflesvalue: 12345678,
        time: 456789,
        maxpayout:4454565
    },
    {
        id: 12,
        piglets: 1234567,
        trufflesavailable: 1234567,
        trufflesvalue: 12345678,
        time: 456789,
        maxpayout:4454565
    },
    {
        id: 13,
        piglets: 1234567,
        trufflesavailable: 1234567,
        trufflesvalue: 12345678,
        time: 456789,
        maxpayout:4454565
    },
    {
        id: 14,
        piglets: 1234567,
        trufflesavailable: 1234567,
        trufflesvalue: 12345678,
        time: 456789,
        maxpayout:4454565
    },
    {
        id: 15,
        piglets: 1234567,
        trufflesavailable: 1234567,
        trufflesvalue: 12345678,
        time: 456789,
        maxpayout:4454565
    },
    {
        id: 16,
        piglets: 1234567,
        trufflesavailable: 1234567,
        trufflesvalue: 12345678,
        time: 456789,
        maxpayout:4454565
    },
    {
        id: 17,
        piglets: 1234567,
        trufflesavailable: 1234567,
        trufflesvalue: 12345678,
        time: 456789,
        maxpayout:4454565
    },
    {
        id: 18,
        piglets: 1234567,
        trufflesavailable: 1234567,
        trufflesvalue: 12345678,
        time: 456789,
        maxpayout:4454565
    },
    {
        id: 19,
        piglets: 1234567,
        trufflesavailable: 1234567,
        trufflesvalue: 12345678,
        time: 456789,
        maxpayout:4454565
    },
    {
        id: 20,
        piglets: 1234567,
        trufflesavailable: 1234567,
        trufflesvalue: 12345678,
        time: 456789,
        maxpayout:4454565
    },
    {
        id: 21,
        piglets: 1234567,
        trufflesavailable: 1234567,
        trufflesvalue: 12345678,
        time: 456789,
        maxpayout:4454565
    },
    {
        id: 22,
        piglets: 1234567,
        trufflesavailable: 1234567,
        trufflesvalue: 12345678,
        time: 456789,
        maxpayout:4454565
    },
    {
        id: 23,
        piglets: 1234567,
        trufflesavailable: 1234567,
        trufflesvalue: 12345678,
        time: 456789,
        maxpayout:4454565
    },
    {
        id: 24,
        piglets: 1234567,
        trufflesavailable: 1234567,
        trufflesvalue: 12345678,
        time: 456789,
        maxpayout:4454565
    },
    {
        id: 25,
        piglets: 1234567,
        trufflesavailable: 1234567,
        trufflesvalue: 12345678,
        time: 456789,
        maxpayout:4454565
    },
    {
        id: 26,
        piglets: 1234567,
        trufflesavailable: 1234567,
        trufflesvalue: 12345678,
        time: 456789,
        maxpayout:4454565
    },
    {
        id: 27,
        piglets: 1234567,
        trufflesavailable: 1234567,
        trufflesvalue: 12345678,
        time: 456789,
        maxpayout:4454565
    },
    {
        id: 28,
        piglets: 1234567,
        trufflesavailable: 1234567,
        trufflesvalue: 12345678,
        time: 456789,
        maxpayout:4454565
    },
    {
        id: 29,
        piglets: 1234567,
        trufflesavailable: 1234567,
        trufflesvalue: 12345678,
        time: 456789,
        maxpayout:4454565
    },
    {
        id: 30,
        piglets: 1234567,
        trufflesavailable: 1234567,
        trufflesvalue: 12345678,
        time: 456789,
        maxpayout:4454565
    }
]

    return (
        <div>
            <div className={style.tableheader}>
                <h4>My Piggybanks  <span className={style.totalpiggybank}> {refdata.length}</span></h4>
            </div>
            <div className={style.tablebody}>
                <table className={style.table}>
                    <thead>
                        <tr>
                            <th>S/N</th>
                            <th>Piglets</th>
                            <th>Truffles available</th>
                            <th>Truffles value</th>
                            <th>Time remaining</th>
                            <th>Max payout</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {refdata.map((data) => (
                        <PiggyBankRow
                                id={data.id} 
                                piglets={data.piglets} 
                                trufflesavailable={data.trufflesavailable} 
                                trufflesvalue={data.trufflesvalue} 
                                time={data.time} 
                                maxpayout={data.maxpayout} />
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ReferralTable