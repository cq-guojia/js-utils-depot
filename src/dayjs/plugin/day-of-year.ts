import dayjs from "dayjs"
import plugin from "dayjs/plugin/dayOfYear.js"

dayjs.extend(plugin)

export { dayjs }
export default plugin
