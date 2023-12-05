<template>
  <v-app>
    <v-container fluid>
      <v-row>
        <v-col class="text-center">
          <v-template>
            <v-toolbar class="amber accent-2">
              <v-toolbar-title><h1>USUARIO</h1> </v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>

              <v-text-field
                v-model="busqueda"
                append-icon="mdi-magnify"
                label="buscar"
                single-line
                hide-details
              >
              </v-text-field> 
               <v-spacer></v-spacer>           
                <router-link to="/Agregarusuario" color="black"  max-width="1600px">
                
                <v-btn class="mr-2 green"><h5>AGREGAR</h5> <br>
                  <h1><font-awesome-icon :icon="['fas', 'address-card']" /></h1>
                  </v-btn>
                </router-link>
             
              <v-spacer></v-spacer>
              <v-btn class="mr-2 red" color="white" text to="/Home">
                Regresar
              </v-btn>
              <template>
                <div class="text-center">
                  <v-dialog max-width="800px" v-model="dialog"> </v-dialog>
                </div>
              </template>
            </v-toolbar>
          </v-template>

          <template>
            <v-data-table
              :headers="headers"
              :items="usuarios"
              sort-by="nombre"
              class="elevation-1 amber lighten-3"
            >
              <template>
                <v-toolbar flat>
                  <v-card>
                    <v-card-title> </v-card-title>
                    <v-card-text>
                      <v-container v-for="item in usuarios" :key="item._id">
                        <v-row>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="nombre" label="Nombre">{{
                              item.nombre
                            }}</v-text-field>
                          </v-col>

                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="documento"
                              label="Documento"
                              >{{ item.documento }}</v-text-field
                            >
                          </v-col>

                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="email" label="E-mail">{{
                              item.email
                            }}</v-text-field>
                          </v-col>

                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="rol" label="Rol">{{
                              item.rol
                            }}</v-text-field>
                          </v-col>

                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="estado" label="Estado">{{
                              item.estado
                            }}</v-text-field>
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
                  v-show="item.estado == 2"
                  class="boton"
                  v-if="user.rol == 'Administrador'"
                >
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
                <div
                  v-show="item.estado == 1"
                  class="boton"
                  v-if="user.rol == 'Administrador'"
                >
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

                <div class="boton">
                  <v-btn
                    color="green"
                    icon
                    dark
                    class="mb-2"
                    @click="detalleUsuario(item)"
                  >
                    <font-awesome-icon icon="fa-solid fa-eye" />
                    <div class="texto">
                      <h5>ver</h5>
                    </div>
                  </v-btn>
                </div>
                <article
                  class="boton"
                  v-if="user.rol == 'Administrador'"
                >
                  <v-btn
                    color="primary"
                    icon
                    dark
                    class="mb-2"
                    @click="editarUsuario(item)"
                  >
                    <font-awesome-icon icon="fa-solid fa-pencil" />
                    <div class="texto">
                      <h5>editar</h5>
                    </div>
                  </v-btn>
                </article>
                <article
                  class="boton"
                  v-if="user.rol == 'Administrador'"
                >
                  <v-btn
                    color="black"
                    icon
                    dark
                    class="mb-2"
                    @click="eliminarUsuario(item)"
                  >
                    <font-awesome-icon :icon="['fas', 'trash']" />
                    <div class="texto">
                      <h5>eliminar</h5>
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
            </v-data-table>
          </template>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
<script>
import axios from "axios";
export default {
  name: "PagesVerusuario",
  data: () => ({
    dialog: false,
    dialogEdit: false,
    headers: [
      { text: "Nombre", value: "nombre" },
      { text: "Documento", value: "documento" },
      { text: "Email", value: "email" },
      { text: "Area", value: "area" },
      { text: "Rol", value: "rol" },

      { text: "Estado", value: "estado" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    nombre: "",
    documento: "",
    email: "",
    password: "",
    rol: "",
    usuarios: [],
    busqueda: "",
    user:"",
    super:""
  }),
  methods: {
    validar(){
      for (let i = 0; i < this.usuarios.length; i++) {
        const element = this.usuarios[i];
        if(element.rol =="Super Administrador"){
          console.log("soy super puta");
          this.super = element.rol
        }
      }
    },
    traer() {
      this.user = JSON.parse(localStorage.getItem("usuario"));
    },
    buscar() {
      return this.usuarios.filter((user) => {
        const identificacion = user.documento.toLowerCase();
        const nombre = user.nombre.toLowerCase();
        const busqueda = this.busqueda.toLowerCase();
        return identificacion.includes(busqueda) || nombre.includes(busqueda);
      });
    },
    editarUsuario(item) {
      this.$router.push("/Infousuario");
      this.$store.dispatch("setDatos", item);
      console.log(this.$store.state.datos);
    },
    detalleUsuario(item) {
      this.$router.push("/Infousuario");
      this.$store.dispatch("setDatos", item);
      console.log(this.$store.state.datos);
    },
    eliminarUsuario(item) {
      axios
        .put(
          `https://back-coohilados.vercel.app/api/usuario/eliminar/${item._id}`
        )
        .then((response) => {
          this.traerUsuarios();
          this.usuario = response.data.usuario;
          this.$swal({
            icon: "success",
            title: "El trabajador se Elimino correctamente 👌",
          });
        })
        .catch((err) => {
          console.log(err);
          this.$swal({
            icon: "error",
            title: "No se Pudo Eliminar el Usuario 👎",
          });
        });
    },
    close() {
      this.dialog = false;
    },
    traerUsuarios() {
      axios
        .get("https://back-coohilados.vercel.app/api/usuario")
        .then((response) => {
          this.usuarios = response.data.usuario;
          this.validar();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    cambiarEstado(item) {
      if (item.estado == 1) {
        axios
          .put(
            `https://back-coohilados.vercel.app/api/usuario/desactivar/${item._id}`
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
            `https://back-coohilados.vercel.app/api/usuario/activar/${item._id}`
          )
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      this.traerUsuarios();
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
    desactivar(id) {
      console.log(id);
      if (id) {
        axios
          .put(
            `https://back-coohilados.vercel.app/api/usuario/desactivar/${id}`
          )
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
            password: this.password,
            rol: this.rol,
            area: this.detalleUsuario.area,
          },
          header
        )
        .then((response) => {
          this.traerUsuario();
          this.dialog = false;
          console.log(response);
          this.$store.dispatch("setDatos", response.data.item);
          this.$router.push("/Verusuario");
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
            title: "Error al guardar el Usuario",
          });
        });
    },
  },

  created() {
    this.traer();
    this.traerUsuarios();
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