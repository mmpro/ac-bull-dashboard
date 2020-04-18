import React, { useState, useEffect, useContext } from 'react'
import { css, cx } from 'emotion'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

import { DataContext } from '../../../context/DataContextProvider'

export interface Props {
    className?: string;
}

const JobListSelectionsJobList: React.FC<Props> = ( { className } ) => {
    const [ curValue, setCurValue ] = useState( [] )
    const { availableJobLists, setShownData, data } = useContext( DataContext )

    const handleSelect = ( e ) => {
        setCurValue( e.target.value )
    }

    useEffect( () => {
        if ( curValue.filter( cV => availableJobLists.includes( cV ) ).length !== curValue.length ) {
            setCurValue( curValue.filter( cV => availableJobLists.includes( cV ) ) )
        }
    }, [ availableJobLists, curValue, data ] )

    useEffect( () => {
        if ( !curValue.length ) {
            setShownData( data )
        } else {
            setShownData( data.filter( d => curValue.includes( d.jobList ) ) )
        }
    }, [ curValue, data, setShownData ] )

    const stylez = css`

        .selection_list {
            min-width: 260px;
        }

    `

    return (
        <div className={ cx( className, stylez ) }>
            <FormControl>
                <InputLabel>JobLists</InputLabel>
                <Select
                  className='selection_list'
                  value={ curValue }
                  multiple
                  onChange={ handleSelect }
                >
                    {
                        availableJobLists.map( availableJobListItem => <MenuItem key={ availableJobListItem } value={ availableJobListItem }>{ availableJobListItem }</MenuItem> )
                    }
                </Select>
            </FormControl>
        </div>
    )
}

export default JobListSelectionsJobList
