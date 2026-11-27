import dayjs from "dayjs"
import plugin from "dayjs/plugin/isYesterday.js"

dayjs.extend(plugin)

export { dayjs }
export default plugin
