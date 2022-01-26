import React from 'react'
import style from './fakeVault.module.css'

function FakeVault() {
    return (
        <div>
            <div className={style.fake}>
				<div className={style.box1}>
					<header>{}</header>
					<div className={style.general__over}>{}</div>
					<div className={style.switch}>{}</div>
				</div>
				<div className={style.box2}>
					<div className={style.box2__chart}>
						{/* <BarChart  data={getVaultData()} /> */}
                        <div className={style.circle}>{}</div>
						{/* <div className={style.chart__text}>
							<p>$2.7K</p>
						</div> */}
					</div>
					
					<div className={style.overall}>
						<div className={style.fake__p}>{}</div>
                        <div className={style.small}>{}</div>
						<div className={style.fake__h3}>{}</div>
						<div className={style.fake__h33}>{}</div>
					</div>
				</div>
				<div className={style.box3}>
					<div className={style.line}>{}</div>
				</div>
				<div className={style.box4}>{}</div>
			</div>
        </div>
    )
}

export default FakeVault
