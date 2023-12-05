<template>
  <v-card class="yellow accent-1 mx-auto my-12" max-width="800">
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>
    <v-row>
      <v-col class="yellow accent-1">
        <v-row align="end" class="fill-height">
          <v-col align-self="start" class="pa-0" cols="12">
            <v-card-title justify-right> </v-card-title>
            <v-card-title>{{ detalleUsuario.nombre }}</v-card-title>

            <v-card-text>
              <v-row align="center" class="mx-0">
                <v-col cols="12" sm="6" md="4">
                  <h3 v-if="$store.state.usuario.estado == 1">
                    Estado:
                    <p label="Estado" style="color: green">Activo</p>
                  </h3>
                  <h3 v-if="$store.state.usuario.estado == 2">
                    Estado:
                    <p label="Estado" style="color: red">Inactivo</p>
                  </h3>
                  <h3 v-if="$store.state.usuario.estado == 3">
                    Estado:
                    <p label="Estado" style="color: orange">Vacaciones</p>
                  </h3>
                </v-col>
              </v-row>
            </v-card-text>

            <v-divider class="mx-4"></v-divider>

            <v-card-text>
              <template>
                <v-container>
                  <v-row>
                    <v-col>
                      <!-- resetear contraseña -->
                      <v-spacer></v-spacer>

                      <v-row >
                        <v-btn class="brown" @click="resetearPassword">
                          resetear Contraseña
                        </v-btn>
                      </v-row>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="detalleUsuario.documento"
                        label="Documento"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="detalleUsuario.nombre"
                        label="Nombres"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="detalleUsuario.email"
                        label="E-mail"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="6">
                      <v-select
                        v-model="detalleUsuario.area"
                        label="Area"
                        :items="area"
                        required
                        @change="cargo(detalleUsuario.area)"
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-container>
              </template>
            </v-card-text>

            <v-card-actions>
              <v-btn
                rounded
                outlined
                color="black"
                class="mb-2 red accent-3"
                text
                to="/Verusuario"
              >
                Regresar
              </v-btn>
              <v-btn
                rounded
                outlined
                color="black"
                class="mb-2 green accent-3"
                @click="editarItem(detalleUsuario._id)"
              >
                Guardar
              </v-btn>
            </v-card-actions>
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
  </v-card>
</template>
<script>
import axios from "axios";
export default {
  name: "PageInfousuario",
  data: () => ({
    loading: false,
    valid: true,
    show1: false,
    show2: false,
    show3: false,
    dialog: false,
    valid6: true,
    password: "",
    area: ["CONSEJO O GERENCIA", "TALENTO HUMANO", "SISTEMAS", "SST"],
    rol: ["Actualizador", "Administrador", "Editor de Datos", "Visualizador"],
    usuarios: [],

    detalleUsuario: {
      documento: "",
      nombre: "",
      email: "",
      area: "",
      cargos: "",
    },
    id: "",
  }),
  methods: {
    cargo(item) {
      if (item == "CONSEJO O GERENCIA") {
        this.detalleUsuario.cargos = "Visualizador";
      } else if (item == "TALENTO HUMANO") {
        this.detalleUsuario.cargos = "Editor de Datos";
      } else if (item == "SISTEMAS") {
        this.detalleUsuario.cargos = "Administrador";
      } else if (item == "SST") {
        this.detalleUsuario.cargos = "Actualizador";
      }
      console.log(item);
    },
    compararPasswords() {
      if (this.nuevaPassword === this.confirmarPassword) {
        return true;
      } else {
        return "Passwords deben coincidir";
      }
    },
    traerUsuario() {
      this.id = this.$store.state.datos._id;
      this.detalleUsuario = {
        documento: this.$store.state.datos.documento,
        nombre: this.$store.state.datos.nombre,
        email: this.$store.state.datos.email,
        area: this.$store.state.datos.area,
        cargos: this.$store.state.datos.rol,
      };
    },

    resetearPassword() {
      this.loading = true;
      axios
        .put(
          `https://back-coohilados.vercel.app/api/usuario/resetearPassword/${this.id}`
        )
        .then((res) => {
          this.loading = false;
          console.log(res);
          this.$swal({
            icon: "success",
            title: `Contraseña: ${res.data.aleatorio}`,
          });
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
          this.$swal({
            icon: "error",
            title: "Error al resetear la contraseña.",
          });
        });
    },
    editarItem() {
      this.loading = true;
      axios
        .put(`https://back-coohilados.vercel.app/api/usuario/${this.id}`, {
          documento: this.detalleUsuario.documento,
          nombre: this.detalleUsuario.nombre,
          email: this.detalleUsuario.email,
          area: this.detalleUsuario.area,
          rol: this.detalleUsuario.cargos,
        })
        .then((response) => {
          this.traerUsuario();
          (this.loading = false), console.log(response);
          this.$store.dispatch("setDatos", response.data.item);
          this.$router.push("/Infousuario");

          this.$swal({
            icon: "success",
            title: "Se edito Usuario correctamente",
          });
        })
        .catch((error) => {
          console.log(error);
          this.dialog = false;
          this.loading = false;
          this.$swal({
            icon: "error",
            title: "Error al editar el Usuario, por favor verifique los datos",
          });
        });
    },
    traer() {
      this.user = JSON.parse(localStorage.getItem("usuario"));
    },
  },
  created() {
    this.traer();
    this.traerUsuario();
  },
};
</script>