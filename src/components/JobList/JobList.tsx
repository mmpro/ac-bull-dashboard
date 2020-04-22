import React, { useState, useEffect, useRef, useContext, useCallback } from 'react'
import { css, cx } from 'emotion'
import { VariableSizeList as List } from 'react-window'

import { DataContext } from '../../context/DataContextProvider'
import JobListItem from '@components/JobListItem/JobListItem'

export const DataHeightsContext = React.createContext( {
    updateItem: ( ( jobId, options ) => null ) as ( ( jobId: string, options: { height?: number, isOpen?: boolean } ) => void ),
    itemDataState: {},
    listRef: null,
} )

export interface Props {
    className?: string;
}

const JobList: React.FC<Props> = ( { className } ) => {
    const listWrapperRef = useRef( null )
    const listRef = useRef( null )
    const legendRef = useRef( null )
    const { shownData } = useContext( DataContext )
    const [ itemDataState, setItemDataState ] = useState( {} )
    const [ listHeight, setListHeight ] = useState( 0 )

    useEffect( () => {
        listRef.current.resetAfterIndex( 0 )
    }, [ shownData ] )

    const setListHeightLocale = () => {
        setListHeight( listWrapperRef.current.offsetHeight - legendRef.current.offsetHeight )
    }

    useEffect( () => {
        setListHeightLocale()
        window.addEventListener( 'resize', setListHeightLocale )
        return () => window.removeEventListener( 'resize', setListHeightLocale )
    }, [] )

    const getSize = ( index ) => {
        const jobId = shownData[ index ].jobId
        return itemDataState[ jobId ]?.height || 90
    }

    const updateItem = useCallback( ( jobId, options ) => {
        const newState = { ...itemDataState[ jobId ] }

        const { height, isOpen } = options
        if ( height ) {
            newState.height = height
        }
        if ( isOpen !== undefined ) {
            newState.isOpen = isOpen
        }
        setItemDataState( {
            ...itemDataState,
            [ jobId ]: newState,
        } )
    }, [ itemDataState ] )

    const stylez = css`

        /* box-sizing: border-box; */
        height: 100%;
        position: relative;

        .list_wrapper{
            /* padding-top: 80px; */
            height: 100%;
            box-sizing: border-box;
        }

        .hacky_space {
            opacity: 0;
        }

        .legend {
            background-color: #29282f;
            border-bottom: 1px solid rgba( 255,255,255,0.9 );
            padding: 8px;
            padding-left: 62px;
            padding-right: 132px;
            color: white;

            .upper {
                font-size: 1.3rem;
            }

            .lower, .mid {
                font-size: 0.825rem;
                font-weight: lighter;
            }

            .mid {
                margin-bottom: 8px;
            }

            .title_job_list {
                font-weight: bold;
            }
        }

    `

    return (
        <div ref={ listWrapperRef } className={ cx( className, stylez ) }>
            <DataHeightsContext.Provider
              value={ {
                  itemDataState,
                  updateItem,
                  listRef,
              } }
            >
                <div className='list_wrapper'>
                    <div className='legend' ref={ legendRef }>
                        <div className='inline w20pc title_job_list_updated_at'>
                            <div className='upper title_job_list'>Job Type</div>
                            <div className='mid title_job_type'>Job List</div>
                            <div className='lower title_updated_at'>Last Updated At</div>
                        </div>
                        <div className='inline w40pc title_job_list_updated_at'>
                            <div className='upper title_job_id'>Job ID</div>
                            <div className='mid hacky_space'>-</div>
                            <div className='lower title_priority'>Attempts | Priority | Status-Text</div>
                        </div>
                        <div className='inline w20pc title_job_list_updated_at'>
                            <div className='upper title_customer'>Customer</div>
                            <div className='mid hacky_space'>-</div>
                            <div className='lower title_worker'>Worker</div>
                        </div>
                        <div className='inline w20pc title_job_list_updated_at'>
                            <div className='upper title_customer'>MC | Media</div>
                            <div className='mid title_format_id'>Format</div>
                            <div className='lower '>Media Title</div>
                        </div>
                    </div>
                    <List
                      height={ listHeight }
                      itemCount={ shownData.length }
                      itemSize={ getSize }
                      width='100%'
                      ref={ listRef }
                    >
                        { JobListItem }
                    </List>
                </div>
            </DataHeightsContext.Provider>
        </div>
    )
}

export default JobList
