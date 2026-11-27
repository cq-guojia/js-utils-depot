import dayjs from "dayjs"
import plugin from "dayjs/plugin/toObject.js"

dayjs.extend(plugin)

export { dayjs }
export default plugin
