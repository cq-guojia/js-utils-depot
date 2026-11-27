import dayjs from "dayjs"
import plugin from "dayjs/plugin/objectSupport.js"

dayjs.extend(plugin)

export { dayjs }
export default plugin
