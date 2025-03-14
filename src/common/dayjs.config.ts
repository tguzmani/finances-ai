import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

// Extend dayjs with timezone support
dayjs.extend(utc)
dayjs.extend(timezone)

// Set global timezone to Venezuela (GMT-4)
dayjs.tz.setDefault('America/Caracas')

export default dayjs
