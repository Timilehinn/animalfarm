import React from 'react'
import Carousel from 'react-elastic-carousel'
import './Carousel.css'

interface cardProps {
	title: string
	paragraph: string
}

function AnimalCarousel() {
	const breakPoints = [
		{ width: 1, itemsToShow: 1.5 },
		{ width: 550, itemsToShow: 2.5, itemsToScroll: 2.5 },
		{ width: 768, itemsToShow: 3.5 },
		{ width: 1200, itemsToShow: 4.5 },
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
			title: 'Dynamic Emission',
			paragraph: 'Dynamic emission rates based on current demand, allowing for price appreciation of DOGS and PIGS in all market conditions!!',
		},
		{
			title: 'Governance',
			paragraph: 'Full governance protocol giving PIGS stakers a vote in future opportunities!!',
		},
		{
			title: 'Lending',
			paragraph: 'Collateral staked on the platform is rehypothecated to Pancakeswaps lending protocol to earn additional yield, which gets converted to BUSD and injected into PigPen dividend vault.',
		},
		{
			title: 'Integrity',
			paragraph: 'From the Developers of DRIP, the fastest growing and highest ranked DeFi protocol on BSC!!',
		},
	]

	return (
		<div className='carousel' style={{ color: 'white', paddingTop: '50px' }}>
			<h3 className='carousel__h'>Animal Farm Features</h3>
			<div className='carousel__container'>
				<Carousel isRTL={false} showArrows transitionMs={600} breakPoints={breakPoints} itemsToShow={2.5}>
					{boxItem.map((item, index) => (
						<Card key={`${index + item.title}`} title={item.title} paragraph={item.paragraph} />
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
