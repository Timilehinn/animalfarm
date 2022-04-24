import React from 'react'
import { useLocation } from 'react-router-dom'
import styles from './TopNav.module.scss'
import { useConnectWalletModal} from '../../state/wallet/hooks'
import wallet from '../../assets/wallet.png'


function TopNav() {

  const location = useLocation();
  const routeName = location.pathname.split("/")[1]
  console.log(routeName);


  const { toggleConnectWalletModal } = useConnectWalletModal()

	const connect = () => {
		toggleConnectWalletModal(true)
	}

  return (
    <div className={styles.nav} >
      <div className={styles.nav__in}>
        <h3>{ routeName.length === 0  ? "Home" : routeName }</h3>
        <button type='button' >
          <img src={wallet} alt="" />
          <p>Connect wallet</p>
        </button>
      </div>
    </div>
  )
}

export default TopNav