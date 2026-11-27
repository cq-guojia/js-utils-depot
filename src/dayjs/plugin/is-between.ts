import dayjs from "dayjs"
import plugin from "dayjs/plugin/isBetween.js"

dayjs.extend(plugin)

export { dayjs }
export default plugin
