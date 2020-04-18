import React, { useState, useEffect, useContext } from 'react'
import { css, cx } from 'emotion'
import { Close } from '@material-ui/icons'

import { EnvContext } from '../../context/EnvContextProvider'

import { deleteJob } from '../../api/calls/deleteJob'
import { colors } from '../../../config/colors'

import PopUp from '@components/PopUpMessage/PopUpMessage'

export interface Props {
    className?: string;
    status: AllowedStatiTypes
    jobId: string
    jobList: string
}

const JobListItemDeleteJobButton: React.FC<Props> = ( { className, status, jobId, jobList } ) => {
    const [ deletionPending, setDeletionPending ] = useState( false )
    const [ deletionError, setDeletionError ] = useState( false )
    const { env } = useContext( EnvContext )
    const [ showPop, setShowPop ] = useState( false )

    const stylez = css`
        cursor: pointer;
        border-radius: 3px;
        width: 28px;
        height: 28px;
        display: flex;
        justify-content: center;
        align-items: center;
    `

    const handleConfirmDeletion = () => {
        setDeletionPending( true )
        deleteJob( env, jobList, jobId )
            .then( () => { } )
            .catch( () => setDeletionError( true ) )
        showPop && setShowPop( false )
    }

    const handleClick = () => {
        if ( status !== 'active' ) {
            handleConfirmDeletion()
        } else {
            console.log( 'dasdad' )
            setShowPop( true )
        }
    }

    return (
        <div
          style={ {
              backgroundColor: deletionError
                  ? colors.warning : deletionPending
                      ? colors.pending : colors.warning,
          } } className={ cx( className, stylez, deletionPending && 'deletion_pending', deletionError && 'deletion_error' ) } onClick={ handleClick }
        >
            <Close />
            {
                showPop && (
                    <PopUp
                      onOk={ handleConfirmDeletion }
                      onCancel={ () => {
                          setShowPop( false )
                      } }
                      message='Are you sure?'
                    />
                )
            }
        </div>
    )
}

export default JobListItemDeleteJobButton
