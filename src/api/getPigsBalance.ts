import { ethers } from 'ethers'
import BigNumber from 'bignumber.js'
import getPigsContract from '../utils/getPigsContracts'

export const getPigsBalance = async(account:string) => {

    const { pigsTokenContract  } = getPigsContract()

    let pigsBalance
    try{
        const result: ethers.BigNumber = await pigsTokenContract.balanceOf(account);
        const balance = ethers.BigNumber.from(result).toString()
        pigsBalance = {
            amount : balance,
            amountString : new BigNumber(balance).toFormat(0)
        }
        console.log(result);
    }catch(err){
        console.log(err)
    }

    return pigsBalance
    
}

export const availablePigsToClaim = async(account:string) => {
    const { pigsCreditContract } = getPigsContract();
    let availablePigs

    try{
        const result: ethers.BigNumber = await pigsCreditContract.availablePigsV2ToClaim(account);
        const balance = ethers.BigNumber.from(result).toString()
        availablePigs = {
            amount : balance,
            amountString : new BigNumber(balance).toFormat(0)
        }
        console.log(result);
    }catch(err){
        console.log(err)
    }

    return availablePigs

}