import { isDev } from '../../../config/api/envDecision'

export const autoDecideEnv = () => {
    const dev = isDev.find( devOrigins => window.location.origin.indexOf( devOrigins ) !== -1 )
    if ( dev ) {
        return 'dev'
    }
    return 'live'
}
