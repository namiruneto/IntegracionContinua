<template>
  <div>
    <v-app-bar color="#07451E" v-if="token != undefined">
      <v-row>
        <v-col cols="1" v-if="token != undefined">
          <v-card-actions>
            <v-list-item color="#41B44C" to="/Home">
              <v-list-item-icon class="white--text mb-5 mt-10">
                <font-awesome-icon icon="fa-solid fa-house" />
              </v-list-item-icon>
            </v-list-item>
          </v-card-actions>
        </v-col>
        

        <v-col cols="7">
          <v-toolbar-title class="white--text mb-2 mt-7">
            <h3>COOHILADOS</h3>
            <br />
          </v-toolbar-title>
        </v-col>
      </v-row>

      <v-btn
        class="white--text mx-6"
        icon
        v-if="token != undefined"
        @click="cerrarSesion()"
      >
        <v-icon>mdi-account-off</v-icon>
        <h6>Cerrar sesión</h6>
      </v-btn>
      <v-menu left bottom> </v-menu>
    </v-app-bar>

    <template>
      <div></div>
    </template>

    <v-navigation-drawer
      src="https://eurofique.info/wp-content/gallery/visita-virtual-expo-fique-historia-y-futuro/07-saco-de-fique.jpg"
      v-model="drawer"
      absolute
      temporary
      v-if="token != undefined"
    >
      <v-img
        src="https://coohilados.com.co/carga/upload/images/QUIENESSOMOS1.jpg"
      >
        <v-list nav dense>
          <v-list-item-group
            color="orange darken-4"
            v-model="group"
            active-class="purple lighten-2"
          >
            <h1>INICIO</h1>
            <v-list-group
              color="green accent-4"
              :value="true"
              no-action
              sub-group
            >
              <v-list-item
                color="red accent-3"
                to="Gerencia"
                v-if="persona.rol == 'Visualizador'"
              >
                <h4>CONSEJO O GERENCIA</h4>
              </v-list-item>
              <v-list-item
                color="green accent-4"
                to="TH"
                v-if="persona.rol == 'Editor de Datos'"
              >
                <h3>TALENTO HUMANO</h3>
              </v-list-item>
              <v-list-item
                color="red accent-3"
                to="Sistemas"
                v-if="persona.rol == 'Administrador'"
              >
                <h3>SISTEMAS</h3>
              </v-list-item>
              <v-list-item
                color="red accent-3"
                to="Sst"
                v-if="persona.rol == 'Actualizador'"
              >
                <h3>SST</h3>
              </v-list-item>
            </v-list-group>
          </v-list-item-group>
        </v-list>
      </v-img>
    </v-navigation-drawer>
  </div>
</template>
<script>
export default {
  name: "PageHeader",
  data: () => ({
    drawer: false,
    group: null,
    cerrar: "",
    persona: "",
    token: "",
  }),
  methods: {
    cerrarSesion() {
      this.$store.state.token == undefined;
      this.$router.push("/");
      localStorage.removeItem("token");
      localStorage.removeItem("usuario");
      this.$swal({
        icon: "success",
        title: "Usted cerro sesión exitosamente. 👋",
      });
    },
    traerUsuario() {
      this.persona = JSON.parse(localStorage.getItem("usuario"));
    },
    traerToken() {
      this.token = localStorage.getItem("token");
    },
  },
  created() {
    this.traerToken();
    this.traerUsuario();
  },
};
</script>