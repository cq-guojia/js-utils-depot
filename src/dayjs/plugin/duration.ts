import dayjs from "dayjs"
import plugin from "dayjs/plugin/duration.js"

dayjs.extend(plugin)

export { dayjs }
export default plugin
