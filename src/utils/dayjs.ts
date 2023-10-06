import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"

const defaultTimezone = "Asia/Makassar"

dayjs.extend(utc)
dayjs.extend(timezone)

const formatDateTime = (date: string | Date) => {
  return dayjs(date).tz(defaultTimezone).format("DD MMMM YYYY HH:mm")
}


const setTimeToDate = (date: string | Date, h = 0, m = 0, s = 0) => {
  return dayjs(date).tz(defaultTimezone).set("hour", h).set("minute", m).set("second", s)
}


export { defaultTimezone, setTimeToDate, formatDateTime}