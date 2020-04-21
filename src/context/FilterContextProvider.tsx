import React, { useState, useContext, useCallback } from 'react'
import { DataContext } from './DataContextProvider'

export interface Props {
    className?: string;
    children
}

type FilterKeysType = {
    jobListFilter?: string[],
    statusFilter?: string[],
    customerFilter?: string[],
    mcFilter?: string[],
}

export const FilterContext = React.createContext( {
    setFilter: ( () => null ) as ( filterOptions: FilterKeysType ) => void,
} )

const FilterContextProvider: React.FC<Props> = ( { children } ) => {
    const { data, setShownData } = useContext( DataContext )

    const [ jobListFilterState, setJobListFilterState ] = useState( [] )
    const [ statusFilterState, setStatusFilterState ] = useState( [] )
    const [ customerFilterState, setCustomerFilterState ] = useState( [] )
    const [ mcFilterState, setMcFilterState ] = useState( [] )

    const setFilter = useCallback( ( filterData: FilterKeysType ) => {
        const { jobListFilter, statusFilter, customerFilter, mcFilter } = filterData

        let newData = [ ...data ]

        // JOB LIST FILTERING
        if ( jobListFilter ) {
            setJobListFilterState( jobListFilter )
        }

        if ( jobListFilter && jobListFilter.length ) {
            newData = newData.filter( nD => jobListFilter.includes( nD.jobList ) )
        } else if ( !jobListFilter && jobListFilterState.length ) {
            newData = newData.filter( nD => jobListFilterState.includes( nD.jobList ) )
        }

        // STATUS FILTERING
        if ( statusFilter ) {
            setStatusFilterState( statusFilter )
        }

        if ( statusFilter && statusFilter.length ) {
            newData = newData.filter( nD => statusFilter.includes( nD.status ) )
        } else if ( !statusFilter && statusFilterState.length ) {
            newData = newData.filter( nD => statusFilterState.includes( nD.status ) )
        }

        // CUSTOMER FILTERING
        if ( customerFilter ) {
            setCustomerFilterState( customerFilter )
        }

        if ( customerFilter && customerFilter.length ) {
            newData = newData.filter( ( nD ) => {
                const customerId = `${ nD.data?.customerId || '' }`
                return customerId && customerFilter.includes( customerId )
            } )
        } else if ( !customerFilter && customerFilterState.length ) {
            newData = newData.filter( ( nD ) => {
                const customerId = `${ nD.data?.customerId || '' }`
                return customerId && customerFilterState.includes( customerId )
            } )
        }

        // MC FILTERING
        if ( mcFilter ) {
            setMcFilterState( mcFilter )
        }

        if ( mcFilter && mcFilter.length ) {
            newData = newData.filter( ( nD ) => {
                const mcId = `${ nD.data?.mediaContainerId || '' }`
                return mcId && mcFilter.includes( mcId )
            } )
        } else if ( !mcFilter && mcFilterState.length ) {
            newData = newData.filter( ( nD ) => {
                const mcId = `${ nD.data?.mediaContainerId || '' }`
                return mcId && mcFilterState.includes( mcId )
            } )
        }

        setShownData( newData )
    }, [ customerFilterState, data, jobListFilterState, mcFilterState, setShownData, statusFilterState ] )

    return (
        <FilterContext.Provider value={ {
            setFilter,
        } }
        >
            { children }
        </FilterContext.Provider>
    )
}

export default FilterContextProvider
