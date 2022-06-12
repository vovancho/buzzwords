import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import ru from "vuetify/lib/locale/ru";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    css: {
      loaderOptions: {
        sass: {
          data: `@import "~@/sass/variables.sass"`,
        },
      },
    },
  },
  lang: {
    locales: { ru },
    current: "ru",
  },
});
