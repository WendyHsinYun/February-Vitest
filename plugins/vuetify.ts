// import this after install `@mdi/font` package
import '@mdi/font/css/materialdesignicons.css';
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const customTheme = {
  dark: false,
  colors: {
    primary: '#FF6948',
    background: '#F8F8F9',
    surface: '#FFFFFF',
    primaryText: '#282828',
    secondaryText: '#5E5E5E',
    line: '#D0D0D0'
  },
};

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    theme: {
      defaultTheme: 'customTheme',
      themes: {
        customTheme,
      },
    },
  });
  app.vueApp.use(vuetify);
});

export { components, directives };
