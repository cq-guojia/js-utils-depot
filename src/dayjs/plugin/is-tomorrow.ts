import dayjs from "dayjs"
import plugin from "dayjs/plugin/isTomorrow.js"

dayjs.extend(plugin)

export { dayjs }
export default plugin
