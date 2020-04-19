import React from 'react'
import { render } from 'react-dom'

import OptionsContextProvider from './context/OptionsContextProvider'

import App from './APP'
import './AppBaseStyles.scss'

render( <OptionsContextProvider><App /></OptionsContextProvider>, document.getElementById( 'root' ) )
