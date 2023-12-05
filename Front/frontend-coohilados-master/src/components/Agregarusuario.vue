<template>
  <v-app>
    <v-container>
      <br />
      <v-row>
        <v-col colored-border type="warning">
          <v-row>
            <v-col>
              <v-row align="end" class="fill-height">
                <v-col align-self="start" class="pa-0" cols="12">
                  <v-card class="mx-auto yellow accent-1" max-width="700" tile>
                    <v-card-title class="text-h5"
                      ><h1>Ingrese nuevo usuario</h1></v-card-title
                    >
                    <v-card-text>
                      <v-text-field
                        v-model="documento"
                        :rules="documentoRules"
                        label="Documento"
                        required
                        hint="Ingrese Solo números sin puntos ni comas"
                      ></v-text-field>

                      <v-text-field
                        v-model="nombre"
                        label="Nombre y Apellidos"
                        :rules="nombreRules"
                        required
                      ></v-text-field>

                      <v-text-field
                        v-model="email"
                        label="E-mail"
                        :rules="emailRules"
                        required
                      ></v-text-field>

                      <v-select
                        v-model="area"
                        label="Area"
                        :items="area"
                        required
                        @change="cargo(area)"
                      ></v-select>

                      
                    </v-card-text>
                    <v-card-actions>
                      <v-btn color="blue darken-1" text to="/">Cancel</v-btn>
                      <v-btn color="blue darken-1" text @click="agregar()"
                        >Guardar</v-btn
                      >
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
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
  </v-app>
</template>
<script>
import axios from "axios";
export default {
  name: "PagesAgregarusuario",
  data: () => ({
    loading: false,
    dialog: false,
    dialogEdit: false,

    valid: true,
    nombre: "",
    nombreRules: [
      (n) => !!n || " Nombre y Apellidos son requerido ❌",
      (n) =>
        (n && n.length <= 50) || " EL Nombre solo puede tener 50 caracteres",
    ],

    vali2: true,
    documento: "",
    documentoRules: [
      (d) => !!d || " EL numero del Documento es requerido ❌",
      (d) =>
        (d && d.length <= 17) || " Cedula No puede tener menos de 6 caracteres",
    ],

    vali5: true,
    email: "",
    emailRules: [
      (e) => !!e || " EL E-mail es requerido ❌",
      (e) =>
        (e && e.length <= 40) ||
        " el email  solo puede tener menos de  40 caracteres",
    ],

    area: ["CONSEJO O GERENCIA", "TALENTO HUMANO", "SISTEMAS", "SST"],
    rol: ["Actualizador", "Administrador", "Editor de Datos", "Visualizador"],
    cargos: "",

    usuarios: [],
  }),
  methods: {
    cargo(item) {
      if (item == "CONSEJO O GERENCIA") {
        this.cargos = "Visualizador";
      } else if (item == "TALENTO HUMANO") {
        this.cargos = "Editor de Datos";
      } else if (item == "SISTEMAS") {
        this.cargos = "Administrador";
      } else if (item == "SST") {
        this.cargos = "Actualizador";
      }
      console.log(item);
    },
    detalleUsuario(item) {
      this.$router.push("/Infousuario");
      this.$store.dispatch("setDatos", item);
      console.log(this.$store.state.datos);
    },

    traerUsuarios() {
      axios
        .get("https://back-coohilados.vercel.app/api/usuario")
        .then((response) => {
          this.usuarios = response.data.usuario;
          console.log(this.usuarios);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    desactivar(id) {
      console.log(id);
      if (id) {
        axios
          .put(
            `https://back-coohilados.vercel.app/api/usuario//desactivar/desactivar/${id}`
          )
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    activar(id) {
      console.log(id);
      if (id) {
        axios
          .put(`https://back-coohilados.vercel.app/api/usuario/activar/${id}`)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    agregar() {
      this.loading = true;
      let header = { headers: { "x-token": this.$store.state.token } };
      console.log(header);
      axios
        .post(
          "https://back-coohilados.vercel.app/api/usuario",
          {
            documento: this.documento,
            nombre: this.nombre,
            email: this.email,
            area: this.area,
            rol: this.cargos,
          },
          header
        )
        .then((response) => {
          this.dialog = false;
          console.log(response);
          this.$store.dispatch("setDatos", response.data.item);
          this.$router.push("/");
          this.loading = false;

          this.$swal({
            icon: "success",
            title: `👌, Contraseña ⌨ '${response.data.password}'`,
          });
        })
        .catch((error) => {
          console.log(error);
          this.dialog = false;
          this.loading = false;
          this.$swal({
            icon: "error",
            title:
              "Error al guardar el Usuario, Por favor verifique correctamente los datos",
          });
        });
    },
  },

  created() {
    this.traerDepartamentos();
    //this.traerCiudades()
    //this.agregar()
    this.traerUsuarios();
  },
};
</script>