import React, { useState, useEffect, useContext, useCallback } from 'react'
import { css, cx } from 'emotion'
import axios from 'axios'

import { getJobs } from '../../api/calls/getJobs'
import { simulateJob } from '../../api/calls/simulateJob'

import { DataContext } from '../../context/DataContextProvider'
import { EnvContext } from '../../context/EnvContextProvider'

import { authStore } from 'ac-app-authenticator'

export interface Props {
    className?: string;
}

const JobListRequester: React.FC<Props> = ( { className } ) => {
    const { env } = useContext( EnvContext )
    const { setData } = useContext( DataContext )

    const requestJobs = useCallback( () => {
        getJobs( env )
            .then( ( res ) => {
                const sortedData = [ ...res.data ].sort( ( a, b ) => {
                    return b.timestamp - a.timestamp
                } )

                setData( sortedData )
            } )
            .catch( ( err ) => {
                console.error( err )
            } )
    }, [ env, setData ] )

    useEffect( () => {
        requestJobs()
        const interval = setInterval( () => {
            requestJobs()
        }, 3000 )
        return () => clearInterval( interval )
    }, [ requestJobs, setData ] )

    const stylez = css``

    return (
        <div className={ cx( className, stylez ) } />
    )
}

export default JobListRequester
