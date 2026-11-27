import dayjs from "dayjs"
import plugin from "dayjs/plugin/bigIntSupport.js"

dayjs.extend(plugin)

export { dayjs }
export default plugin
