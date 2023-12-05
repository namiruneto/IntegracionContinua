<template>
  <v-app>
    <v-container fluid>
      <v-row>
        <v-col>
          <v-img
            src="https://pbs.twimg.com/media/Cgl1KZDW4AA1G-9?format=jpg&name=4096x4096"
          >
            <v-row>
              <v-col class="text-center">
                <v-template>
                  <v-toolbar class="amber accent-2">
                    <v-toolbar-title>
                      <h1>APORTANTES</h1>
                    </v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-text-field
                      v-model="busqueda"
                      append-icon="mdi-magnify"
                      label="buscar"
                      single-line
                      hide-details
                    >
                    </v-text-field>
                     <template>
                      <v-row>
                        <v-col>
                     <v-btn class=" red mb-8 mt-7" color="white" text to="/Socios">
                      Regresar
                    </v-btn>
                    </v-col>
                    </v-row>
                    </template>
                    <v-spacer></v-spacer>

                    <template>
                      <div class="text-center">
                        <v-dialog max-width="1600px">
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                              icon
                              dark
                              class="mr-2 green"
                              v-bind="attrs"
                              v-on="on"
                            >
                              <font-awesome-icon
                                style="font-size: 28px"
                                :icon="['fas', 'cake-candles']"
                              />
                            </v-btn>
                          </template>
                          <v-card>
                            <v-card-title>CUMPLEAÑEROS</v-card-title>
                            <v-card-text>
                              <v-autocomplete
                                auto-select-first
                                chips
                                deletable-chips
                                dense
                                small-chips
                                solo-inverted
                                label="Meses del año"
                                :items="meses"
                                v-model="mes"
                                @change="cumpleanos"
                              >
                              </v-autocomplete>
                              <v-data-table
                                :headers="headerCumple"
                                :items="happy"
                                no-data-text="No hay cumpleañeros en este mes"
                              >
                                <template
                                  v-slot:[`item.fechaNacimiento`]="{ item }"
                                >
                                  <span>
                                    {{ fecha(item.fechaNacimiento) }}
                                  </span>
                                </template>
                              </v-data-table>
                            </v-card-text>
                          </v-card>
                        </v-dialog>
                      </div>
                    </template>

                      <v-btn class="warning mb-2 mr-2" @click="pdf"
                      >Imprimir</v-btn
                    >

                   
                    <template>
                      <div class="text-center">
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
                              v-if="user.rol == 'Editor de Datos'"
                            >
                              Nuevo Aportante
                            </v-btn>
                          </template>
                          <v-card>
                            <v-card-title class="text-h5"
                              >Ingrese nuevo Asociado Aportante</v-card-title
                            >
                            <v-card-text>
                              <v-row>
                                <v-col>
                                  <v-select
                                    v-model="tipoDocumento"
                                    :items="tipoDocumento"
                                    label="Tipo de Documento"
                                    required
                                  ></v-select>

                                  <v-text-field
                                    v-model="documento"
                                    :rules="documentoRules"
                                    label="Documento"
                                    required
                                    hint="Ingrese Solo números sin puntos ni comas"
                                  ></v-text-field>

                                  <v-text-field
                                    v-model="nombre"
                                    :rules="nombreRules"
                                    label="Apellidos y Nombre"
                                    required
                                  ></v-text-field>
                                  <v-select
                                    v-model="sexo"
                                    :items="sexo"
                                    label="Sexo"
                                    required
                                  ></v-select>

                                  <v-menu
                                    v-model="menu2"
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
                                      @input="menu2 = false"
                                    ></v-date-picker>
                                  </v-menu>

                                  <v-text-field
                                    v-model="barrio"
                                    :rules="barrioRules"
                                    label="dirección"
                                    required
                                  ></v-text-field>
                                </v-col>

                                <v-col cols="12" sm="6" md="6">
                                  <v-select
                                    :items="cities"
                                    v-model="departamento"
                                    label="Departamento De Nacimiento"
                                    @change="traerCiudades()"
                                  ></v-select>
                                  <v-select
                                    :items="town"
                                    v-model="city"
                                    item-text="Ciudad"
                                    item-value="_id"
                                    label="Ciudad De Nacimiento"
                                    @change="prueba()"
                                  ></v-select>
                                  <v-text-field
                                    v-model="telefono"
                                    :rules="telefonoRules"
                                    label="Telefono"
                                    required
                                    hint="Ingrese Solo números sin puntos ni comas"
                                  ></v-text-field>
                                  <v-text-field
                                    v-model="email"
                                    :rules="emailRules"
                                    label="E-mail"
                                    required
                                  ></v-text-field>

                                  <v-select
                                    v-model="rol"
                                    :items="rol"
                                    :rules="rolRules"
                                    required
                                    label="Asociado"
                                  ></v-select>

                                  <v-menu
                                    v-model="menu3"
                                    :close-on-content-click="false"
                                    :nudge-right="40"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="auto"
                                  >
                                    <template v-slot:activator="{ on, attrs }">
                                      <v-text-field
                                        v-model="fechaInicio"
                                        label="Escoja la Fecha de inicio de ingreso  del Asociado aportante"
                                        prepend-icon="mdi-calendar"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                      ></v-text-field>
                                    </template>
                                    <v-date-picker
                                      v-model="fechaInicio"
                                      @input="menu3 = false"
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
                                    <template v-slot:activator="{ on, attrs }">
                                      <v-text-field
                                        v-model="fechaFin"
                                        label="Escoja la fecha final"
                                        prepend-icon="mdi-calendar"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                      ></v-text-field>
                                    </template>
                                    <v-date-picker
                                      v-model="fechaFin"
                                      @input="menu4 = false"
                                    ></v-date-picker>
                                  </v-menu>
                                </v-col>
                              </v-row>
                            </v-card-text>

                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn
                                class="red"
                                color="white"
                                text
                                @click="close()"
                                >Cancel</v-btn
                              >
                              <v-btn
                                class="green"
                                color="white"
                                text
                                @click="agregar()"
                                >Guardar</v-btn
                              >
                              <v-spacer></v-spacer>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                      </div>
                    </template>
                  </v-toolbar>
                </v-template>

                <!--   informacion de todos los trabajadores -->
                <template>
                  <v-data-table
                    :headers="headers"
                    :items="trabajadores"
                    :search="busqueda"
                    sort-by="nombre"
                    class="elevation-1 amber lighten-3"
                    :loading="loadingTable"
                    loading-text="Cargando... Espere por favor"
                  >
                    <template>
                      <v-toolbar flat>
                        <v-card>
                          <v-card-title> </v-card-title>
                          <v-card-text>
                            <v-container
                              v-for="item in trabajadores"
                              :key="item._id"
                            >
                              <v-row>
                                <v-col cols="12" sm="6" md="4">
                                  <v-text-field
                                    v-model="nombre"
                                    label="Nombre"
                                    >{{ item.nombre }}</v-text-field
                                  >
                                </v-col>
                                <v-col>
                                  <v-text-field
                                    v-model="tipoDocumento"
                                    label="tipo Documento"
                                    >{{ item.tipoDocumento }}
                                  </v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                  <v-text-field
                                    v-model="documento"
                                    label="Documento"
                                    >{{ item.documento }}</v-text-field
                                  >
                                </v-col>

                                <v-col cols="12" sm="6" md="4">
                                  <v-text-field v-model="rol" label="Rol">{{
                                    item.rol
                                  }}</v-text-field>
                                </v-col>

                                <v-col cols="12" sm="6" md="4">
                                  <v-text-field
                                    v-model="estado"
                                    label="Estado"
                                    >{{ item.estado }}</v-text-field
                                  >
                                </v-col>
                              </v-row>
                            </v-container>
                          </v-card-text>
                        </v-card>
                      </v-toolbar>
                    </template>

                    <!-- estados -->

                    <template v-slot:[`item.actions`]="{ item }">
                      <div
                        v-if="
                          user.rol != 'Actualizador' &&
                          user.rol != 'Visualizador'
                        "
                      >
                        <div v-show="item.estado == 2" class="boton">
                          <v-btn
                            color="green"
                            icon
                            dark
                            class="mb-2"
                            @click="cambiarEstado(item)"
                          >
                            <font-awesome-icon icon="fa-solid fa-check" />
                            <div class="texto">
                              <h5>activar</h5>
                            </div>
                          </v-btn>
                        </div>
                        <div v-show="item.estado == 1" class="boton">
                          <v-btn
                            color="red"
                            icon
                            dark
                            class="mb-2"
                            @click="cambiarEstado(item)"
                          >
                            <font-awesome-icon icon="fa-solid fa-ban" />
                            <div class="texto">
                              <h5>inhabilitar</h5>
                            </div>
                          </v-btn>
                        </div>
                        <!-- <div v-show="item.estado == 2" class="boton">
                          <v-btn
                            color="orange"
                            icon
                            dark
                            class="mb-2"
                            @click="cambiarEstado(item)"
                          >
                            <font-awesome-icon icon="fa-solid fa-plane" />
                            <div class="texto">
                              <h5>vacaciones</h5>
                            </div>
                          </v-btn>
                        </div> -->
                      </div>
                      <div class="boton">
                        <v-btn
                          color="green"
                          icon
                          dark
                          class="mb-2"
                          @click="detalleTrabajador1(item)"
                        >
                          <font-awesome-icon icon="fa-solid fa-eye" />
                          <div class="texto">
                            <h5>Ver</h5>
                          </div>
                        </v-btn>
                      </div>
                      <article
                        class="boton"
                        v-if="
                          user.rol == 'Editor de Datos' ||
                          user.rol == 'Actualizador'
                        "
                      >
                        <v-btn
                          color="primary"
                          icon
                          dark
                          class="mb-2"
                          @click="editarTrabajador(item)"
                        >
                          <font-awesome-icon icon="fa-solid fa-pencil" />
                          <div class="texto">
                            <h5>Editar</h5>
                          </div>
                        </v-btn>
                      </article>
                    </template>

                    <!-- cambiar estados -->

                    <template v-slot:[`item.estado`]="{ item }">
                      <div v-show="item.estado == 1">
                        <span class="green--text"> Activo </span>
                      </div>
                      <div v-show="item.estado == 2">
                        <span class="red--text"> Inactivo </span>
                      </div>
                      <div v-show="item.estado == 3">
                        <span class="blue--text"> Vacaciones </span>
                      </div>
                    </template>
                    <template v-slot:[`item.tiempoLaborado`]="{ item }">
                      <span>
                        {{ moment(item.fechaInicio) }}
                      </span>
                    </template>
                    <template v-slot:[`item.fechaNacimiento`]="{ item }">
                      <span>
                        {{ fecha(item.fechaNacimiento) }}
                      </span>
                    </template>
                    <template v-slot:[`item.fechaInicio`]="{ item }">
                      <span>
                        {{ fecha(item.fechaInicio) }}
                      </span>
                    </template>
                    <template v-slot:[`item.fechaFin`]="{ item }">
                      <span>
                        {{ fecha(item.fechaFin) }}
                      </span>
                    </template>
                  </v-data-table>
                </template>
              </v-col>
            </v-row>
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
  </v-app>
