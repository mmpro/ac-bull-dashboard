import React, { useState, useEffect, useContext } from 'react'
import { css, cx } from 'emotion'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

import { OptionsContext } from '../../../context/OptionsContextProvider'

export interface Props {
    className?: string;
    close: () => void
}

const SetEnvironment: React.FC<Props> = ( { className, close } ) => {
    const { env, setEnv } = useContext( OptionsContext )
    const [ selectedEnv, setSelectedEnv ] = useState( env )

    const stylez = css`
        background: white;
        padding: 16px 32px;
        text-align: center;

        .description {
            margin-bottom: 8px;
        }

        .shallow {
            background-color: transparent;
            border: 1px solid black;
            color: black;
        }

        #demo-simple-select {
            width: 260px;
        }
    `

    const handleChange = ( event: React.ChangeEvent<{ value: string }> ) => {
        setSelectedEnv( event.target.value as 'live' | 'dev' )
    }

    const handleConfirm = () => {
        setEnv( selectedEnv )
        close()
    }

    return (
        <div className={ cx( className, stylez ) }>
            <div className='description'>
                Set Environment to:
            </div>
            <FormControl>
                <InputLabel id='demo-simple-select-label'>Environment</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={ selectedEnv }
                  onChange={ handleChange }
                >
                    {
                        [ 'dev', 'live' ].map( environment => (
                            <MenuItem key={ environment } value={ environment }>{ environment }</MenuItem>
                        ) )
                    }
                </Select>
            </FormControl>
            <div className='buttons'>
                <div className='btn shallow' onClick={ () => close() }>Cancel</div>
                <div className='btn' onClick={ handleConfirm }>Ok</div>
            </div>
        </div>
    )
}

export default SetEnvironment
