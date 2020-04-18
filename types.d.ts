type AllowedStatiTypes = 'waiting' | 'active' | 'finished' | 'failed' | 'delayed'

type StatusConfigType = {
    [ statusTitle in AllowedStatiTypes ]: {
        color: string
    }
}

type ItemDataType = {
    jobList: string,
    jobId: string,
    status: AllowedStatiTypes,
    processedOn: number
    delay: number
    finishedOn: number
    timestamp: number
    progress: null
    priority: number
    attemptsMade: number
    environment: string
    opts: {
        attempts: number,
        delay: number,
        timestamp: number
    }
    data: {
        userId: number
        customerId: number
    }
}
