import dayjs from "dayjs"
import plugin from "dayjs/plugin/weekOfYear.js"

dayjs.extend(plugin)

export { dayjs }
export default plugin
