/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Composables
import { createVuetify } from 'vuetify'
import { VPie } from 'vuetify/labs/VPie'
// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'system',
    themes: {
      light: {
        colors: {
          primary: "#008080",
          secondary: "#424242",
        },
      },

      dark: {
        colors: {
          primary: "#008080",
          secondary: "#BDBDBD",
        },
      },
    },
  },
  components: {
    VPie,
  },
})
