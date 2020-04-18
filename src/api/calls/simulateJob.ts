import axios from 'axios'
import { authStore } from 'ac-app-authenticator'

import { hosts } from '../../../config/api/hosts'

export const simulateJob = ( env: 'dev' | 'live' ) => {
    return axios.get( `${ hosts.jobs[ env ] }/v1/bull/simulateJob/miscActivities`, authStore.authedApiCallBaseConfig() )
}
