import React, { useState, useEffect, useContext } from 'react'
import { css, cx } from 'emotion'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Button from '@material-ui/core/Button'

import { deleteJob } from '../../../api/calls/deleteJob'
import { DataContext } from '../../../context/DataContextProvider'
import { OptionsContext } from '../../../context/OptionsContextProvider'
import PopUpMessage from '@components/PopUpMessage/PopUpMessage'

export interface Props {
    className?: string;
    close: () => void
}

const DeleteWholeJobListEntries: React.FC<Props> = ( { className, close } ) => {
    const { availableJobLists } = useContext( DataContext )
    const { env } = useContext( OptionsContext )
    const [ selectedJobList, setSelectedJobList ] = useState( '' )
    const [ showConfirm, setShowConfirm ] = useState( false )

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

    const handleChange = ( event: React.ChangeEvent<{ value: unknown }> ) => {
        setSelectedJobList( event.target.value as string )
    }

    return (
        <div className={ cx( className, stylez ) }>
            <div className='description'>
                Delete all entries from Joblist:
            </div>
            <FormControl>
                <InputLabel id='demo-simple-select-label'>Job List</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={ selectedJobList }
                  onChange={ handleChange }
                >
                    {
                        availableJobLists.map( availableJobList => (
                            <MenuItem key={ availableJobList } value={ availableJobList }>{ availableJobList }</MenuItem>
                        ) )
                    }
                </Select>
            </FormControl>
            <div className='buttons'>
                <div className='btn shallow' onClick={ () => close() }>Cancel</div>
                <div className='btn' onClick={ () => setShowConfirm( true ) }>Delete</div>
            </div>
            {
                showConfirm && (
                    <PopUpMessage
                      message={ `Are you sure to remove all items from Joblist: "${ selectedJobList }"?` }
                      onCancel={ () => {
                          setShowConfirm( false )
                          close()
                      } }
                      onOk={ () => {
                          deleteJob( env, selectedJobList, '' )
                              .then( () => {
                                  setShowConfirm( false )
                                  close()
                              } )
                      } }
                    />
                )
            }
        </div>
    )
}

export default DeleteWholeJobListEntries
