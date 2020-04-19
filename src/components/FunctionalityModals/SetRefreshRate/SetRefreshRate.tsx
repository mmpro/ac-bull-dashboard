import React, { useState, useEffect, useContext } from 'react'
import { css, cx } from 'emotion'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

import { OptionsContext } from '../../../context/OptionsContextProvider'
import PopUpMessage from '@components/PopUpMessage/PopUpMessage'
import { refreshRates } from '../../../../config/refreshRates'

export interface Props {
    className?: string;
    close: () => void
}

const SetRefreshRate: React.FC<Props> = ( { className, close } ) => {
    const { env, refreshInterval, setRefreshInterval } = useContext( OptionsContext )
    const [ selectedRefreshRate, setSelectedRefreshRate ] = useState( refreshInterval )

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
        setSelectedRefreshRate( parseInt( event.target.value ) as number )
    }

    const handleConfirm = () => {
        setRefreshInterval( selectedRefreshRate )
        close()
    }

    return (
        <div className={ cx( className, stylez ) }>
            <div className='description'>
                Refresh list every:
            </div>
            <FormControl>
                <InputLabel id='demo-simple-select-label'>Job List</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={ selectedRefreshRate }
                  onChange={ handleChange }
                >
                    {
                        refreshRates.map( refreshRate => (
                            <MenuItem key={ refreshRate } value={ refreshRate }>{ refreshRate / 1000 } seconds</MenuItem>
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

export default SetRefreshRate
