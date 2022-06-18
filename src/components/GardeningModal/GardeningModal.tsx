import React from 'react'
import { useAppSelector, useAppDispatch } from 'state/hooks'
import { toggleModalBackDrop, toggleGardenModal } from 'state/toggle'
import cancleicon from '../../assets/cancleicon.svg'
import './Gardening.css'

function GardeningModal() {

    const isGardenOpen = useAppSelector((state) => state.toggleReducer.isGardenOpen)
	const dispatch = useAppDispatch()
    const closeModal = () => {
		dispatch(toggleModalBackDrop(false))
		dispatch(toggleGardenModal(false))
	}

  return (
    <div className={isGardenOpen ? 'infobody' : 'infobody__disable'}>
        <h1>How to start Gardening?</h1> 
        <div className='icon' ><img src={cancleicon} alt='' onClick={() => closeModal()} /></div>
        
        <div className='garden__body'>
            <h2>The Contract</h2>
            <p>
                The DRIP/BUSD Garden contract is verified, open source, immutable, trustless and is visible here on BSCScan.
            </p>

            <h2>What does all of that mean?</h2>
            <p>
                It means that once the contract was deployed, the dev is no longer needed for the contract to continue operating as intended and in the case of DRIP/BUSD Garden the website isn't
                even needed. Everyone has access to read/audit and interact directly with the code and make their own decisions as they see fit. Once the contract was deployed it can't be stopped
                nor changed by anyone for any reason, not even the developer himself has access to change or take anything from the contract.<br></br>
                
                DRIP/BUSD Garden is a decentralized tool that gives its users totally free access to its inner and outer workings so that they may make a well-informed decision on it's usefulness to 
                their intentions. All other work performed by the DRIP/BUSD Garden community and/or developers is purely optional, not necessary for continued operation and should be viewed as nothing
                more than charitable community contributions.
            </p>

            <h2>Strategies & Information</h2>
            <p>
                DRIP/BUSD Garden is for users who want long term profits and sustainability. It is fundamentally different from all other blockchain games who favor insiders.<br></br>
                
                The DRIP Garden is a true game where all players start out relatively equal and what determines your payout is how often you plant your seeds(compound) vs. how often you sell them (withdraw).
                
                When a player first deposits they are buying plants for their garden, these plants can not be sold. Once you have your initial plats they will start producing seed. These seeds can be sold for 
                DRIP/BUSD lp tokens or planted (compounded) allowing you to grow a larger garden and produce exponentially more seed!
                
                The DRIP/BUSD Garden algorithm ensures that all participants receive their fair share due to our implementation of the balance and time multipliers, as well as a balancing of buying power for
                initial capital entering the contract.<br></br>
                
                Keep in mind that the 3% daily rate is not completely constant, it will vary slightly based on a combination of factors, including how often you plant your seeds vs selling them and the habits
                of the community as a whole. Your personal habits hold much more weight in regards to your overall personal returns. Just as your daily rate can decrease it also increases based on a combination
                of those same habits.
            </p>

            <h2>How To Garden With DRIP/BUSD Garden</h2>
            <p>
                Step 1. Buy plants using DRIP/BUSD LP tokens.<br></br>
                Step 2. Your plants will start producing seeds, the DRIP/BUSD LP value of these seeds will be displayed on your Garden dashboard. You can compound using the seeds in your barrel to increases
                your seed production rate.<br></br>
                Step 3. Alternatively, you can sell the seeds and the plants in your Gardens will continue producing seeds.<br></br>
                The plants in your gardens produce seeds non-stop. A 24hr timer has been added for your convenience. You can plant (compound) or sell (withdraw) your seeds at any time.
            </p>

            <h2>Fees</h2>
            <p>
                The only fee that users personally incur is their transaction gas fees. A 5% development fee is paid to the developer but this fee is not paid by you as a user, this fee is paid to the
                developer by the contract as a whole. All DRIP earned by the developers will be sent to the Faucet tax vault where it's used to pay out divs to DRIP stakers https://drip.community/faucet
            </p>
                
        </div>
    </div>
  )
}

export default GardeningModal