import React from 'react'
import styled from 'styled-components'

interface rangeProps {
	color: string
	opacity: any
}

const sliderThumbStyles = (props: rangeProps) => `
  width: 10px;
  height: 10px;
  background: ${props.color};
  cursor: pointer;
  border-radius : 50%;
  cursor:pointer;
  outline: 3px solid #F3BA2FE5;
  opacity: ${props.opacity};
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

function RangeSlider({ color, opacity }: rangeProps) {
	const [value, setValue] = React.useState(50)

	const handleChange = (e: any) => {
		setValue(e.target.value)
	}

	return (
		<Styles color={color} opacity={opacity}>
			<input type='range' min={0} max={255} value={value} className='slider' onChange={(e) => handleChange(e)} />
			<div className='value'>{value}</div>
		</Styles>
	)
}

export default RangeSlider
