import dayjs from "dayjs"
import plugin from "dayjs/plugin/updateLocale.js"

dayjs.extend(plugin)

export { dayjs }
export default plugin
