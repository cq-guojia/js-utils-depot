import dayjs from "dayjs"
import plugin from "dayjs/plugin/isToday.js"

dayjs.extend(plugin)

export { dayjs }
export default plugin
