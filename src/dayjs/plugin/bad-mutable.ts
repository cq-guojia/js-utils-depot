import dayjs from "dayjs"
import plugin from "dayjs/plugin/badMutable.js"

dayjs.extend(plugin)

export { dayjs }
export default plugin
