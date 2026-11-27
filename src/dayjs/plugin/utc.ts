import dayjs from "dayjs"
import plugin from "dayjs/plugin/utc.js"

dayjs.extend(plugin)

export { dayjs }
export default plugin
