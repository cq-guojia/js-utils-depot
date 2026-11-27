import dayjs from "dayjs"
import plugin from "dayjs/plugin/pluralGetSet.js"

dayjs.extend(plugin)

export { dayjs }
export default plugin
