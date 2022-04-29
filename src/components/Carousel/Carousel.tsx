import React from 'react'
import Carousel from 'react-elastic-carousel'
import './Carousel.css'

interface cardProps {
	title: string
	paragraph: string
}

function AnimalCarousel() {
	const breakPoints = [
		{ width: 1, itemsToShow: 1 },
		{ width: 550, itemsToShow: 2, itemsToScroll: 2 },
		{ width: 768, itemsToShow: 3 },
		{ width: 1200, itemsToShow: 4 },
	]

	const boxItem = [
		{
			title: 'High Yield',
			paragraph: 'Accumulate your share of the network by farming PIGS governance tokens, while leveraging your collateralized assets through our substrata lending protocol.',
		},
		{
			title: 'Fee Distribution',
			paragraph: 'Deposit fees and taxes go to PIGS stakers as BUSD rewards!!',
		},
		{
			title: 'Sustainability',
			paragraph: 'All taxes associated with core tokens go towards rewarding platform participants and generating BUSD rewards for stakers!!',
		},
		{
			title: 'Fee Distribution',
			paragraph: 'Deposit fees and taxes go to PIGS stakers as BUSD rewards!!',
		},
		{
			title: 'Fee Distribution',
			paragraph: 'Deposit fees and taxes go to PIGS stakers as BUSD rewards!!',
		},
		{
			title: 'Fee Distribution',
			paragraph: 'Deposit fees and taxes go to PIGS stakers as BUSD rewards!!',
		},
	]

	return (
		<div className='carousel' style={{ color: 'white' }}>
			<h3 className='carousel__h'>Animal Farm Features</h3>
			<div className='carousel__container'>
				<Carousel isRTL={false} showArrows={false} transitionMs={600} breakPoints={breakPoints} itemsToShow={4}>
					{boxItem.map((item, index) => (
						<Card title={item.title} paragraph={item.paragraph} />
					))}
				</Carousel>
			</div>
		</div>
	)
}

const Card = (props: cardProps) => {
	const { title, paragraph } = props
	return (
		<div className='box'>
			<h3 className='box__h3'>{title}</h3>
			<p className='box__p'>{paragraph}</p>
		</div>
	)
}

export default AnimalCarousel
