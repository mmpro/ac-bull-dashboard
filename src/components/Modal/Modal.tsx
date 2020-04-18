import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { css, cx } from 'emotion'
import { Transition } from 'react-spring/renderprops'

import useHotkeyChain from '../../customHooks/useHotkeyChain'

export interface Props {
    className?: string;
    escapeable?: boolean
}

const Modal: React.FC<Props> = ( { className, escapeable, children } ) => {
    const [ show, setShow ] = useState( false )
    useHotkeyChain( [ 'Escape' ], () => escapeable && setShow( false ) )

    useEffect( () => {
        setShow( true )
        return () => setShow( false )
    }, [] )

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
                        { children }
                    </div>
                )
            }
        </Transition>
    ),
    document.getElementById( 'root' ) )
}

export default Modal
