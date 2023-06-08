/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'
//import { formatDate } from './filters/filters.js'
import moment from 'moment';
import 'moment/locale/pt-br';
//import { useFilters } from '@/composables/filters';
//import { formatDate } from './filters';

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

const formatDate = (value) => {
    //return moment(value).format('DD/MM/YYYY');
    // const [year, month, day] = value.split('-');
    // return `${day}-${month}-${year}`;
    return moment(value).format('DD/MM/YYYY');
};

const app = createApp(App)

registerPlugins(app)

// app.config.globalProperties.$filters = {
//     formatDate
// }
app.config.globalProperties.$filters = {
    formatDate
};

app.mount('#app')
