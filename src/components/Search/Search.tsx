import React, { useState, useEffect, useContext } from 'react'
import { css, cx } from 'emotion'
import Grid from '@material-ui/core/Grid'
import SearchIcon from '@material-ui/icons/Search'
import TextField from '@material-ui/core/TextField'

import { FilterContext } from '../../context/FilterContextProvider'
import { searchConfig } from '../../../config/search'

export interface Props {
    className?: string;
}

const searchRegExpArray = []

for ( const [ key, val ] of Object.entries( searchConfig ) ) {
    searchRegExpArray.push( { regExp: new RegExp( `^${ val.prefix }\\d+$` ), filterKey: key, prefixRegExp: new RegExp( `^${ val.prefix }` ) } )
}

const Search: React.FC<Props> = ( { className } ) => {
    const { setFilter } = useContext( FilterContext )

    const handleSearch = ( e ) => {
        const currentValue = e.target.value
        setFilter( { search: currentValue } )
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
