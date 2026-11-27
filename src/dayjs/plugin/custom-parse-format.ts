import dayjs from "dayjs"
import plugin from "dayjs/plugin/customParseFormat.js"

dayjs.extend(plugin)

export { dayjs }
export default plugin
