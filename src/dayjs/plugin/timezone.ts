import dayjs from "dayjs"
import plugin from "dayjs/plugin/timezone.js"

dayjs.extend(plugin)

export { dayjs }
export default plugin
