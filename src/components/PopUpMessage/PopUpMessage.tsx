import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { css, cx } from 'emotion'
import { Transition } from 'react-spring/renderprops'

import useHotkeyChain from '@root/customHooks/useHotkeyChain'

export interface Props {
    className?: string;
    onOk?: () => void
    onCancel?: () => void
    message: string | JSX.Element
}

const PopUp: React.FC<Props> = ( {
    className,
    message,
    onOk,
    onCancel,
} ) => {
    const [ show, setShow ] = useState( false )
    useHotkeyChain( [ 'Escape' ], () => onCancel && onCancel() )
    useHotkeyChain( [ 'Enter' ], () => onOk && onOk() )

    useEffect( () => {
        setShow( true )
        return () => setShow( false )
    }, [] )

    const handleCancel = () => {
        if ( onCancel ) {
            onCancel()
        }
    }

    const handleOk = () => {
        onOk()
    }

    const stylez = css`

        top: 0;
        left: 0;
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background-color: rgba( 0, 0, 0, 0.6 );

        .message_box {
            position: relative;
            max-width: 70%;
            width: 500px;
            min-height: 120px;
            background-color: white;
            padding: 8px 16px;
            padding-bottom: 70px;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
        }

        .buttons {
            left: 0;
            height: 70px;
            box-sizing: border-box;
            padding: 16px 8px;
            position: absolute;
            bottom: 0;
            width: 100%;
            display: flex;
            justify-content: space-evenly;
        }

        .btn {
            width: 100px;
            text-align: center;
            padding: 8px 16px;
            background: black;
            color: white;
            cursor: pointer;
        }

        .cancel {
            background-color: transparent;
            color: black;
            border: 1px solid black;
        }

    `

    return ReactDOM.createPortal( (
        <Transition
          items={ show }
          from={ { opacity: '0' } }
          enter={ { opacity: '1' } }
          leave={ { opacity: '0' } }
        >
            {
                item => props => (
                    <div onClick={ e => e.stopPropagation() } style={ props } className={ cx( className, stylez ) }>
                        <div className='message_box'>
                            { message }
                            {
                                ( onCancel || onOk ) && (
                                    <div className='buttons'>
                                        { onCancel && <div className='btn cancel' onClick={ handleCancel }>Cancel</div> }
                                        { onOk && <div className='btn ok' onClick={ handleOk }>Ok</div> }
                                    </div>
                                )
                            }
                        </div>
                    </div>
                )
            }
        </Transition>
    ),
    document.getElementById( 'root' ) )
}

export default PopUp
