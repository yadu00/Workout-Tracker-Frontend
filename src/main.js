import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import store from './store'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

loadFonts().then(() => {
  createApp(App)
    .use(vuetify)
    .use(router)
    .use(store)
    .mount('#app');
});