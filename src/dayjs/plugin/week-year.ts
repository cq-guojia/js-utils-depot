import dayjs from "dayjs"
import plugin from "dayjs/plugin/weekYear.js"

dayjs.extend(plugin)

export { dayjs }
export default plugin
