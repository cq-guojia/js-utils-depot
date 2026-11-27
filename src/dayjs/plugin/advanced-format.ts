import dayjs from "dayjs"
import plugin from "dayjs/plugin/advancedFormat.js"

dayjs.extend(plugin)

export { dayjs }
export default plugin