</template>
<script>
import axios from "axios";
import logo from "../assets/imagenBase64.js";
import moment from "moment";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
export default {
  name: "PagesAportante",
  data: () => ({
    loading: false,
    loadingTable: false,
    fechaInicio: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    fechaFin: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    fechaNacimiento: new Date(
      Date.now() - new Date().getTimezoneOffset() * 60000
    )
      .toISOString()
      .substr(0, 10),
    menu3: false,
    menu4: false,
    menu2: false,
    dialog: false,
    dialogEdit: false,
    headers: [
      { text: "Tipo Documento", value: "tipoDocumento" },
      { text: "Documento", value: "documento" },
      { text: "Nombre", value: "nombre" },
      { text: "Sexo", value: "sexo" },
      { text: "Cumpleaños", value: "fechaNacimiento" },
      { text: "E-mail", value: "email" },
      { text: "Dirección", value: "barrio" },
      { text: "Teléfono", value: "telefono" },
      { text: "Inicio Aportes", value: "fechaInicio" },
      { text: "Fin Aportes", value: "fechaFin" },
      { text: "Antiguedad", value: "tiempoLaborado" },
      { text: "Cargo", value: "rol" },
      { text: "Estado", value: "estado" },
      { text: "Acciones", value: "actions", sortable: false },
    ],
    valid4: true,
    nombre: "",
    nombreRules: [
      (n) => !!n || "Apellidosy Nombres son requerido ❌",
      (n) =>
        (n && n.length <= 50) || " El Nombre solo puede tener 50 caracteres",
    ],
    tipoDocumento: ["C.C", "C.E", "T.I", "Nuip", "NIT"],
    valid: true,
    documento: "",
    documentoRules: [
      (d) => !!d || " Documento es requerido ❌ ",
      (d) => (d && d.length <= 15) || " Cedula solo puede tener 15 caracteres",
    ],
    sexo: ["M", "F"],
    tiempoLaborado: "",
    valid5: true,
    barrio: "",
    barrioRules: [
      (b) => !!b || " Direcions requerido ❌",
      (b) =>
        (b && b.length <= 50) || " EL Barrio Solo puede tener 50 caracteres",
    ],
    departamento: "",
    city: "",
    valid6: true,
    telefono: "",
    telefonoRules: [
      (t) => !!t || " Telefono es requerido ❌",
      (t) =>
        (t && t.length <= 30) || " EL Telefono Solo puede tener 30 caracteres",
    ],
    valid7: true,
    email: "",
    emailRules: [
      (e) => !!e || " Email es requerido ❌",
      (e) =>
        (e && e.length <= 30) || " EL Email Solo puede tener 30 caracteres",
    ],
    valid8: true,
    rol: ["APORTANTE"],
    rolRules: [(r) => !!r || " El Cargo es requerido ❌"],
    cities: [],
    town: [],
    trabajadores: [],
    trabajador: [],
    busqueda: "",
    usuarios: "",
    user: "",
    meses: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ],
    mes: "",
    headerCumple: [
      { text: "Nombre", value: "nombre" },
      { text: "fecha de nacimiento", value: "fechaNacimiento" },
    ],
    happy: [],
  }),
  computed: {
    buscar() {
      return this.trabajadores.filter((user) => {
        const identificacion = user.tipoDocumento.toLowerCase();
        const nombre = user.nombre.toLowerCase();
        const busqueda = this.busqueda.toLowerCase();
        return identificacion.includes(busqueda) || nombre.includes(busqueda);
      });
    },
  },
  methods: {
    editarTrabajador(item) {
      this.$router.push("/Infoaportante");
      this.$store.dispatch("setDatos", item);
      console.log(this.$store.state.datos);
    },
    detalleTrabajador1(item) {
      console.log(item);
      this.$router.push("/verAportante");
      this.$store.dispatch("setDatos", item);
      console.log("nombre: "+this.$store.state.datos.nombre); 
    },
    close() {
      this.dialog = false;
    },
    close1() {
      this.dialog = false;
    },
    traerTrabajador1() {
      this.loadingTable = true;
      axios
        .get("https://back-coohilados.vercel.app/api/aportante")
        .then((response) => {
          this.loadingTable = false;
          console.log(response.data.trabajador3);
          this.trabajadores = response.data.trabajador3;
        })
        .catch((err) => {
          this.loadingTable = false;
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
          console.log(this.town);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    cambiarEstado(item) {
      if (item.estado == 1) {
        axios
          .put(
            `https://back-coohilados.vercel.app/api/aportante/desactivar/${item._id}`
          )
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      if (item.estado == 2) {
        axios
          .put(
            `https://back-coohilados.vercel.app/api/aportante/activar/${item._id}`
          )
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      this.traerTrabajador1();
    },

    agregar() {
      this.loading = true;
      let header = { headers: { "x-token": this.$store.state.token } };
      console.log(header);
      axios
        .post(
          "https://back-coohilados.vercel.app/api/aportante/agregar",
          {
            tipoDocumento: this.tipoDocumento,
            documento: this.documento,
            sexo: this.sexo,
            nombre: this.nombre,
            tipo: "Asociado aportante",
            fechaNacimiento: this.fechaNacimiento,
            fechaInicio: this.fechaInicio,
            fechaFin: this.fechaFin,
            barrio: this.barrio,
            departamento: this.departamento,
            ciudad: this.city,
            telefono: this.telefono,
            email: this.email,
            rol: this.rol,
          },
          header
        )
        .then((response) => {
          this.traerTrabajador1();
          this.dialog = false;
          console.log(response);
          this.$store.dispatch("setDatos", response.data.item);
          this.$router.push("/Aportante");
          this.loading = false;
          this.$swal({
            icon: "success",
            title: "El trabajador se agrego correctamente",
          });
        })
        .catch((error) => {
          console.log(error);
          this.dialog = false;
          this.loading = false;
          this.$swal({
            icon: "error",
            title: "Error al guardar el trabajador",
          });
        });
    },
   pdf() {
      axios
        .get("https://back-coohilados.vercel.app/api/aportante/activo")
        .then((res) => {
          console.log(res.data.trabajador3);
          let array = [];
          for (let i = 0; i < res.data.trabajador3.length; i++) {
            const user = res.data.trabajador3[i];

            array.push([
              `${user.tipoDocumento}`,
              `${user.documento}`,
              `${user.nombre}`,
              `${this.fecha(user.fechaNacimiento)}`,
              `${user.barrio}`,
              `${user.telefono}`,
              
              
            ]);
          }
          let docDefinition = {
            header: [],
            footer: {
              text: "Calle 22 N. 9-57 PBX : (607) 7248062 Fax: (607) 7247460 \nhttp://www.coohilados.com.co \nE-mail:ventas@coohilados.com.co gerencia@coohilados.com.co \nSAN GIL - SANTANDER - COLOMBIA",
              style: "footer",
            },
            content: [
              {
                columns: [
                  {
                    image: logo.coohilados,
                    style: "img",
                    fit: [200, 200],
                  },
                  {
                    text: "INFORME \nVISUALIZACIÓN DE TRABAJADORES APORTANGTES ACTIVOS",
                    style: "header",
                  },
                ],
              },
              {
                margin: [20, 4, 0, 0],
                table: {
                  headerRows: 1,
                  widths: [50, "auto", "auto", 50, "auto", 50],
                  body: [
                    [
                      { text: "TIPO DE DOCUMENTO", bold: true },
                      { text: "DOCUMENTO", bold: true },
                      { text: "NOMBRE", bold: true },
                      { text: "FECHA DE NACIMIENTO", bold: true },
                      { text: "DIRECCIÓN", bold: true },
                      { text: "TELÉFONO", bold: true },
                      
                    ],
                    ...array,
                  ],
                },
                layout: {
                  fillColor: (rowIndex) => {
                    return rowIndex % 2 === 0 ? "#CCCCCC" : null;
                  },
                },
              },
            ],
            styles: {
              img: {
                alignment: "center",
                margin: [0, 10, 0, 20],
              },
              header: {
                alignment: "center",
                fontSize: 10,
                bold: true,
                margin: [0, 10, 0, 0],
              },
              footer: {
                fontSize: 8,
                margin: [0, 0, 0, 10],
              },
            },
            defaultStyle: {
              alignment: "center",
              fontSize: 8,
            },
          };
          pdfMake.createPdf(docDefinition).open();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    moment(item) {
      let fecha = Date.now();
      let fecha2 = moment(fecha);
      let fecha1 = moment(item);
      /* let diffAnos = fecha2.diff(fecha1, "years"); */
      let diffMeses = fecha2.diff(fecha1, "months");
      /* let diffDias = fecha2.diff(fecha1, "days"); */
      /* if (diffAnos <= 1) {
        return `${diffAnos} año ${diffMeses} meses ${diffDias} días`;
      } else {
        return `${diffAnos} años ${diffMeses} meses ${diffDias} días`;
      } */
      return `${diffMeses} meses`;
    },

    fecha(item) {
      let d = new Date(item);
      let f = d.toISOString();
      let date = f.split("T")[0].replace(/-/g, "/");
      let fecha = moment(date).format("D, MMM, YYYY");
      return fecha;
    },

    traer() {
      this.user = JSON.parse(localStorage.getItem("usuario"));
    },
    cumpleanos() {
      let numeroMes = "";
      switch (this.mes) {
        case "Enero":
          numeroMes = 0;
          break;
        case "Febrero":
          numeroMes = 1;
          break;
        case "Marzo":
          numeroMes = 2;
          break;
        case "Abril":
          numeroMes = 3;
          break;
        case "Mayo":
          numeroMes = 4;
          break;
        case "Junio":
          numeroMes = 5;
          break;
        case "Julio":
          numeroMes = 6;
          break;
        case "Agosto":
          numeroMes = 7;
          break;
        case "Septiembre":
          numeroMes = 8;
          break;
        case "Octubre":
          numeroMes = 9;
          break;
        case "Noviembre":
          numeroMes = 10;
          break;
        case "Diciembre":
          numeroMes = 11;
          break;
      }
      let cumpleaneros = this.trabajadores.filter((persona) => {
        let fechaTrabajador = moment(persona.fechaNacimiento).get("month");
        return fechaTrabajador == numeroMes;
      });
      this.happy = cumpleaneros;
    },

    valores(valor) {
      const plata = valor;
      const currency = (number) => {
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "COP",
          minimumFractionDigits: 0,
        }).format(number);
      };
      return currency(plata);
    },
  },
  created() {
    this.traer();
    this.traerDepartamentos();
    this.traerTrabajador1();
  },
};
</script>

<style scoped>
.boton {
  position: relative;
}
.texto {
  position: absolute;
  top: -30px;
  font-size: 12px;
  background: rgb(220, 216, 216);
  color: black;
  padding: 8px;
  visibility: hidden;
  transition: hover 0.6s ease;
  border-radius: 10px;
}
.boton:hover .texto {
  visibility: visible;
}
</style>