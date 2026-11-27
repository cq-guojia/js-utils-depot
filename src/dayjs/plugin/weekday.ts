import dayjs from "dayjs"
import plugin from "dayjs/plugin/weekday.js"

dayjs.extend(plugin)

export { dayjs }
export default plugin
