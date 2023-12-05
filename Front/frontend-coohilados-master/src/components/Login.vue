<template>
  <v-container fluid>
    <v-row class="justify-center" align="center" style="height: 90vh">
      <v-col>
        <v-card
          class="mx-auto"
          elevation="14"
          color="#004C1C"
          style="max-width: 600px"
        >
          <v-toolbar center flat dark color="#004C1C">
            <v-toolbar-title class="mx-auto mb-0">
              <h2>¡BIENVENIDO!</h2>
            </v-toolbar-title>
          </v-toolbar>
          <v-row align="center">
            <v-col> </v-col>
            <v-col cols="9" class="justify-center">
              <v-avatar class="profile mx-15" size="165" tile>
                <v-img
                  src="https://static-00.iconduck.com/assets.00/user-login-icon-487x512-xx4t1c61.png"
                ></v-img>
              </v-avatar>
            </v-col>
          </v-row>

          <v-form ref="form" class="pa-4 pt-6">
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="Usuario"
              type="text"
              outlined
              required
              hint="Correo Corporativo"
              class="white"
            >
            </v-text-field>
            <v-text-field
              v-model="password"
              :rules="loginRules"
              :counter="20"
              label="Password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              outlined
              required
              hint="Digite su contraseña"
              class="white"
              @click:append="show1 = !show1"
            >
            </v-text-field>
            <v-card-action>
              <v-flex class="text-center">
                <v-btn
                  rounded
                  class="ma-2"
                  outlined
                  color="white"
                  @click="login()"
                >
                  Ingresar
                </v-btn>
              </v-flex>
            </v-card-action>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="align-center">
      <v-col>
        <v-overlay :value="loading">
          <v-progress-circular
            v-show="loading == true"
            :size="70"
            :width="7"
            color="black"
            indeterminate
          ></v-progress-circular>
        </v-overlay>
      </v-col>
    </v-row>
  </v-container>
</template>
  
<script>
import axios from "axios";
export default {
  name: "PageLogin",
  data: () => ({
    email: "",
    password: "",
    loading: false,
    show1: false,
    tiempo: 60,

    valid7: true,
    
    emailRules: [
      (e) => !!e || " Email es requerido ❌",
      (e) =>
        (e && e.length <= 40) || " EL Email Solo puede tener 40 caracteres",
    ],

     valid7: true,
    
    loginRules: [
      (e) => !!e || " La contraseña es  requerido ❌",
      (e) =>
        (e && e.length <= 20) || " La contraseña  Solo puede tener 20 caracteres",
    ],
  }),
  methods: {
    login() {
      this.loading = true;
      axios
        .post("https://back-coohilados.vercel.app/api/usuario/login", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          console.log(response.data.token);
          this.$store.dispatch("setToken", response.data.token);
          this.$store.dispatch("setDatosUsuario", response.data.usuario);
          /* localStorage.setItem('nav','siVer') */
          this.$router.push("/Home");
          this.$swal({
            icon: "success",
            title: "Inicio de sesión exitoso",
          });
          this.expirarSesion();
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
          this.$swal({
            icon: "error",
            title:
              "Error al iniciar sesión, el usuario probablemente no existe",
          });
        });
    },
    expirarSesion() {
      let i = setInterval(() => {
        window.onmousemove = () => {
          this.tiempo = 60;
        };
        this.tiempo--;
        console.log(this.tiempo);
        if (this.tiempo == 30) {
          this.$swal({
            icon: "info",
            title: `Su sesión esta a 30 segundos de cerrar`,
          });
        }
        if (this.tiempo == -1) {
          this.$store.state.token = undefined;
          this.$router.push("/");
          localStorage.removeItem("token");
          localStorage.removeItem("usuario");
          this.$swal({
            icon: "info",
            title: "Su sesión expiro",
          });
          clearInterval(i);
        }
      }, 1200);
    },
    entrar() {
      if (JSON.parse(localStorage.getItem("usuario"))) {
        this.$router.push("/home");
      }
    },
  },
  created() {
    this.entrar();
  },
};
</script>