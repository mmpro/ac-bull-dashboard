import React from 'react'
import { render } from 'react-dom'

import EnvContextProvider from './context/EnvContextProvider'

import App from './APP'
import './AppBaseStyles.scss'

render( <EnvContextProvider><App /></EnvContextProvider>, document.getElementById( 'root' ) )
