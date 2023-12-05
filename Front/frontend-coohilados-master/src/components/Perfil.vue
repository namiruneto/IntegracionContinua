<template>
  <v-container style="height: 100%">
    <v-row>
      <v-col cols="12">
        <v-card class="mx-5 my-5" max-width="10000" tile>
          <v-row>
            <v-col class="pa-0" cols="12">
              <v-avatar class="profile mx-5 mt-2" color="grey" size="165" tile>
                <v-img :src="user.foto"></v-img>
              </v-avatar>
              <v-dialog v-model="dialogAvatar" width="600">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    color="red lighten-2"
                    dark
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title><p> Avatares <br> Tamaño:650x650 Píxeles. <br> Peso: 150KB Máx. <br> Formato: JPG,PNG,GIF</p></v-card-title>
                  <v-row align="center" justify="center">
                    <div
                      v-for="value in ava"
                      :key="value.avatar"
                      class="text-center mb-5"
                    >
                      <v-col cols="4">
                        <a
                          href="#"
                          style="text-decoration: none"
                          @click="avatar(value.url)"
                        >
                          <v-avatar
                            class="profile"
                            color="grey"
                            size="165"
                            tile
                          >
                            <v-img :src="value.url"></v-img>
                          </v-avatar>
                        </a>
                      </v-col>
                    </div>
                    <v-col cols="4">
                      <v-avatar class="profile" color="grey" size="165" tile>
                        <div class="text-center img">
                          <v-img
                            width="320"
                            height="320"
                            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                          >
                          </v-img>
                          <div class="boton">
                            <v-file-input
                              accept="image/png, image/jpeg, image/bmp"
                              placeholder="Pick an avatar"
                              prepend-icon="mdi-camera"
                              label="Avatar"
                              hide-input
                              v-model="foto"
                              @change="subir()"
                              class="boton-avatar"
                            >
                            </v-file-input>
                          </div>
                        </div>
                      </v-avatar>
                    </v-col>
                  </v-row>
                </v-card>
              </v-dialog>
              <v-card-text>
                <v-row align="center" class="mx-0">
                  <v-col cols="12" sm="6" md="4">
                    <h3 class="mb-0">
                      {{ `Área: ${user.area}` }}
                    </h3>
                    <h3 class="mb-0">
                      {{ `Rol: ${user.rol}` }}
                    </h3>
                    <h3 v-if="user.estado == 1">
                      Estado:
                      <p label="Estado" style="color: green">Activo</p>
                    </h3>
                    <h3 v-if="user.estado == 2">
                      Estado:
                      <p label="Estado" style="color: red">Inactivo</p>
                    </h3>
                    <h3 v-if="user.estado == 3">
                      Estado:
                      <p label="Estado" style="color: orange">Vacaciones</p>
                    </h3>
                  </v-col>
                  <v-card-title justify-right>
                    <v-card-title>{{ `${user.nombre}` }}</v-card-title>
                  </v-card-title>
                </v-row>
              </v-card-text>
              <v-divider class="mx-4"></v-divider>
              <!-- editar usuario -->
              <v-card-text>
                <template>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="detalleUsuario.documento"
                          :rules="documentoRules"
                          label="Documento"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="detalleUsuario.nombre"
                          :rules="nombreRules"
                          label="Nombres"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="detalleUsuario.email"
                          label="E-mail"
                          :rules="emailRules"
                        ></v-text-field>
                      </v-col>

                      <!-- editar contraseña -->

                      <v-row align="center" justify="center">
                        <v-dialog v-model="dialog" persistent max-width="600px">
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn color="orange" dark v-bind="attrs" v-on="on">
                              Editar contraseña
                            </v-btn>
                          </template>
                          <v-card>
                            <v-card-title> Editar contraseña </v-card-title>
                            <v-card-text>
                              <v-row>
                                <v-col cols="12">
                                  <v-form
                                    ref="form"
                                    v-model="valid"
                                    lazy-validation
                                  >
                                    <v-text-field
                                      v-model="passwordActual"
                                      :rules="passwordActualRules"
                                      label="Contraseña actual"
                                      outlined
                                      dense
                                      :append-icon="
                                        show1 ? 'mdi-eye' : 'mdi-eye-off'
                                      "
                                      :type="show1 ? 'text' : 'password'"
                                      required
                                      @click:append="show1 = !show1"
                                    ></v-text-field>
                                    <v-text-field
                                      v-model="nuevaPassword"
                                      :rules="nuevaPasswordRules"
                                      label="Nueva contraseña"
                                      outlined
                                      dense
                                      :append-icon="
                                        show2 ? 'mdi-eye' : 'mdi-eye-off'
                                      "
                                      :type="show2 ? 'text' : 'password'"
                                      required
                                      @click:append="show2 = !show2"
                                    ></v-text-field>
                                    <v-text-field
                                      v-model="confirmarPassword"
                                      :rules="[
                                        rules.required,
                                        rules.max,
                                        compararPasswords,
                                      ]"
                                      label="Confirmar contraseña"
                                      outlined
                                      dense
                                      :append-icon="
                                        show3 ? 'mdi-eye' : 'mdi-eye-off'
                                      "
                                      :type="show3 ? 'text' : 'password'"
                                      required
                                      @click:append="show3 = !show3"
                                    ></v-text-field>
                                    <v-btn
                                      :disabled="!valid"
                                      color="green"
                                      @click="cambiarPassword"
                                      >Cambiar contraseña</v-btn
                                    >
                                  </v-form>
                                </v-col>
                              </v-row>
                            </v-card-text>
                            <v-card-actions>
                              <v-btn color="red" @click="dialog = false"
                                >cerrar</v-btn
                              >
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                      </v-row>
                    </v-row>

                    <v-card-actions>
                      <v-btn
                        rounded
                        outlined
                        color="black"
                        class="mb-2 red accent-3"
                        text
                        to="/Home"
                      >
                        Regresar
                      </v-btn>
                      <v-btn
                        rounded
                        outlined
                        color="black"
                        class="mb-2 green accent-3"
                        @click="editarItem()"
                      >
                        Guardar
                      </v-btn>
                    </v-card-actions>
                  </v-container>
                </template>
              </v-card-text>
            </v-col>
          </v-row>
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
  name: "pagesPerfil",

  data: () => ({
    foto: [],
    show1: false,
    show2: false,
    show3: false,
    valid: true,
    loading: false,
    user: "",
    dialog: false,
    dialogAvatar: false,
    nombre: "",
    nombreRules: [
      (n) => !!n || " Nombre y Apellidos son requerido ❌",
      (n) =>
        (n && n.length <= 50) || " EL Nombre solo puede tener 50 caracteres",
    ],
    documento: "",
    documentoRules: [
      (d) => !!d || " EL numero del Documento es requerido ❌",
      (d) =>
        (d && d.length <= 17) || " Cedula No puede tener menos de 6 caracteres",
    ],
    email: "",
    emailRules: [
      (e) => !!e || " EL E-mail es requerido ❌",
      (e) =>
        (e && e.length <= 40) ||
        " el email  solo puede tener menos de  40 caracteres",
    ],
    passwordActual: "",
    passwordActualRules: [
      (value) => !!value || "Password actual es requerida",
      (value) =>
        (value && value.length >= 8) ||
        "Password actual debe ser mayor a 8 caracteres",
    ],
    nuevaPassword: "",
    nuevaPasswordRules: [
      (value) => !!value || "Nueva password es requerida",
      (value) =>
        (value && value.length >= 8) ||
        "Nueva password debe ser mayor a 8 caracteres",
    ],
    confirmarPassword: "",
    rules: {
      required: (value) => !!value || "Confirmar password es requerida",
      max: (value) =>
        (value && value.length >= 8) ||
        "Confirmar password debe ser mayor a 8 caracteres",
    },
    usuarios: [],
    detalleUsuario: {
      documento: "",
      nombre: "",
      email: "",
    },
    id: "",
    ava: [
      {
        avatar: "1",
        url: "https://res.cloudinary.com/imagen/image/upload/v1681245979/Coohilados/WhatsApp_Image_2023-04-11_at_3.36.18_PM_1_t62rqo.jpg",
      },
      {
        avatar: "2",
        url: "https://res.cloudinary.com/imagen/image/upload/v1681245979/Coohilados/WhatsApp_Image_2023-04-11_at_3.36.20_PM_f6gpxe.jpg",
      },
      {
        avatar: "3",
        url: "https://res.cloudinary.com/imagen/image/upload/v1681245979/Coohilados/WhatsApp_Image_2023-04-11_at_3.36.18_PM_2_om7kcb.jpg",
      },
      {
        avatar: "4",
        url: "https://res.cloudinary.com/imagen/image/upload/v1681245979/Coohilados/WhatsApp_Image_2023-04-11_at_3.36.18_PM_s8o37e.jpg",
      },
    ],
  }),
  methods: {
    compararPasswords() {
      if (this.nuevaPassword === this.confirmarPassword) {
        return true;
      } else {
        return "Passwords deben coincidir";
      }
    },
    avatar(url) {
      this.loading = true;
      axios
        .put(`https://back-coohilados.vercel.app/api/usuario/${this.id}`, {
          foto: url,
        })
        .then((response) => {
          this.dialogAvatar = false;
          this.loading = false;
          console.log(response);
          this.user.foto = response.data.usuario.foto;

          this.$swal({
            icon: "success",
            title:
              "Se editó la foto correctamente, por favor vuelva a iniciar sesión",
          });
        })
        .catch((error) => {
          console.log(error);
          this.dialogAvatar = false;
          this.loading = false;

          this.$swal({
            icon: "error",
            title: "Error al editar la foto del usuario",
          });
        });
    },
    subir() {
      this.loading = true;
      let formData = new FormData();
      formData.append("archivo", this.foto);
      axios
        .post(
          `https://back-coohilados.vercel.app/api/usuario/uploadinary/${this.user._id}`,
          formData
        )
        .then((response) => {
          console.log(response.data);
          this.loading = false;
          this.dialogAvatar = false;
          this.user.foto =
            response.data.url; /* hacer esto con un state y un commit */
          this.$swal({
            icon: "success",
            title:
              "Se editó la foto correctamente, por favor vuelva a iniciar sesión",
          });
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
          this.dialogAvatar = false;
          this.$swal({
            icon: "error",
            title: "Error al editar la foto del usuario",
          });
        });
    },
    traerUsuario() {
      this.id = this.user._id;
      this.detalleUsuario = {
        documento: this.user.documento,
        nombre: this.user.nombre,
        email: this.user.email,
      };
    },
    cambiarPassword() {
      this.loading = true;
      axios
        .put(
          `https://back-coohilados.vercel.app/api/usuario/cambiarPassword/${this.id}`,
          {
            passwordActual: this.passwordActual,
            nuevaPassword: this.nuevaPassword,
          }
        )
        .then((res) => {
          console.log(res.data.modificar);
          this.loading = false;
          this.dialog = false;
          this.$swal({
            icon: "success",
            title: "Se editó la contraseña correctamente",
          });
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
          this.dialog = false;
          this.$swal({
            icon: "error",
            title:
              "Error al editar la contraseña, por favor verifique los datos",
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
        })
        .then((response) => {
          this.traerUsuario();
          this.loading = false;
          console.log(response);
          this.$store.dispatch("setDatos", response.data.item);
          this.$router.push("/Perfil");

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

<style scoped>
.img {
  position: relative;
}

.img img {
  width: 100%;
  height: 100%;
}

.boton {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>