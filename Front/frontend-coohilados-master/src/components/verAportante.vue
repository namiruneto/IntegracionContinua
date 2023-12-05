<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-img
          src="https://www.coohilados.com.co/gestion/uploads/product/69/picture.jpg"
        >
          <v-card class="mx-auto my-12 green lighten-3" max-width="850">
            <template slot="progress">
              <v-progress-linear
                color="deep-purple"
                height="10"
                indeterminate
              ></v-progress-linear>
            </template>

            <!-- inicio de la cart ver aportante-->
            <v-card-title justify-right>
              <v-col cols="12" sm="6" md="6" justify="right">
                <v-card-title>{{
                  this.$store.state.datos.nombre
                }}</v-card-title>
              </v-col>
            </v-card-title>
            <v-card-text>
              <v-row align="center" class="mx-0">
                <v-col cols="12" sm="6" md="4">
                  <p
                    label="Estado"
                    style="color: green; font-weight: bold"
                    v-if="this.$store.state.datos.estado == 1"
                  >
                    Estado: Activo
                  </p>
                  <p
                    label="Estado"
                    style="color: red; font-weight: bold"
                    v-if="this.$store.state.datos.estado == 2"
                  >
                    Estado: Inactivo
                  </p>
                  <p
                    label="Estado"
                    style="color: orange; font-weight: bold"
                    v-if="this.$store.state.datos.estado == 3"
                  >
                    Estado: De vacaciones
                  </p>
                </v-col>
              </v-row>
            </v-card-text>

            <v-divider class="mx-4"></v-divider>

            <v-card-text>
              <template>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <h2>Tipo de documento:</h2>
                      <h3>{{ this.$store.state.datos.tipoDocumento }}</h3>
                    </v-col>

                    <v-col cols="12" sm="6" md="6">
                      <h2>Documento:</h2>
                      <h3>{{ this.$store.state.datos.documento }}</h3>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <h2>Apellidos y Nombre:</h2>
                      <h3>{{ this.$store.state.datos.nombre }}</h3>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <h2>Sexo:</h2>
                      <h3>{{ this.$store.state.datos.sexo }}</h3>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <h2>Fecha de nacimiento:</h2>
                      <h3>
                        {{ fecha(this.$store.state.datos.fechaNacimiento) }}
                      </h3>
                    </v-col>

                    <v-col cols="12" sm="6" md="6">
                      <h2>Barrio:</h2>
                      <h3>{{ this.$store.state.datos.barrio }}</h3>
                    </v-col>

                    <v-col cols="12" sm="6" md="6">
                      <h2>Telefono:</h2>
                      <h3>{{ this.$store.state.datos.telefono }}</h3>
                    </v-col>

                    <v-col cols="12" sm="6" md="6">
                      <h2>E-mail:</h2>
                      <h3>{{ this.$store.state.datos.email }}</h3>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <h2>Fecha ingreso:</h2>
                      <h4>{{ fecha(this.$store.state.datos.fechaInicio) }}</h4>
                    </v-col>

                    <v-col cols="12" sm="6" md="6">
                      <h2>Fecha posible finalización:</h2>
                      <h4>{{ fecha(this.$store.state.datos.fechaFin) }}</h4>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <h2>Años de Jubilado:</h2>
                      <h4>
                        {{ antiguedad(this.$store.state.datos.fechaInicio) }}
                      </h4>
                    </v-col>
                    <v-row>
                      <v-col
                        v-if="
                          this.$store.state.usuario.rol == 'Editor de Datos' ||
                          this.$store.state.usuario.rol == 'Actualizador'
                        "
                      >
                        <v-data-table
                          :headers="headers"
                          :items="this.$store.state.datos.anotacion"
                          class="elevation-1"
                        >
                          <template v-slot:top>
                            <v-toolbar flat>
                              <v-toolbar-title>Anotaciones</v-toolbar-title>
                            </v-toolbar>
                          </template>
                          <template v-slot:[`item.fecha`]="{ item }">
                            <span>{{ fecha(item.fecha) }}</span>
                          </template>
                        </v-data-table>
                      </v-col>
                    </v-row>
                  </v-row>
                </v-container>
              </template>
            </v-card-text>
            <v-card-actions>
              <v-btn class="red" color="white" text to="/Aportante">
                Regresar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-img>
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
  name: "PagesverAportante",

  data: () => ({
    loading: false,
    dialog: false,
    menu3: false,
    menu4: false,
    menu2: false,
    departamentos: {},
  }),
  computed: {},
  methods: {
    cambioN() {
      this.detalleTrabajador1.fechaN = this.fechaNacimiento;
    },
    cambioI() {
      this.detalleTrabajador1.fechaI = this.fechaInicio;
    },
    cambioF() {
      this.detalleTrabajador1.fechaF = this.fechaFin;
    },

    departamento() {
      axios
        .get(
          `https://back-coohilados.vercel.app/api/ciudad/ciudades/${this.$store.state.datos.ciudad}`
        )
        .then((response) => {
          console.log(response.data.idCity);
          this.departamentos = response.data.idCity;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    fecha(r) {
      let d = new Date(r);
      let f = d.toISOString();
      return f.split("T")[0].replace(/-/g, "/");
    },
    antiguedad(item) {
      let fecha = Date.now();
      let fechaActual = new Date(fecha);
      let fechaInicial = new Date(item);
      let antiguedad = fechaActual.getFullYear() - fechaInicial.getFullYear();
      if (antiguedad <= 1) {
        return `${antiguedad} año`;
      } else {
        return `${antiguedad} años`;
      }
    },
    traer() {
      this.usuario = JSON.parse(localStorage.getItem("usuario"));
    },
  },
  mounted() {
    this.departamento();
  },
};
</script>