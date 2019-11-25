import XtCard from './xt-card'
import DataPicker from './data-picker'

export const install = (Vue) => {
  Vue.component(XtCard.name, XtCard)
  Vue.component(DataPicker.name, DataPicker)
}

export {
  XtCard,
  DataPicker
}

export default install
