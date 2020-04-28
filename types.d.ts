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
    worker: string,
    jobUpdated: number,
    statusText: string,
    finishedOn: number
    timestamp: number
    progress: null
    priority: number
    failedReason?: string
    attemptsMade: number
    environment: string
    opts?: {
        attempts: number,
        delay: number,
        timestamp: number
    }
    data?: {
        mediaContainerId?: number
        mediaId?: number
        container_name?: { content: string, title: string }[] //eslint-disable-line
        format: {
            id: number
        }
        type?: string
        userId: number
        statusText: string
        customerId: number
        encoderSettings?: {
            height: number
        }
    }
}
