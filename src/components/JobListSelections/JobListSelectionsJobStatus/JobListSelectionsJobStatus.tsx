import React, { useState, useEffect, useContext } from 'react'
import { css, cx } from 'emotion'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

import { statusConfig } from '../../../../config/statusConfig'

import { FilterContext } from '../../../context/FilterContextProvider'
import { DataContext } from '../../../context/DataContextProvider'

export interface Props {
    className?: string;
}

const JobListSelectionsJobStatus: React.FC<Props> = ( { className } ) => {
    const [ curValue, setCurValue ] = useState( [] )
    const { setFilter } = useContext( FilterContext )
    const { data } = useContext( DataContext )
    const availableStati = Object.keys( statusConfig )

    const handleSelect = ( e ) => {
        setCurValue( e.target.value )
    }

    useEffect( () => {
        if ( curValue.filter( cV => availableStati.includes( cV ) ).length !== curValue.length ) {
            setCurValue( curValue.filter( cV => availableStati.includes( cV ) ) )
        }
    }, [ availableStati, curValue ] )

    useEffect( () => {
        setFilter( {
            statusFilter: curValue,
        } )
        if ( curValue.length ) {
            const element = document.querySelector( '.selection_list_status .MuiSelect-root.MuiSelect-select.MuiSelect-selectMenu.MuiInputBase-input.MuiInput-input' )
            if ( element ) {
                element.innerHTML = curValue.join( ', ' )
            }
        }
    }, [ curValue, setFilter ] )

    const stylez = css`

        .selection_list {
            min-width: 260px;
        }

    `

    return (
        <div className={ cx( className, stylez ) }>
            <FormControl>
                <InputLabel>Status</InputLabel>
                <Select
                  className='selection_list selection_list_status'
                  value={ curValue }
                  multiple
                  onChange={ handleSelect }
                >
                    {
                        availableStati.map( availableStatiItem => <MenuItem key={ availableStatiItem } value={ availableStatiItem }>{ `${ availableStatiItem } (${ data.filter( job => job.status === availableStatiItem ).length })` }</MenuItem> )
                    }
                </Select>
            </FormControl>
        </div>
    )
}

export default JobListSelectionsJobStatus
