import React, { useState, useEffect } from 'react'
import { css, cx } from 'emotion'
import ReportProblemIcon from '@material-ui/icons/ReportProblemSharp'

import { colors } from '../../../../config/colors'

export interface Props {
    className?: string;
    status: AllowedStatiTypes
    failedReason: string
}

const FailedJobMessageBox : React.FC<Props> = ( { className, failedReason, status } ) => {
    const stylez = css`

        background-color: ${ colors.warning };
        color: ${ colors.basicBackground };
        padding: 8px 132px 8px 32px;
        display: flex;
        align-items: center;
        justify-content: flex-start;

        .reason {
            display: inline-block;
            padding-left: 8px;
        }

    `

    return (
        status === 'failed' && failedReason ? (
            <div className={ cx( className, stylez ) }>
                <ReportProblemIcon /><div className='reason'>{ failedReason }</div>
            </div>
        ) : null
    )
}

export default FailedJobMessageBox
