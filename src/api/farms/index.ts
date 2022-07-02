import { getMasterChefsDogsContract, getMasterChefsPigsContract, getBep20Contract} from "utils/IgetContracts";
import { ethers } from "ethers";
import { getDogsMasterChefAddress, getPigsMasterChefAddress } from "utils/addressHelpers";
import { DripBusdLpTokenAddress, LARGE_NUMBER } from "config/constants";

export const depositWithMasterChefDogs = async (
	pid: string,
	amount: string,
	referral: string,
	signer: ethers.Signer
) => {
	const masterChefDogsContract = getMasterChefsDogsContract(signer);

	const tx = await masterChefDogsContract.deposit(pid, amount, referral);
	const receipt = await tx.wait();
	if (receipt.status === 1) {
		return {
			success: true, 
			message: "Successful!",
		};
	}

	return {
		success: false,
		message: "Failed!",
	};
};


export const depositWithMasterChefPigs = async (
	pid: string,
	amount: string,
	referral: string,
	signer: ethers.Signer
) => {
	const masterChefPigsContract = getMasterChefsPigsContract(signer);

	const tx = await masterChefPigsContract.deposit(pid, amount, referral);
	const receipt = await tx.wait();
	if (receipt.status === 1) {
		return {
			success: true,
			message: "Successful!",
		};
	}

	return {
		success: false,
		message: " Failed!",
	};
};



export const unStakeWithMasterChefPigs = async (
	pid: string,
	amount: string,
	signer: ethers.Signer
) => {
	const masterChefPigsContract = getMasterChefsPigsContract(signer);

	const tx = await masterChefPigsContract.withdraw(pid, amount);
	const receipt = await tx.wait();
	if (receipt.status === 1) {
		return {
			success: true,
			message: "Successful!",
		};
	}

	return {
		success: false,
		message: " Failed!",
	};
};

export const unStakeWithMasterChefDogs = async (
	pid: string,
	amount: string,
	signer: ethers.Signer
) => {
	const masterChefDogsContract = getMasterChefsDogsContract(signer);

	const tx = await masterChefDogsContract.withdraw(pid, amount);
	const receipt = await tx.wait();
	if (receipt.status === 1) {
		return {
			success: true,
			message: "Successful!",
		};
	}

	return {
		success: false,
		message: " Failed!",
	};
};

export const approveLPDogs = async (LPAddress: string, signer: ethers.Signer) => {
	const bep20Contract = getBep20Contract(LPAddress, signer)
	const tx = await bep20Contract.approve(getDogsMasterChefAddress(), LARGE_NUMBER)
	await tx.wait()
}

export const approveLPPigs = async (LPAddress: string, signer: ethers.Signer) => {
	const bep20Contract = getBep20Contract(LPAddress, signer)
	const tx = await bep20Contract.approve(getPigsMasterChefAddress(), LARGE_NUMBER)
	await tx.wait()
}

export const claimWithMasterChefDogs = async (
	pid: string,
	amount: string,
	referral: string,
	signer: ethers.Signer
) => {
	const masterChefDogsContract = getMasterChefsDogsContract(signer);

	const tx = await masterChefDogsContract.deposit(pid, amount, referral);
	const receipt = await tx.wait();
	if (receipt.status === 1) {
		return {
			success: true,
			message: " Successful!",
		};
	}

	return {
		success: false,
		message: " Failed!",
	};
};

export const claimWithMasterChefPigs = async (
	pid: string,
	amount: string,
	signer: ethers.Signer
) => {
	const masterChefPigsContract = getMasterChefsPigsContract(signer);

	const tx = await masterChefPigsContract.deposit(pid, amount);
	const receipt = await tx.wait();
	if (receipt.status === 1) {     
		return {
			success: true,
			message: "Successful!",
		};
	}

	return {
		success: false,
		message: "Failed!",
	};
};
