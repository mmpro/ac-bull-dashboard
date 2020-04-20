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
    const { shownData } = useContext( DataContext )
    const [ itemDataState, setItemDataState ] = useState( {} )

    const getSize = ( index ) => {
        const jobId = shownData[ index ].jobId
        return itemDataState[ jobId ]?.height || 70
    }

    const updateItem = useCallback( ( jobId, options ) => {
        const newState = { ...itemDataState[ jobId ] }

        const { height, isOpen } = options
        if ( height ) {
            newState.height = height
        }
        if ( isOpen ) {
            newState.isOpen = isOpen
        }
        setItemDataState( {
            ...itemDataState,
            [ jobId ]: newState,
        } )
    }, [ itemDataState ] )

    const stylez = css`

        box-sizing: border-box;
        display: flex;
        flex-flow: column;
        height: calc( 100% - 92px );
        margin-bottom: 20px; /* i really have no idea why this is needed to show the last item correctly..  */

        .list_wapper {
            padding-top: 80px;

        }

        .legend{
            background-color: #29282f;
            border-bottom: 1px solid rgba( 255,255,255,0.9 );
            padding: 8px;
            padding-left: 62px;
            padding-right: 132px;
            color: white;

            .upper {
                font-size: 1.3rem;
            }

            .lower {
                font-size: 0.825rem;
                font-weight: lighter;
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
                    <div className='legend'>
                        <div className='inline w30pc title_job_list_updated_at'>
                            <div className='upper title_job_list'>Job List</div>
                            <div className='lower title_updated_at'>Last Updated At</div>
                        </div>
                        <div className='inline w50pc title_job_list_updated_at'>
                            <div className='upper title_job_id'>Job ID</div>
                            <div className='lower title_priority'>Priority</div>
                        </div>
                        <div className='inline w20pc title_job_list_updated_at'>
                            <div className='upper title_customer'>Customer Id</div>
                            <div className='lower title_worker'>Worker</div>
                        </div>
                    </div>
                    <List
                      height={ 1000 }
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
