import axios from 'axios'
import { authStore } from 'ac-app-authenticator'
import { random as lodashRandom } from 'lodash-es'

import { hosts } from '../../../config/api/hosts'

export const simulateJob = ( env: 'dev' | 'live' ) => {
    return axios.get( `${ hosts.jobs[ env ] }/v1/bull/simulateJob/miscActivities?duration=${ lodashRandom( 10, 120 ) }`, authStore.authedApiCallBaseConfig() )
}
