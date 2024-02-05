import { createApp } from 'vue'
import App from './App.vue'

// vuetify
// import { vuetify } from 'vuetify'
// import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'


// amplify
import { Amplify } from "aws-amplify";
import aws_exports from "./aws-exports";


const vuetify = createVuetify({
  components,
  directives
})


Amplify.configure(aws_exports);
createApp(App).use(vuetify).mount('#app');
