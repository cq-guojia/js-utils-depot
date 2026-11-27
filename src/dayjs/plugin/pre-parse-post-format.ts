import dayjs from "dayjs"
import plugin from "dayjs/plugin/preParsePostFormat.js"

dayjs.extend(plugin)

export { dayjs }
export default plugin
