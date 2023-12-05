<template>
  <v-container fluid>
    <v-img
          src="https://www.coohilados.com.co/gestion/uploads/product/69/picture.jpg"
        >
    <v-row>
      <v-col>
        
        <v-card class="mx-auto my-12 green lighten-3" max-width="900">
          <v-card-title justify-right>
            <v-col cols="12" sm="6" md="6" justify="right">
              <v-card-title>{{ this.$store.state.datos.nombre }}</v-card-title>
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
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <h2>Tipo de documento:</h2>
                <h4>{{ this.$store.state.datos.tipoDocumento }}</h4>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <h2>Documento:</h2>
                <h4>{{ this.$store.state.datos.documento }}</h4>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <h2>Nombre:</h2>
                <h4>{{ this.$store.state.datos.nombre }}</h4>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <h2>Sexo:</h2>
                <h4>{{ this.$store.state.datos.sexo }}</h4>
              </v-col>

              <v-col cols="12" sm="6" md="6">
                <h2>Fecha de nacimiento:</h2>
                <h4>
                  {{ fecha(this.$store.state.datos.fechaNacimiento) }}
                </h4>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <h2>Barrio:</h2>
                <h4>{{ this.$store.state.datos.barrio }}</h4>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <h2>Departamento:</h2>
                <h4>
                  {{ this.departamentos.Departamento }}
                </h4>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <h2>Ciudad:</h2>
                <h4>{{ this.departamentos.Ciudad }}</h4>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <h2>Telefono:</h2>
                <h4>{{ this.$store.state.datos.telefono }}</h4>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <h2>Correo:</h2>
                <h4>{{ this.$store.state.datos.email }}</h4>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <h2>Rh:</h2>
                <h4>{{ this.$store.state.datos.rh }}</h4>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <h2>Pensión:</h2>
                <h4>{{ this.$store.state.datos.pension }}</h4>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <h2>Arl:</h2>
                <h4>{{ this.$store.state.datos.arl }}</h4>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <h2>Eps:</h2>
                <h4>{{ this.$store.state.datos.eps }}</h4>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <h2>Tipo de contrato:</h2>
                <h4>{{ this.$store.state.datos.tipoContrato }}</h4>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <h2>Area de trabajo:</h2>
                <h4>{{ this.$store.state.datos.areaTrabajo.nombre }}</h4>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <h2>Cargo:</h2>
                <h4>{{ this.$store.state.datos.rol }}</h4>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <h2>Salario:</h2>
                <h4>{{ this.$store.state.datos.salario }}</h4>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <h2>Fecha inicio contrato:</h2>
                <h4>{{ fecha(this.$store.state.datos.fechaInicio) }}</h4>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="6"
                v-if="this.$store.state.datos.tipo == 'Asociado'"
              >
                <h2>Fecha de vacaciones:</h2>
                <h4>{{ fecha(this.$store.state.datos.fechaVacaciones) }}</h4>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="6"
                v-if="this.$store.state.datos.tipo != 'Asociado'"
              >
                <h2>Fecha fin contrato:</h2>
                <h4>{{ fecha(this.$store.state.datos.fechaFin) }}</h4>
              </v-col>
              <v-col cols="12" sm="6" md="6" v-else>
                <h2>Tiempo laborado en años:</h2>
                <h4>{{ antiguedad(this.$store.state.datos.fechaInicio) }}</h4>
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
          </v-card-text>
          <v-card-actions>
            <v-btn color="deep-purple lighten-2" @click="regresar">
              Regresar
            </v-btn>
          </v-card-actions>
        </v-card>
        
      </v-col>
    </v-row>
    </v-img>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "PagesobservarTrabajadores",
  data: () => ({
    dialog: false,
    headers: [
      
      { text: "fecha", value: "fecha" },
      { text: "Anotacion", value: "descripcion" },
    ],
    fechaAnotacion: new Date(
      Date.now() - new Date().getTimezoneOffset() * 60000
    )
      .toISOString()
      .substr(0, 10),
    descripcion: "",
    departamentos: {},
  }),
  computed: {},
  methods: {
    regresar() {
      console.log(this.$store.state.datos.tipo);
      if (this.$store.state.datos.tipo == "Temporal") {
        this.$router.push("/AgregarTemporales");
      } else if (this.$store.state.datos.tipo == "Directo") {
        this.$router.push("/AgregarDirecto");
      } else if (this.$store.state.datos.tipo == "Asociado aportante") {
        this.$router.push("/Aportante");
      } else {
        this.$router.push("/AgregarTrabajadores");
      }
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
  },
  mounted() {
    this.departamento();
  },
};
</script>