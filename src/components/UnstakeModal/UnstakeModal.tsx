import React, { useState, useEffect } from "react";


import { useAppSelector, useAppDispatch } from "state/hooks";
import { toggleUnstakeModal, toggleModalBackDrop } from "state/toggle";
import {
	unStakeWithMasterChefPigs,
	unStakeWithMasterChefDogs,
} from "api/farms";
import { getDecimalAmount } from "utils/formatBalance";
import useActiveWeb3React from "hooks/useActiveWeb3React";
import useToast from "hooks/useToast";
import Preloader from "components/prealoder/preloader";
import styles from "./UnstakeModal.module.scss";
import cancle from "../../assets/cancel.png";

function UnstakeModal() {
	const modalProps = useAppSelector(
		(state) => state.toggleReducer.unstakeProps
	);
	const dispatch = useAppDispatch();
	const [pending, setPending] = useState(false);
	const [inputValue, setInputValue] = useState("");
	const [isButtonDisabled, setIsButtonDisabled] = useState(true);
	const { library } = useActiveWeb3React();
	const { toastSuccess, toastError } = useToast();

	const signer = library.getSigner();

	const close = () => {
		dispatch(
			toggleUnstakeModal({
				isUnstakeModalOpen: false,
				lpInfo: { lpStaked: null, lpAmount: null, isPigsFarm: null, pid: null },
			})
		);
		dispatch(toggleModalBackDrop(false));
	};

	useEffect(() => {
		if (inputValue.length === 0) {
			setIsButtonDisabled(true);
		} else {
			setIsButtonDisabled(false);
		}
	}, [inputValue]);

	const unstake = async () => {
		setPending(true);
		try {
			if (modalProps.lpInfo.isPigsFarm === true) {
				const res = await unStakeWithMasterChefPigs(
					modalProps.lpInfo.pid,
					getDecimalAmount(inputValue),
					signer
				);
                    console.log(res)
				if (res.success === true) {
					toastSuccess("Transaction successful!");
                    setPending(false)
				} else {
					toastError("An error occured");
                    setPending(false)
				}
			} else {
				const res = await unStakeWithMasterChefDogs(
					modalProps.lpInfo.pid,
					getDecimalAmount(inputValue),
					signer
				);

				if (res.success === true) {
					toastSuccess("Transaction successful!");
                    setPending(false)
				} else {
					toastError("An error occured");
                    setPending(false)
				}
			}
		} catch(err) {
			toastError("An error occured");
            setPending(false)
            console.log(err)
		}
	};

	return (
		<div
			className={
				modalProps.isUnstakeModalOpen
					? `${styles.confirmModal} ${styles.confirmModal__active}`
					: `${styles.confirmModal}`
			}
		> 
			<header>
				<p>Confirm Unstake</p>
				<img onClick={close} role='presentation' alt="" src={cancle} />
			</header>
			<input
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
				type="text"
				placeholder="ENTER AMOUNT TO UNSTAKE"
			/>

			<p className={styles.msg}>
				{modalProps.lpInfo.lpStaked}  staked:{modalProps.lpInfo.lpAmount}
			</p>
			{!pending && (
				<button
					className={
						isButtonDisabled ? styles.button__disabled : styles.button__enabled
					}
					onClick={() => unstake()}
					type="button"
                    disabled={isButtonDisabled}
				>
					{isButtonDisabled ? "Enter amount" : "Unstake"}
				</button>
			)}
			{pending && (
				<button type="button" className={styles.button__enabled}>
					<Preloader />
				</button>
			)}
		</div>
	);
}

export default UnstakeModal;
