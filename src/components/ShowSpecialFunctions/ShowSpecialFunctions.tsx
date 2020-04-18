import React, { useState, useEffect, useContext } from 'react'
import { css, cx } from 'emotion'
import Popover from '@material-ui/core/Popover'
import SettingsIcon from '@material-ui/icons/Settings'
import Button from '@material-ui/core/Button'

import DeleteWholeJobListEntries from '@components/FunctionalityModals/DeleteWholeJobListEntries/DeleteWholeJobListEntries'

import Modal from '@components/Modal/Modal'
import PopUpMessage from '@components/PopUpMessage/PopUpMessage'
import { EnvContext } from '@root/context/EnvContextProvider'
import { simulateJob } from '@root/api/calls/simulateJob'

export interface Props {
    className?: string;
}

const ShowSpecialFunctions: React.FC<Props> = ( { className } ) => {
    const [ anchorEl, setAnchorEl ] = React.useState<HTMLButtonElement | null>( null )
    const [ showOption, setShowOption ] = useState( '' )
    const { env } = useContext( EnvContext )

    const handleClick = ( event: React.MouseEvent<HTMLButtonElement> ) => {
        setAnchorEl( event.currentTarget )
    }

    const handleClose = () => {
        setAnchorEl( null )
    }

    const open = Boolean( anchorEl )
    const id = open ? 'simple-popover' : undefined

    const stylez = css`

    `

    const microMenuStylez = css`
            padding: 16px 8px;
            text-align: center;
    `

    return (
        <div className={ cx( className, stylez ) }>
            <Button aria-describedby={ id } onClick={ handleClick }>
                <SettingsIcon />
            </Button>
            <Popover
              id={ id }
              open={ open }
              anchorEl={ anchorEl }
              onClose={ handleClose }
              anchorOrigin={ {
                  vertical: 'bottom',
                  horizontal: 'left',
              } }
              transformOrigin={ {
                  vertical: 'top',
                  horizontal: 'right',
              } }
            >
                <div className={ cx( microMenuStylez, 'micro_menu' ) }>
                    <div>
                        <Button onClick={ () => {
                            setAnchorEl( null )
                            setShowOption( 'deleteJobList' )
                        } }
                        >
                            Remove Joblist Entries
                        </Button>
                    </div>
                    {/* <div>
                        <Button onClick={ () => {
                            setAnchorEl( null )
                            setShowOption( 'selectEnv' )
                        } }
                        >
                            Select Env
                        </Button>
                    </div> */}
                    {
                        env === 'dev' && (
                            <div>
                                <Button onClick={ () => {
                                    simulateJob( env )
                                } }
                                >
                                    Simulate Job
                                </Button>
                            </div>
                        )
                    }
                </div>
            </Popover>
            {
                showOption === 'deleteJobList' && (
                    <PopUpMessage
                      message={ <DeleteWholeJobListEntries close={ () => setShowOption( '' ) } /> }
                    />
                )
            }
            {/* {
                showOption === 'selectEnv' && (
                    <PopUpMessage
                      message={ <DeleteWholeJobListEntries close={ () => setShowOption( '' ) } /> }
                    />
                )
            } */}
        </div>
    )
}

export default ShowSpecialFunctions
