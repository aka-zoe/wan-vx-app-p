import Vue from 'vue'
import App from './'
import 'iview-mpvue/dist/components/modal/style/css'

// add this to handle exception
Vue.config.errorHandler = function (err) {
  if (console && console.error) {
    console.error(err)
  }
}

const app = new Vue(App)
app.$mount()
