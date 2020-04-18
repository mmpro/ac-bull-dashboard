import React, { useState } from 'react'
import { autoDecideEnv } from '@root/api/helper/autoDecideEnv'

export interface Props {
    className?: string;
    children
}

export const EnvContext = React.createContext( {
    env: autoDecideEnv() as ( 'dev' | 'live' ),
    setEnv: ( () => null ) as React.Dispatch<React.SetStateAction<string>>,
} )

const EnvContextProvider: React.FC<Props> = ( { children } ) => {
    const [ env, setEnv ] = useState( autoDecideEnv() as 'dev' | 'live' )

    return (
        <EnvContext.Provider value={ {
            env,
            setEnv,
        } }
        >
            { children }
        </EnvContext.Provider>
    )
}

export default EnvContextProvider
