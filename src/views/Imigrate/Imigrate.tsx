import React, { useEffect } from 'react'
import styles from './Imigrate.module.scss'
import pig from '../../assets/pigs.png'
import pigdog from '../../assets/dogg.png'
import curve from '../../assets/curve.png'

function Migrate() {
	useEffect(() => {
		document.body.setAttribute(
			'style',
			`
		background-image: url(${window.location.origin}/bg/try.png);
		background-size: cover;
		background-position: center;
		background-attachment: fixed;
		background-repeat: no-repeat;
		background-color: rgb(24, 24, 24);`
		)
	}, [])

	return (
		<div className={styles.migrate}>
			<p className={styles.migratep}>PIGS Credit, Piggy Bank, and PIG Pen WILL ALL BE GOING LIVE THURSDAY MAY, 12TH.</p>
			<p className={styles.migratep2}>WE WILL THEN RELEASE INSTRUCTIONS ON DOGS CREDITING.</p>
			<p className={styles.migratep3}>`The vast possibilities of our great future will become realities only if we make ourselves responsible for that future`</p>
			<p className={styles.p4}>—Gifford Pinchot</p>
			<div>
				<img style={{ marginRight: '30px' }} src={pig} alt='' />
				<img src={pigdog} alt='' />
			</div>
			<img id={styles.curve} src={curve} alt='' />
		</div>
	)
}

export default Migrate
