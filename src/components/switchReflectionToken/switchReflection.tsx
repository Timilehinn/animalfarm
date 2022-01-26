import React from 'react'
import type { Balance } from 'state/wallet'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import useToast from 'hooks/useToast'
import { reinvestVaultSReward } from 'api/processRewards'
import { setRewardToSBTC } from 'api/setRewardTokens'

import Transactions from 'components/transactions/transactions'
import style from './switchReflection.module.css'

interface Props {
	rewardBalance: Balance
	showChangeRewardToken?: boolean
	showReinvestReward?: boolean
	handleClaimRewards: () => void
}

function SwitchReflection(props: Props) {
	const { library } = useActiveWeb3React()
	const signer = library.getSigner()
	const { toastSuccess, toastError } = useToast()

	const { rewardBalance, showChangeRewardToken, showReinvestReward, handleClaimRewards } = props

	const handleReinvestRewards = () => {
		reinvestVaultSReward(signer, toastSuccess, toastError)
	}
	return (
		<div>
			<header>Pending Reflections</header>
			<div className={style.switch}>
				<nav>
					<ul>
						<li>Token</li>
						<li>Pending</li>
						<li>Value</li>
					</ul>
				</nav>
				<Transactions name={rewardBalance.token.name} amountString={rewardBalance.amountString} valueString={rewardBalance.valueString} />
				<div className={style.switch__change}>
					{showChangeRewardToken ? (
						<>
							<p style={{ marginTop: '5px' }}>Change your Vault-X reflection token</p>
							<div className={style.switch__buttons}>
								<button
									onClick={() => {
										setRewardToSBTC(signer, toastSuccess, toastError)
									}}
									type='button'
								>
									SBTC
								</button>
								<button type='button'>SETH</button>
								<button type='button'>SXUSD</button>
							</div>
						</>
					) : (
						''
					)}

					{/* <div className={style.switch__main__button}>
						<button type='button' onClick={handleClaimRewards}>
							Claim rewards
						</button>
					</div> */}

					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<div style={{ display: 'inline-block', marginRight: '5px' }} className={style.switch__main__button}>
							<button type='button' onClick={handleClaimRewards}>
								Claim Rewards
							</button>
						</div>
						{showReinvestReward ? (
							<div style={{ display: 'inline-block', marginLeft: '5px' }} className={style.switch__main__button}>
								<button type='button' disabled onClick={handleReinvestRewards}>
									Coming Soon
								</button>
							</div>
						) : (
							''
						)}
					</div>
					{showReinvestReward ? (
						<p style={{ marginTop: 25 }}>
							Reinvest your BNB reflections back into Vault-S ? <br /> <small>If yes, click on Reinvest Rewards</small>
						</p>
					) : (
						''
					)}

					{/* <div className='switch__action__buttons'>
						<div style={{ display: 'inline' }} className='switch__action__button'>
							<button type='button' onClick={handleClaimRewards}>
								Claim Rewards
							</button>
						</div>
						<div style={{ display: 'inline' }} className='switch__action__button'>
							<button type='button' onClick={handleClaimRewards}>
								Claim Rewards
							</button>
						</div>
					</div> */}

					{/* {showReinvestReward ? (
						<>
							<p style={{ marginTop: 25 }}>
								Reinvest your BNB reflections back into Vault-S ? <br /> <small>If yes, click on Reinvest Rewards</small>
							</p>
							<div className={style.switch__main__button}>
								<button type='button' onClick={handleReinvestRewards}>
									ReInvest Rewards
								</button>
							</div>
						</>
					) : (
						''
					)} */}
				</div>
			</div>
		</div>
	)
}

export default SwitchReflection
