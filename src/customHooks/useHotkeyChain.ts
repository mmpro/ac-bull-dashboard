import { useEffect, useMemo } from 'react'

const createKeyChainChecker = ( hotkeys = [] ) => {
    let timeout
    let index = 0
    const TAIL = hotkeys.length - 1

    return ( key ) => {
        clearTimeout( timeout )
        timeout = setTimeout( () => {
            index = 0
        }, 500 )

        if ( key !== hotkeys[ index ] ) {
            index = 0
            return false
        }

        if ( index === TAIL ) {
            index = 0
            return true
        }

        index++
        return false
    }
}

export function useHotKeyChain ( hotKeys: string[], onMatch: () => void ) {
    const keyCrawler = useMemo( () => createKeyChainChecker( [].concat( hotKeys ) ), [
        hotKeys,
    ] )

    const listen = ( e ) => {
        e.stopPropagation()
        if ( keyCrawler( e.key ) ) {
            onMatch()
        }
    }

    useEffect( () => {
        window.addEventListener( 'keydown', listen )
        return () => window.removeEventListener( 'keydown', listen )
    } )
}

export default useHotKeyChain
