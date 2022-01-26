import React from 'react'
import style from './chartLoading.module.css'

function ChartLoading() {
	return (
		<div>
			<div className={style.loading}>
				<div className={style.loading1} />
				<div className={style.loading2} />
				<div className={style.loading3} />
				<div className={style.loading4} />
				<div className={style.loading5} />
				<div className={style.loading6} />
				{/* <div className={style.loading7} /> */}
			</div>
		</div>
	)
}

export default ChartLoading
