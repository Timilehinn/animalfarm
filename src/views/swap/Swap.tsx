import React from 'react'
import SwapComp from 'components/Swap/Swap'
import styles from './Swap.module.scss'

function Swap() {
	return (
		<div className={styles.swap}>
			<div className={styles.swapcomp} >
				<SwapComp />
			</div>
		</div>
	)
}

export default Swap
