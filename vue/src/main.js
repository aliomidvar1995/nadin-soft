/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'
import 'ant-design-vue/dist/antd.css';
import { DatePicker } from 'ant-design-vue';
import Paginate from "vuejs-paginate-next";

const app = createApp(App)

registerPlugins(app)

app.use(DatePicker);

app.use(Paginate);

app.mount('#app')
