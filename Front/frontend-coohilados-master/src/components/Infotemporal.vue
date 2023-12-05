<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-img
          src="https://www.coohilados.com.co/gestion/uploads/product/69/picture.jpg"
        >
          <v-card class="mx-auto my-12 yellow lighten-4" max-width="850">
            <template slot="progress">
              <v-progress-linear
                color="deep-purple"
                height="10"
                indeterminate
              ></v-progress-linear>
            </template>

            <!-- inicio de la cart del usuario a editar -->
            <v-card-title justify-right>
              <v-col cols="12" sm="6" md="6" justify="right">
                <v-card-title>{{ detalleTemporal.nombre }}</v-card-title>
              </v-col>
            </v-card-title>

            <v-card-text>
              <v-row align="center" class="mx-0">
                <v-col cols="12" sm="6" md="4">
                  <p label="Estado" v-if="detalleTemporal.estado == 1">
                    Estado: Activo
                  </p>
                  <p label="Estado" v-if="detalleTemporal.estado == 2">
                    Estado: Inactivo
                  </p>
                  <p label="Estado" v-if="detalleTemporal.estado == 3">
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
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                      v-if="usuario.rol == 'Editor de Datos'"
                    >
                      <v-select
                        v-model="detalleTemporal.tipoDocumento"
                        :items="tDocumento"
                        label="Tipo de Documento"
                      ></v-select>
                    </v-col>

                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="detalleTemporal.documento"
                        label="Documento"
                        v-if="usuario.rol == 'Editor de Datos'"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="detalleTemporal.nombre"
                        label="Nombre"
                        v-if="usuario.rol == 'Editor de Datos'"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-select
                        v-model="detalleTemporal.sexo"
                        :items="sexoArray"
                        label="Sexo"
                        v-if="usuario.rol == 'Editor de Datos'"
                      ></v-select>
                    </v-col>

                    <v-menu
                      v-model="menu2"
                      v-if="usuario.rol == 'Editor de Datos'"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="fechaNacimiento"
                          label="Escoja la Fecha de Nacimiento"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>

                      <v-date-picker
                        v-model="fechaNacimiento"
                        v-if="usuario.rol == 'Editor de Datos'"
                        @input="menu2 = false"
                        @change="cambioN"
                      ></v-date-picker>
                    </v-menu>

                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="detalleTemporal.barrio"
                        label="Direccion"
                        v-if="usuario.rol == 'Editor de Datos'"
                      ></v-text-field>
                    </v-col>

                    <v-select
                      :items="cities"
                      v-model="departamento"
                      label="Departamento"
                      @change="traerCiudades()"
                      v-if="usuario.rol == 'Editor de Datos'"
                    ></v-select>
                    <v-select
                      :items="town"
                      v-model="detalleTemporal.city"
                      item-text="Ciudad"
                      item-value="_id"
                      label="Ciudad"
                      @change="prueba()"
                      v-if="usuario.rol == 'Editor de Datos'"
                    ></v-select>

                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="detalleTemporal.telefono"
                        label="Telefono"
                        v-if="usuario.rol == 'Editor de Datos'"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="detalleTemporal.email"
                        label="E-mail"
                        v-if="usuario.rol == 'Editor de Datos'"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="detalleTemporal.rh"
                        label="RH"
                        v-if="usuario.rol == 'Editor de Datos'"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="detalleTemporal.pension"
                        label="PENSIÓN"
                        v-if="usuario.rol == 'Editor de Datos'"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="detalleTemporal.arl"
                        label="ARL"
                        v-if="usuario.rol == 'Editor de Datos'"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="detalleTemporal.eps"
                        label="EPS"
                        v-if="usuario.rol == 'Editor de Datos'"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="6">
                      <v-select
                        :items="area"
                        v-model="detalleTemporal.areaTrabajo"
                        label="Área de trabajo"
                        item-text="nombre"
                        item-value="_id"
                        v-if="usuario.rol == 'Editor de Datos'"
                      ></v-select>
                    </v-col>

                    <v-col cols="12" sm="6" md="6">
                      <v-select
                        :items="rolArray"
                        v-model="detalleTemporal.rol"
                        label="Cargo"
                        v-if="usuario.rol == 'Editor de Datos'"
                      ></v-select>
                    </v-col>

                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="detalleTemporal.salario"
                        label="Salario"
                        v-if="usuario.rol == 'Editor de Datos'"
                      ></v-text-field>
                    </v-col>

                    <v-menu
                      v-model="menu3"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                      v-if="usuario.rol == 'Editor de Datos'"
                    >
                      <template
                        v-slot:activator="{ on, attrs }"
                        v-if="usuario.rol == 'Editor de Datos'"
                      >
                        <v-text-field
                          v-model="fechaInicio"
                          label="Escoja la Fecha de inicio de contrato"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="fechaInicio"
                        @input="menu3 = false"
                        @change="cambioI"
                      ></v-date-picker>
                    </v-menu>

                    <v-menu
                      v-model="menu4"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template
                        v-slot:activator="{ on, attrs }"
                        v-if="usuario.rol == 'Editor de Datos'"
                      >
                        <v-text-field
                          v-model="fechaFin"
                          label="Escoja la Fecha de finalización de contrato"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="fechaFin"
                        @input="menu4 = false"
                        @change="cambioF"
                      ></v-date-picker>
                    </v-menu> 
                  </v-row>
                   <template>
                      <div>
                        <v-col class="">
                          <v-data-table
                            :headers="headers"
                            :items="anotacion"
                            class="elevation-1"
                          >
                            <template v-slot:top>
                              <v-toolbar flat>
                                <v-tolbar-title>Anotaciones</v-tolbar-title>
                                <v-divider
                                  class="mx-4"
                                  inset
                                  vertical
                                ></v-divider>
                                <v-spacer></v-spacer>
                                <v-dialog
                                  max-width="1600px"
                                  v-model="dialog"
                                  persistent
                                >
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                      dark
                                      class="mb-2 red darken-4"
                                      v-bind="attrs"
                                      v-on="on"
                                    >
                                      Agregar nueva anotación
                                    </v-btn>
                                  </template>
                                  <v-card>
                                    <v-card-title>Nueva anotación</v-card-title>
                                    <v-card-text>
                                      <v-menu
                                        v-model="menuAnotacion"
                                        :close-on-content-click="false"
                                        :nudge-right="40"
                                        transition="scale-transition"
                                        offset-y
                                        min-width="auto"
                                      >
                                        <template
                                          v-slot:activator="{ on, attrs }"
                                        >
                                          <v-text-field
                                            v-model="fechaAnotacion"
                                            label="Escoja la Fecha de Nacimiento"
                                            prepend-icon="mdi-calendar"
                                            readonly
                                            v-bind="attrs"
                                            v-on="on"
                                          ></v-text-field>
                                        </template>
                                        <v-date-picker
                                          v-model="fechaAnotacion"
                                          @input="menuAnotacion = false"
                                        ></v-date-picker>
                                      </v-menu>
                                      <v-col cols="12">
                                        <v-textarea v-model="descripcion">
                                          <template v-slot:label>
                                            <div>Anotación</div>
                                          </template>
                                        </v-textarea>
                                      </v-col>
                                    </v-card-text>
                                    <v-card-actions>
                                      <v-btn @click="dialog = false" class="red"
                                        >Cerrar</v-btn
                                      >
                                      <v-btn @click="anota" class="green"
                                        >Agregar</v-btn
                                      >
                                    </v-card-actions>
                                  </v-card>
                                </v-dialog>
                              </v-toolbar>
                            </template>
                            <template v-slot:[`item.fecha`]="{ item }">
                              <span>{{ fecha(item.fecha) }}</span>
                            </template>
                          </v-data-table>
                        </v-col>
                      </div>
                    </template>
                </v-container>
              </template>
            </v-card-text>

            <v-card-actions>
              <v-btn color="deep-purple lighten-2" text to="/AgregarTemporales">
                Regresar
              </v-btn>
              <v-btn color="deep-purple lighten-2" text @click="editarItem()">
                Guardar
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
  name: "PageInfotemporal",

  data: () => ({
    loading: false,
    dialog: false,
    menu3: false,
    menu4: false,
    menu2: false,
    menuAnotacion: false,
    headers: [
      { text: "fecha", value: "fecha" },
      { text: "Anotacion", value: "descripcion" },
    ],
    anotacion: [],
    fechaAnotacion: new Date(
      Date.now() - new Date().getTimezoneOffset() * 60000
    )
      .toISOString()
      .substr(0, 10),
    descripcion: "",

    fechaNacimiento: new Date(
      Date.now() - new Date().getTimezoneOffset() * 60000
    )
      .toISOString()
      .substr(0, 10),
    fechaInicio: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    fechaFin: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),

    rolRules: [(r) => !!r || " El Cargo es requerido ❌"],
    rolArray: [
      "ASISTENTE AGRICOLA",
      "ASISTENTE DIRECTOR COMERCIAL",
      "AUXILIAR ADMINISTRATIVO",
      "AUXILIAR COMERCIAL",
      "AUXILIAR CONTABLE",
      "AUXILIAR CONTABLE II",
      "AUXILIAR CONTROL DE CALIDAD",
      "AUXILIAR PRODUCCION",
      "BODEGUERO",
      "BODEGUERO P.T",
      "BODEGUERO M.P",
      "COMPRADOR ALMACENISTA",
      "COORDINADOR DE PRODUCCIÓN",
      "COORDINADOR DE SST",
      "DIRECTOR COMERCIAL",
      "DIRECTOR CONTABLE",
      "GERENTE GENERAL",
      "INGENIERO DE SISTEMAS",
      "JEFE DE BODEGA DE PRODUCTOS TERMINADOS",
      "JEFE DE COMPRAS DE MATERIA PRIMA",
      "JEFE DE GESTION HUMANA",
      "JEFE DE MANTENIMIENTO Y TALLER",
      "LIDER AUXILIAR DE COSTURA",
      "LIDER DE SECCIÓN DE COSTURA",
      "LIDER DE SECCIÓN HILOS",
      "LIDER DE SECCIÓN TELARES",
      "LIQUIDADOR DE PRODUCCIÓN",
      "MANTENIMIENTO",
      "MANTENIMIENTO- ESPADAS",
      "MENSAJERO",
      "NOMINA",
      "OPERARIO",
      "OPERARIO DE PLANTA",
      "OPERARIO HILADORAS-HUSOS",
      "OPERARIO DE PRENSA",
      "PARQUERO",
      "RECEPCIONISTA",
      "RECEPCIONISTA DEL SGC",
      "SECRETARIO CONSEJO",
      "SECRETARIA GERENCIA",
      "SERVICIOS GENERALES",
      "TECNICO AGRICOLA",
      "TECNICO MANTENIMIENTO-CUADRILLA",
      "TECNICO MANTENIMIENTO-CUADRILLA-E",
      "TECNICO MANTENIMIENTO-BARRAS",
      "TECNICO MANTENIMIENTO-EBANISTA",
      "TECNICO ELECTRICISTA",
      "TECNICO MANTENIMIENTO-FRESADOR",
      "TECNICO MANTENIMIENTO-TORNERO",
    ],
    sexoArray: ["F", "M"],
    area: [],
    cities: [],
    town: [],
    tDocumento: ["C.C", "C.E"],
    detalleTemporal: {
      tipoDocumento: "",
      documento: "",
      nombre: "",
      areaTrabajo: "",
      salario: "",
      pension: "",
      rh: "",
      arl: "",
      eps: "",
      barrio: "",
      city: "",
      telefono: "",
      anotacion: "",
      sexo: "",
      rol: "",
      fechaN: "",
      fechaI: "",
      fechaF: "",
    },
    id: "",
    usuario: "",
    note: [],
  }),
  computed: {},
  methods: {
    anota() {
      this.note.push({
        fecha: this.fechaAnotacion,
        descripcion: this.descripcion,
      });
      this.descripcion = "";
    },
    cambioN() {
      this.detalleTemporal.fechaN = this.fechaNacimiento;
    },
    cambioI() {
      this.detalleTemporal.fechaI = this.fechaInicio;
    },
    cambioF() {
      this.detalleTemporal.fechaF = this.fechaFin;
    },
    traerAreaTrabajo() {
      axios
        .get("https://back-coohilados.vercel.app/api/areaTrabajo")
        .then((response) => {
          this.area = response.data.lugar;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    traerDepartamentos() {
      axios
        .get("https://back-coohilados.vercel.app/api/ciudad/departamento/get")
        .then((response) => {
          // response.data.ciudad.reduce((obj, item) => (obj[item.Departamento] = true, obj), {});
          this.cities = response.data.departamentos;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    traerCiudades() {
      axios
        .get(
          `https://back-coohilados.vercel.app/api/ciudad/ciudad/get/${this.departamento}`
        )
        .then((response) => {
          //this.town = response.data.city.reduce((obj, item) => (obj[item.Ciudad] = true, obj), {});
          //this.ciudad = response.data.city.filter(c => { return c.Ciudad.length > 3})
          this.town = response.data.city;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    traerTemporal() {
      this.id = this.$store.state.datos._id;
      this.detalleTemporal = {
        tipoDocumento: this.$store.state.datos.tipoDocumento,
        documento: this.$store.state.datos.documento,
        pension: this.$store.state.datos.pension,
        rh: this.$store.state.datos.rh,
        arl: this.$store.state.datos.arl,
        eps: this.$store.state.datos.eps,
        nombre: this.$store.state.datos.nombre,
        salario: this.$store.state.datos.salario,
        barrio: this.$store.state.datos.barrio,
        telefono: this.$store.state.datos.telefono,
        sexo: this.$store.state.datos.sexo,
        rol: this.$store.state.datos.rol,
        areaTrabajo: this.$store.state.datos.areaTrabajo._id,
        city: this.$store.state.datos.ciudad,
        fechaN: this.$store.state.datos.fechaNacimiento,
        email: this.$store.state.datos.email,
        fechaI: this.$store.state.datos.fechaInicio,
        fechaF: this.$store.state.datos.fechaFin,
      };
      this.anotacion = this.$store.state.datos.anotacion;
      this.note = this.$store.state.datos.anotacion;
    },
    editarItem() {
      console.log("fecha de nacimiento: " + this.detalleTemporal.fechaN);
      console.log("fecha de inicio: " + this.detalleTemporal.fechaI);
      console.log("fecha de fin: " + this.detalleTemporal.fechaF);
      this.loading = true;
      axios
        .put(
          `https://back-coohilados.vercel.app/api/ayudaTemporal/${this.id}`,
          {
            tipoDocumento: this.detalleTemporal.tipoDocumento,
            documento: this.detalleTemporal.documento,
            sexo: this.detalleTemporal.sexo,
            pension: this.detalleTemporal.pension,
            rh: this.$store.state.datos.rh,
            arl: this.$store.state.datos.arl,
            eps: this.$store.state.datos.eps,
            nombre: this.detalleTemporal.nombre,
            fechaNacimiento: this.detalleTemporal.fechaN,
            fechaInicio: this.detalleTemporal.fechaI,
            fechaFin: this.detalleTemporal.fechaF,
            areaTrabajo: this.detalleTemporal.areaTrabajo,
            salario: this.detalleTemporal.salario,
            barrio: this.detalleTemporal.barrio,
            ciudad: this.detalleTemporal.city,
            telefono: this.detalleTemporal.telefono,
            email: this.detalleTemporal.email,
            anotacion: this.note,
            rol: this.detalleTemporal.rol,
          }
        )
        .then((response) => {
          this.traerTemporal();
          this.dialog = false;
          console.log(response);
          this.$store.dispatch("setDatos", response.data.item);
          this.$router.push("/AgregarTemporales");
          this.loading = false;

          this.$swal({
            icon: "success",
            title: "El trabajador se edito correctamente",
          });
        })
        .catch((error) => {
          console.log(error);
          this.dialog = false;
          this.loading = false;
          this.$swal({
            icon: "error",
            title: "Error al editar el trabajador",
          });
        });
    },
    fecha(r) {
      let d = new Date(r);
      let f = d.toISOString();
      return f.split("T")[0].replace(/-/g, "/");
    },
    traer() {
      this.usuario = JSON.parse(localStorage.getItem("usuario"));
    },
  },
  created() {
    this.traer();
    this.traerTemporal();
    this.traerAreaTrabajo();
    this.traerDepartamentos();
  },
};
</script>