import React, { useState, useEffect, useContext } from 'react'
import { css, cx } from 'emotion'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

import { DataContext } from '../../../context/DataContextProvider'
import { FilterContext } from '../../../context/FilterContextProvider'

export interface Props {
    className?: string;
}

const JobListSelectionsJobList: React.FC<Props> = ( { className } ) => {
    const [ curValue, setCurValue ] = useState( [] )
    const { availableJobLists, data } = useContext( DataContext )
    const { setFilter } = useContext( FilterContext )

    const handleSelect = ( e ) => {
        setCurValue( e.target.value )
    }

    useEffect( () => {
        if ( curValue.filter( cV => availableJobLists.includes( cV ) ).length !== curValue.length ) {
            setCurValue( curValue.filter( cV => availableJobLists.includes( cV ) ) )
        }
    }, [ availableJobLists, curValue ] )

    useEffect( () => {
        setFilter( {
            jobListFilter: curValue,
        } )
        if ( curValue.length ) {
            const element = document.querySelector( '.selection_list_jobList .MuiSelect-root.MuiSelect-select.MuiSelect-selectMenu.MuiInputBase-input.MuiInput-input' )
            if ( element ) {
                element.innerHTML = curValue.join( ', ' )
            }
        }
    }, [ curValue, setFilter ] )

    const stylez = css`

        .selection_list {
            width: 260px;
            max-width: 260px;
        }

    `

    return (
        <div className={ cx( className, stylez ) }>
            <FormControl>
                <InputLabel>JobLists</InputLabel>
                <Select
                  className='selection_list selection_list_jobList'
                  value={ curValue }
                  multiple
                  onChange={ handleSelect }
                >
                    {
                        availableJobLists.map( ( availableJobListItem ) => {
                            return (
                                <MenuItem key={ availableJobListItem } value={ availableJobListItem }>{ `${ availableJobListItem } (${ data.filter( job => job.jobList === availableJobListItem ).length })` }</MenuItem>
                            )
                        } )
                    }
                </Select>
            </FormControl>
        </div>
    )
}

export default JobListSelectionsJobList
