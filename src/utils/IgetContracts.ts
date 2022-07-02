import { ethers } from "ethers";
import { simpleRpcProvider } from "utils/providers";

// ABIs
import bep20Abi from "config/Iabi/erc20.json";
import lpTokenAbi from "config/Iabi/lpToken.json";
import MultiCallAbi from "config/Iabi/Multicall.json";
import PigsTokenAbi from "config/abi/PigsTokenAbi.json";
import piggyBankABI from "config/Iabi/PiggyBank.json";
import PigCreditsABI from "config/abi/pigsCreditAbi.json";
import masterChefDogsABI from "config/abi/MasterChefDogs.json";
import masterChefPigsABI from "config/abi/MasterChefPigs.json";
import PigPenV2ABI from "config/abi/PigPenV2.json";
import LiquidityHelperPigsV2ABI from "config/abi/LiquidityHelperPigsV2.json";
import PancakeRouterv2ABI from "config/abi/PancakeRouterv2.json";
import DripGardenABI from "config/Iabi/DripGarden.json";
import addresses from "config/constants/contracts";
import {
	getDogsMasterChefAddress,
	getPigsMasterChefAddress,
} from "./addressHelpers";


// Addresses
import {
	PIGSAddress,
	PigsCreditAddress,
	PigPenAddress,
	PiggyBankAddress,
	MultiCallAddress,
	LiquidityHelperPigsV2Address,
	PancakeSwapRouterv2Address,
	DripGardenAddress,
} from "../config/constants";

const getContract = (
	abi: any,
	address: string,
	signer?: ethers.Signer | ethers.providers.Provider
) => {
	const signerOrProvider = signer ?? simpleRpcProvider;
	return new ethers.Contract(address, abi, signerOrProvider);
};

export const getBep20Contract = (
	address: string,
	signer?: ethers.Signer | ethers.providers.Provider
) => {
	return getContract(bep20Abi, address, signer);
};
export const getLpContract = (
	address: string,
	signer?: ethers.Signer | ethers.providers.Provider
) => {
	return getContract(lpTokenAbi, address, signer);
};

export const getMulticallContract = (
	signer?: ethers.Signer | ethers.providers.Provider
) => {
	return getContract(MultiCallAbi, MultiCallAddress, signer);
};

export const getPigsTokenV2Contract = (
	signer?: ethers.Signer | ethers.providers.Provider
) => {
	return getContract(PigsTokenAbi, PIGSAddress, signer);
};

export const getPiggyBankContract = (
	signer?: ethers.Signer | ethers.providers.Provider
) => {
	return getContract(piggyBankABI, PiggyBankAddress, signer);
};

export const getPigCreditContract = (
	signer?: ethers.Signer | ethers.providers.Provider
) => {
	return getContract(PigCreditsABI, PigsCreditAddress, signer);
};

export const getPigPenContract = (
	signer?: ethers.Signer | ethers.providers.Provider
) => {
	return getContract(PigPenV2ABI, PigPenAddress, signer);
};

export const getLiquidityHelperContract = (
	signer?: ethers.Signer | ethers.providers.Provider
) => {
	return getContract(
		LiquidityHelperPigsV2ABI,
		LiquidityHelperPigsV2Address,
		signer
	);
};

export const getPancakeRouterv2Contract = (
	signer?: ethers.Signer | ethers.providers.Provider
) => {
	return getContract(PancakeRouterv2ABI, PancakeSwapRouterv2Address, signer);
};

export const getDripGardenContract = (
	signer?: ethers.Signer | ethers.providers.Provider
) => {
	return getContract(DripGardenABI, DripGardenAddress, signer);
};

export const getMasterChefsDogsContract = (
	signer?: ethers.Signer | ethers.providers.Provider
) => {
	return getContract(masterChefDogsABI, getDogsMasterChefAddress(), signer);
};


export const getMasterChefsPigsContract = (
	signer?: ethers.Signer | ethers.providers.Provider
) => {
	return getContract(masterChefPigsABI, 	getPigsMasterChefAddress(), signer);
};

// export const getDripGardenLiberation = (signer?: ethers.Signer | ethers.providers.Provider) => {
// 	return getContract(DripGardenABI, DripGardenAddress, signer)
// }
