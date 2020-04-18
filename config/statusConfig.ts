import { colors } from './colors'

export const statusConfig: StatusConfigType = {
    waiting: {
        color: colors.unTouched,
    },
    active: {
        color: colors.pending,
    },
    finished: {
        color: colors.success,
    },
    failed: {
        color: colors.warning,
    },
    delayed: {
        color: colors.delayed,
    },
}
