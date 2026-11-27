import dayjs from "dayjs"
import plugin from "dayjs/plugin/localeData.js"

dayjs.extend(plugin)

export { dayjs }
export default plugin
