import React from 'react'
import styled from 'styled-components'
import styles from './RangeSlider.module.scss'

interface rangeProps {
	color: string
	lockDuration: number
	setLockDuration: any
}

const sliderThumbStyles = (props: rangeProps) => `
  width: 10px;
  height: 10px;
  background: ${props.color};
  cursor: pointer;
  border-radius : 50%;
  cursor:pointer;
  outline: 3px solid #F3BA2FE5;
  opacity: 0.3;
  -webkit-transition: .2s;
  transition: opacity .2s;
  
`

const Styles = styled.div`
	display: flex;
	align-items: center;
	color: #888;
	margin-top: 2rem;
	margin-bottom: 2rem;
	.value {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 14px;
		border: 1px solid #ffffff4d;
		padding: 5px;
		border-radius: 5px;
		margin-left: 10px;
	}
	.slider {
		flex: 6;
		-webkit-appearance: none;
		width: 100%;
		height: 3px;
		border-radius: 5px;
		background: #424242;
		outline: none;
		&::-webkit-slider-thumb {
			-webkit-appearance: none;
			appearance: none;
			${(props: rangeProps) => sliderThumbStyles(props)}
		}
		&::-moz-range-thumb {
			${(props: rangeProps) => sliderThumbStyles(props)}
		}
	}
`

function RangeSlider({ color, lockDuration, setLockDuration }: rangeProps) {
	const handleChange = (e: any) => {
		setLockDuration(e.target.value)
	}

	return (
		<div className={styles.range} color={color}>
			<input type='range' min={0} max={156} value={lockDuration} className={styles.slider} onChange={(e) => handleChange(e)} />
			<div className={styles.value}>{lockDuration} weeks</div>
		</div>
	)
}

export default RangeSlider
