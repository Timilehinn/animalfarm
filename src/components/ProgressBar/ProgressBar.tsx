import React from 'react'
import './ProgressBar.scss'

interface progressBarProps {
	progress: string
}

function ProgressBarr({ progress }: progressBarProps) {
	return (
		<div className='bar'>
			<div style={{ width: `${progress}%` }} className='bar__in'>
				{}
			</div>
		</div>
	)
}

export default ProgressBarr
