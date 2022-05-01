import { ethers } from 'ethers'
import BigNumber from 'bignumber.js'
import getPigsContract from '../utils/getContracts'

export const ClaimToPiggyBank = async(pigsAmount:string, busdAmount:string, weeksToLock:number,signer: ethers.Signer) => {

    const { pigsCreditContract  } = getPigsContract()

    let res

    try{
        const result: ethers.BigNumber = await pigsCreditContract.connect(signer).claimPigsV2ToPiggyBank(pigsAmount,busdAmount,weeksToLock);
        // const balance = ethers.BigNumber.from(result).toString()
        // res = {
        //     amount : balance,
        //     amountString : new BigNumber(balance).toFormat(0)
        // }
        console.log(result);
    }catch(err){
        console.log(err)
    }

    return res
    
}