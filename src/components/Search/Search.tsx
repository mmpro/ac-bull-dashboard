import React, { useState, useEffect, useContext } from 'react'
import { css, cx } from 'emotion'
import Grid from '@material-ui/core/Grid'
import SearchIcon from '@material-ui/icons/Search'
import TextField from '@material-ui/core/TextField'

import { FilterContext } from '../../context/FilterContextProvider'

export interface Props {
    className?: string;
}

const customerSearchRegExp = new RegExp( /^c\d+$/ )
const mcSearchRegExp = new RegExp( /^mc\d+$/ )

const Search: React.FC<Props> = ( { className } ) => {
    const { setFilter } = useContext( FilterContext )

    const handleSearch = ( e ) => {
        const currentValue = e.target.value
        if ( currentValue.match( customerSearchRegExp ) ) {
            setFilter( { customerFilter: [ currentValue.replace( /^c/, '' ) ] } )
        } else {
            setFilter( { customerFilter: [] } )
        }
        if ( currentValue.match( mcSearchRegExp ) ) {
            setFilter( { mcFilter: [ currentValue.replace( /^mc/, '' ) ] } )
        } else {
            setFilter( { mcFilter: [] } )
        }
    }

    const stylez = css`

        #input-with-icon-grid {
            min-width: 260px;
        }

    `

    return (
        <div className={ cx( className, stylez ) }>
            <Grid container spacing={ 1 } alignItems='flex-end'>
                <Grid item>
                    <SearchIcon />
                </Grid>
                <Grid item>
                    <TextField placeholder='c147' id='input-with-icon-grid' label='Search' onChange={ handleSearch } />
                </Grid>
            </Grid>
        </div>
    )
}

export default Search
