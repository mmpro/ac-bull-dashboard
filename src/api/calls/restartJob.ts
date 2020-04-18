import axios from 'axios'
import { authStore } from 'ac-app-authenticator'

import { hosts } from '../../../config/api/hosts'

export const restartJob = ( env: 'dev' | 'live', jobList, jobId ) => {
    return axios.get( `${ hosts.jobs[ env ] }/v1/bull/retryJob/${ jobList }/${ jobId }`, authStore.authedApiCallBaseConfig() )
}
