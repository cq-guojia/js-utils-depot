import dayjs from "dayjs"
import plugin from "dayjs/plugin/isSameOrBefore.js"

dayjs.extend(plugin)

export { dayjs }
export default plugin
