import XtCard from './xt-card'
import XtSelect from './xt-select'
import DataPicker from './data-picker'

export const install = (Vue) => {
  Vue.component(XtCard.name, XtCard)
  Vue.component(DataPicker.name, DataPicker)
  Vue.component(XtSelect.name, XtSelect)
}

export {
  XtCard,
  DataPicker,
  XtSelect
}

export default install
