import dayjs from "dayjs"
import plugin from "dayjs/plugin/minMax.js"

dayjs.extend(plugin)

export { dayjs }
export default plugin
