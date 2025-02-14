import React from 'react'
import style from './PiggyBankInfo.module.scss'
import piggybank from '../../assets/piggybank.png'
import piggycoin from '../../assets/piggycoin.png'
import multiplierimg from '../../assets/multiplierimg.png'
import dogart from '../../assets/dogart.png'

function ReferralTable() {
	return (
		<div>
			<div className={style.aboutbody}>
				<div className={style.about}>
					<div className={style.card1}>
						<h2>About Piggy Bank</h2>
						<p>
							The piggy bank is the first ever non-inflationary variable time staking annuity. Stake pigs/busd lp tokens to earn up to 3% daily roi!! to unlock referral bonuses you must have dogs staked in the single asset staking pool
							(see bottom of page). Time lock your harvest to earn a massive bonus on yield, airdrop stakes to friends and family using the gift stake function, most importantly take control of your financial future on the animal farm!!
						</p>
					</div>
					<div>
						<img src={piggybank} className={style.aboutimg} alt='' />
					</div>
				</div>

				<div className={style.features}>
					<div className={style.card2}>
						<h2>Features</h2>
						<div>
							<ul className={style.cardlist}>
								<li>Earn up to 3% roi a day on your principal</li>
								<li>Your principal is increased through a time locking multiplier, creating an extremely powerful opportunity for compound growth</li>
								<li>&quot;Longer pays better&quot; mechanics with non-linear on increase in principal buying power for longer time staking.</li>
								<li>Stake airdropping functions</li>
								<li>Have multiple stakes from the same wallet allowing users to set up convenient lock</li>
							</ul>
						</div>
					</div>
					<div>
						<img src={piggycoin} className={style.featuresimg} alt='' />
					</div>
				</div>

				<div className={style.multiplier}>
					<div className={style.card3}>
						<h2>The Multiplier</h2>
						<p>The multiplier for time locking rewards is placed on the stakes principle, not tacked on to claimable divs at the end of the stake.</p>
						<p>This makes the bonus rewards for time locking staked exponentially more powerful as the stake compounds the increased roi generated from the bonus multiplied principle.</p>
						<p>The bonus is not fully applied to the principle on day 1 of the time locked stake and is instead applied to the principle using the above displayed distribution curve with:</p>
						<ul className={style.multiplierlist}>
							<li>30% of the multiplier bonus being added to the principle in the first 75% of the stake&apos;s length</li>
							<li>And the rest being added exponentially to the principle in the last 25% of the time lock up</li>
						</ul>
					</div>
					<div>
						<img src={multiplierimg} className={style.multiplierimg} alt='' />
					</div>
				</div>

				<div className={style.referral}>
					<div className={style.card4}>
						<h2>Referrals</h2>
						<p>The referral commission structure based on Drip&apos;s highly successful BR34P dependency model with a FIBONACCI SEQUENTIAL PROGRESSION</p>
						<ul className={style.referrallist}>
							<li>1% - 2 DOGS</li>
							<li>2% - 3 DOGS</li>
							<li>3% - 5 DOGS</li>
							<li>4% - 8 DOGS</li>
							<li>5% - 13 DOGS</li>
						</ul>
					</div>
					<div>
						<img src={dogart} className={style.referralimg} alt='' />
					</div>
				</div>
			</div>
		</div>
	)
}

export default ReferralTable
