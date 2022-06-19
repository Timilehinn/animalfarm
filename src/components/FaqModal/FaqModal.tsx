/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react'
import { useAppSelector, useAppDispatch } from 'state/hooks'
import { toggleModalBackDrop, toggleFaqModal } from 'state/toggle'
import cancleicon from '../../assets/cancleicon.svg'
import styles from './Faq.module.scss'

function FaqModal() {
	const isFaqOpen = useAppSelector((state) => state.toggleReducer.isFaqOpen)
	const dispatch = useAppDispatch()
	const closeModal = () => {
		dispatch(toggleModalBackDrop(false))
		dispatch(toggleFaqModal(false))
	}

	return (
		<div className={isFaqOpen ? styles.infobody : styles.infobody__disable}>
			<h1>Frequently Asked Questions?</h1>
			<div className={styles.icon}>
				<img src={cancleicon} alt='' onClick={() => closeModal()} />
			</div>
			<div className={styles.faq__body}>
				<h2>Can I take my initial DRIP LP back?</h2>
				<p>
					Over Time! Your initial deposit is used to buy plants for your garden. They will immediately start producing seeds which you can sell for DRIP lp tokens or plant in your garden to increase your plant count and produce
					exponentially more seeds!
				</p>

				<h2>How much are my fees?</h2>
				<p>The only fee that users personally incur is their transaction gas fees, which is charged by the BSC network.</p>

				<h2>When is the best time to start a garden?</h2>
				<p>
					Always! No matter when you start your garden, you will begin with on even ground with other players due to our implementation of the balance and time multipliers, as well as a balancing of buying power for initial capital entering
					the contract.
				</p>

				<h2>How often should I compound?</h2>
				<p>Many recommend that you compound at least once per day but you are free to do so as often as you wish.</p>

				<h2>How is the DRIP/BUSD Garden sustainable?</h2>
				<p>
					DRIP LP Garden is not a clone of other &quot;miner&quot; themed games, which are popular in the space right now. Unlike its predecessors DRIP/BUSD LP Garden is part of a larger ecosystem which will work to promote and grow the
					game. The DRIP/BUSD LP Garden pays 3% daily, the same as other popular &quot;miner&quot; games in the space, some of which have been around for almost a year and are still thriving, but we have fundamentally changed and
					re-balanced the buying power of capital entering the system to ensure everyone who enters gets a fair rate no matter when they enter. We have also introduced an innovative balance and time multiplier which will continue to make
					the game attractive for new capital far after launch.
				</p>

				<h2>How to use DRIP/BUSD Garden on my phone?</h2>
				<p>You can either use an app with a dapp browser and choose the Metamask/Injected option or simply use any browser that you want and choose WalletConnect to connect to your wallet&apos;s app on your phone.</p>

				<h2>Is it better to plant seeds or sell them?</h2>
				<p>The game is designed to reward those who compound.</p>
				<h2>How do referrals work?</h2>
				<p>
					Once your BSC wallet is connected to the DRIP/BUSD Garden website, you will notice your referral address appear at the bottom of the page. When a new user buys plants, after clicking your personal referral link, the contract will
					send seeds equal to 5% of their purchase instantly to your garden. You can then plant the seeds you earned from the bonus to grow a larger garden or sell them for DRIP lp.
				</p>

				<h2>When will DRIP/BUSD Garden launch?</h2>
				<p>DRIP/BUSD Garden will go live when TheManor.farm goes live!!</p>
			</div>
		</div>
	)
}

export default FaqModal
