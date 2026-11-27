import dayjs from "dayjs"
import plugin from "dayjs/plugin/isMoment.js"

dayjs.extend(plugin)

export { dayjs }
export default plugin
