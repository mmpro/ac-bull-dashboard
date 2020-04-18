import React, { useState, useEffect, useContext, useRef } from 'react'
import { css, cx } from 'emotion'
import moment from 'moment'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

import { statusConfig } from '../../../config/statusConfig'

import JobListItemDeleteJobButton from '../JobListItemDeleteJobButton/JobListItemDeleteJobButton'
import JobListItemRestartJobButton from '../JobListItemRestartJobButton/JobListItemRestartJobButton'
import IndicatorCircle from '../IndicatorCircle/IndicatorCircle'

import { DataContext } from '../../context/DataContextProvider'
import { DataHeightsContext } from '../JobList/JobList'
import { colors } from '../../../config/colors'

export interface Props {
    index?: number
    data?: any
    style?: any
    onClick: ( index ) => void
}

const JobListItem: React.FC<Props> = ( {
    index,
    style,
} ) => {
    const itemRef = useRef( null )
    const { heights, setHeight, listRef } = useContext( DataHeightsContext )
    const [ open, setOpen ] = useState( heights[ index ] )
    const { shownData } = useContext( DataContext )

    const {
        status,
        jobList,
        jobId,
        priority,
        progress,
        timestamp,
        processedOn,
        finishedOn,
        data: jobdata,
    } = shownData[ index ]

    useEffect( () => {
        setHeight( index, open && itemRef.current.offsetHeight )
        listRef.current.resetAfterIndex( 0 )
        // eslint-disable-next-line
    }, [ open ] )

    const handleClick = () => {
        if ( open ) {
            console.log( 'close' )
            handleClose()
        } else {
            console.log( 'open' )
            handleOpen()
        }
    }

    const handleOpen = () => {
        setOpen( true )
    }

    const handleClose = () => {
        setOpen( false )
    }

    const stylez = css`

        box-sizing: border-box;
        position: relative;
        padding-left: 30px;
        transition: 0.3s;
        overflow: hidden;
        border-bottom: 2px solid rgba( 0,0,0,0.3 );

        .basic_content {
            height: 70px;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            color: #ceecff;
            background-color: #414248;

            .basic_content_inner {
                width: 100%;
            }
        }

        .status_indicator {
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 30px;
            transition: background-color 300ms;
            border-right: 1px solid black;
        }

        .job_title {
            font-weight: bold;
        }

        .upper_row {
            position: relative;
            box-sizing: content-box;
            font-size: 1.3rem;
            padding: 0 132px 0 32px;
            text-align: left;
            /* background-color: red; */
            /* padding-right: 132px; */
        }

        .lower_row {
            text-align: left;
            padding: 0 132px 0 32px;
            font-weight: lighter;
            font-size: 0.825rem
        }

        .extra_content {
            border-top: 2px solid rgba( 0,0,0,0.3 );
            padding: 16px 32px;
            box-shadow: inset 0px 1px 3px 0px rgba( 0,0,0,0.3 );
        }

        .progress_overview {
            display: flex;
            align-items: center;
            justify-content: space-around;
            position: absolute;
            right: 0;
            top: 0;
            width: 120px;
            padding-right: 10px;
            padding-left: 2px;
            height: 70px;
            border-left: 1px solid rgba( 0,0,0,0.3 );
            /* pointer-events: none; */

            .actions {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
            }
        }

    `

    console.log( moment.duration( processedOn - timestamp ).milliseconds() )

    const renderStatus = () => {
        return (
            <div style={ { backgroundColor: statusConfig[ status ] && statusConfig[ status ].color } } className={ cx( 'status_indicator' ) } />
        )
    }

    return (
        <div key={ jobId } className={ cx( stylez ) } style={ style }>
            { renderStatus() }
            <div className='content' ref={ itemRef }>
                <div className='basic_content' onClick={ handleClick }>
                    <div className='basic_content_inner'>
                        <div className='upper_row'>
                            <div className='w30pc inline job_title'>{ jobList }</div>
                            <div className='w50pc inline job_id'>{ jobId }</div>
                            <div className='w20pc inline customer_id'>{ jobdata && jobdata.customerId }</div>
                        </div>
                        <div className='lower_row'>
                            <div className='w30pc inline last_updated'>{ moment( Math.max( timestamp, processedOn, finishedOn ) ).format( 'HH:mm:ss - DD.MM.YY' ) }</div>
                            <div className='w50pc inline prio'>{ priority }</div>
                            {/* <div className='inline worker'>{ worker }</div> */}
                        </div>
                    </div>
                    <div className='progress_overview' onClick={ e => e.stopPropagation() }>
                        <IndicatorCircle
                          r={ 30 }
                          animationDuration={ 0 }
                          value={ status === 'finished' ? 100 : status === 'failed' ? 0 : parseInt( progress ) }
                          color={ status === 'failed' ? colors.warning : status === 'finished' ? colors.success : colors.pending }
                          circleColor={ status === 'failed' ? colors.warning : colors.unTouched }
                          showValue={ ( status === 'finished' || status === 'failed' ) || Number.isInteger( parseInt( progress ) ) }
                        />
                        <div className='actions'>
                            <JobListItemDeleteJobButton jobList={ jobList } jobId={ jobId } status={ status } />
                            <JobListItemRestartJobButton jobList={ jobList } jobId={ jobId } status={ status } />
                        </div>
                    </div>
                </div>
                {
                    open && (
                        <div className='extra_content'>
                            <TableContainer component={ Paper }>
                                <Table size='small' aria-label='a dense table'>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Created</TableCell>
                                            <TableCell>Waited</TableCell>
                                            <TableCell>Processed</TableCell>
                                            <TableCell>Finished</TableCell>
                                            <TableCell>Run</TableCell>
                                            <TableCell>Attempts</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow key=''>
                                            <TableCell>{ timestamp && moment( timestamp ).fromNow() }</TableCell>
                                            <TableCell>{ processedOn && timestamp && ( `${ processedOn - timestamp }ms` ) }</TableCell>
                                            <TableCell>{ processedOn && moment( processedOn ).format( 'HH:mm:ss - DD.MM.YY' ) }</TableCell>
                                            <TableCell>{ finishedOn && moment( finishedOn ).format( 'HH:mm:ss - DD.MM.YY' ) }</TableCell>
                                            <TableCell>{ finishedOn && processedOn && ( `${ finishedOn - processedOn }ms` ) }</TableCell>
                                            <TableCell>x</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default JobListItem
