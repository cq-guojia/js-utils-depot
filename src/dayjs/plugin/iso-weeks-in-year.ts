import dayjs from "dayjs"
import plugin from "dayjs/plugin/isoWeeksInYear.js"

dayjs.extend(plugin)

export { dayjs }
export default plugin
