import dayjs from "dayjs"
import plugin from "dayjs/plugin/isoWeek.js"

dayjs.extend(plugin)

export { dayjs }
export default plugin
