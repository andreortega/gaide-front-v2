/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#4ED9B2', // aqua
          secondary: '#BEF533', // light green
          tertiary: '#002D20', // dark green
          quartiary: '#59624F', // light grey
          lightGreen: '#F4FDDD' // light green
        },
      },
    },
  },
})
