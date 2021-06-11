import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { ValidationProvider } from 'vee-validate'

const app = createApp(App)
app.use(store)
app.use(router)
app.component('ValidateionProvider', ValidationProvider)
app.mount('#app')
