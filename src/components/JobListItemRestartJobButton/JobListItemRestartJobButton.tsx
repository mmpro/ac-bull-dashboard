import React, { useState, useEffect, useContext } from 'react'
import { css, cx } from 'emotion'
import { Replay } from '@material-ui/icons'

import { OptionsContext } from '../../context/OptionsContextProvider'

import { restartJob } from '../../api/calls/restartJob'

export interface Props {
    className?: string;
    jobList: string
    jobId: string
    status: AllowedStatiTypes
}

const JobListItemRestartJobButton: React.FC<Props> = ( { className, jobList, jobId, status } ) => {
    const { env } = useContext( OptionsContext )

    const handleRestart = () => {
        status === 'failed' && restartJob( env, jobList, jobId )
    }

    const stylez = css`

        cursor: pointer;
        width: 28px;
        height: 28px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;

        &.disabled {
            cursor: not-allowed;
            color: rgba( 255,255,255,0.2 );
        }
    `

    return (
        <div className={ cx( className, stylez, status !== 'failed' && 'disabled' ) } onClick={ handleRestart }>
            <Replay />
        </div>
    )
}

export default JobListItemRestartJobButton
