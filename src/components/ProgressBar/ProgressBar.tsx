import React from 'react'
import './ProgressBar.scss'

interface progressBarProps {
	progress: string
}

function ProgressBarr({ progress }: progressBarProps) {
	let percent
	if (Number(progress) > 100) {
		percent = '100'
	} else {
		percent = progress
	}

	return (
		<div className='bar'>
			<div style={{ width: `${percent}%` }} className='bar__in'>
				{}
			</div>
		</div>
	)
}

export default ProgressBarr
