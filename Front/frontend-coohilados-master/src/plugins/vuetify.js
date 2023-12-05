import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify,{
    theme:{
        primary: 'green lighten-5',
        secundary: '#E8F5E9'
    },
    customProperties: true,
    iconfont: 'md',

});

export default new Vuetify({ 
});
