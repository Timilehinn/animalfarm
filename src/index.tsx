import React from 'react'
import ReactDOM from 'react-dom'
import { Web3ReactProvider } from '@web3-react/core'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from 'state/index'
import { getLibrary } from 'utils/web3React'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

import 'react-toastify/dist/ReactToastify.css'

ReactDOM.render(
	<React.StrictMode>
		<Web3ReactProvider getLibrary={getLibrary}>
			<BrowserRouter>
				<Provider store={store}>
					<App />
					<ToastContainer />
				</Provider>
			</BrowserRouter>
		</Web3ReactProvider>
	</React.StrictMode>,
	document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
