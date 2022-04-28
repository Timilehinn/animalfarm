import { ethers } from 'ethers'
import BigNumber from 'bignumber.js'
import getPigsContract from '../utils/getPigsContracts'

export const getPigsBalance = async(account:string) => {

    const { pigsContract  } = getPigsContract()

    let pigsBalance
    try{
        const result: ethers.BigNumber = await pigsContract.balanceOf(account);
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