import React,{useState} from 'react'
import styles from './ClaimPigsPen.module.scss'
import logo from '../../assets/svgg.png'
import { useSpring, animated } from 'react-spring'

interface claimProps{
	title : string
}

function ClaimPigsPen({title}:claimProps) {

	const props = useSpring({ to: { opacity: 1, x : 0 }, from: { opacity: 0, x : -20 }, delay: 100, });

	const [ value, setValue ] = useState('');

	const handleChange = (e:any) =>{

		setValue(e.target.value);
	}
	
	const  buttonDisabled  = value === ''
	

  	return (

    <animated.div style={props} className={styles.claimpigs}>
		<h3>{title}</h3>
		<p className={styles.header} >Enter amount of pigs to be deposited to the pigs pen.</p>
		<form action="">
			<div className={styles.inputWrap}>
				<div className={styles.inputBox} >
					<div className={styles.logo}>
						<img src={logo} alt="" />
						<p>PIGS</p>
					</div>
					<input onChange={(e)=>handleChange(e)} type="number" placeholder='000' />
				</div>
				<div>
					<p className={styles.claimable} >Amount Claimable: 376 PIGS</p>
				</div>
			</div>
			<button onClick={()=>alert("Hello")} disabled={buttonDisabled} className={buttonDisabled ? styles.button__disabled : styles.button__enabled } type='button' >Enter amount to claim</button>
		</form>
    </animated.div>
  )
}

export default ClaimPigsPen