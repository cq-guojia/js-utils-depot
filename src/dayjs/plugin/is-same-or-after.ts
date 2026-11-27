import dayjs from "dayjs"
import plugin from "dayjs/plugin/isSameOrAfter.js"

dayjs.extend(plugin)

export { dayjs }
export default plugin
