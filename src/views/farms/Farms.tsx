import React from 'react'
import Farm from 'components/Farm/Farm'
import styles from './Farms.module.scss'

function Farms() {
	return (
		<div className={styles.farms__wrap}>
			<div className={styles.farms}>
				<Farm pair='DOGS/BUSD' core='core' />
				<Farm pair='DOGS/WBNB' core='core' />
				<Farm pair='DOGS/BUSD' core='core' />
				<Farm pair='DOGS/WBNB' core='core' />
				<Farm pair='DOGS/WBNB' core='core' />
				<Farm pair='DOGS/WBNB' core='core' />
				<Farm pair='DOGS/WBNB' core='core' />
				<Farm pair='DOGS/WBNB' core='core' />
			</div>
		</div>
	)
}

export default Farms
