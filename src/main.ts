import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import { createI18n } from 'vue-i18n'

import Loader from './components/Loader.vue'
import SideModal from './components/SideModal.vue'

import { messages } from './translations'
const i18n = createI18n({
    locale: 'ru',//store.getters.GET_LOCALE.toLowerCase(),
    messages
})

const app = createApp(App);

app.provide("store", store);

app.use(router)
app.use(i18n)

app.component('SideModal', SideModal)
app.component('Loader', Loader)


app.mount("#app");
