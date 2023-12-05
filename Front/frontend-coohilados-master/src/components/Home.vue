<template>
  <v-container fluid>
    <v-row class="lime lighten-3" style="height: 90vh">
      <v-col cols="12">
        <section
          style="
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          "
        >
          <h1>
            {{ `${user.nombre}` }}
          </h1>
          <h3>
            {{ `Área: ${user.area}` }} <br />
            {{ `Rol: ${user.rol}` }}
          </h3>
          <h3 v-if="user.rol == 'Administrador'">
            "Usted puede editar todos los usuarios"
          </h3>
          <h3 v-if="user.rol == 'Actualizador'">
            "Usted visualizar todos los trabajadores y anexar anotaciones" e
            imprimir reportes
          </h3>
          <h3 v-if="user.rol == 'Editor de Datos'">
            Usted puede editar todos los Trabajadores, imprimir reportes,
            visualizar y editar
          </h3>
          <h3 v-if="user.rol == 'Visualizador'">
            Usted puede Visualizar todos los trabajadores e imprimir reportes
          </h3>
        </section>
      </v-col>
      <v-row class="justify-center" align="center" :key="rol">
        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="3"
          xl="2"
          v-if="user.rol == 'Visualizador'"
        >
          <v-card
            class="pt-0 light-green-accent-4"
            color="#41B44C"
            max-width="340"
            outlined
          >
            <div>
              <h2 class="text-left mb-10">
                CONSEJO Y GERENCIA
                <font-awesome-icon :icon="['fas', 'list-check']" />
              </h2>
            </div>
            <v-spacer></v-spacer>
            <v-container>
              <v-row class="justify-end mt-1">
                <v-col cols="3">
                  <v-btn
                    color="#41B44C"
                    class="black"
                    outlined
                    rounded
                    text
                    to="/Gerencia"
                  >
                    <v-icon>mdi-login</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="3"
          xl="2"
          v-if="user.rol == 'Editor de Datos'"
        >
          <v-card
            class="pt-0 light-green-accent-4"
            color="#41B44C"
            max-width="340"
            outlined
          >
            <div>
              <h2 class="text-left mb-10">
                TALENTO HUMANO
                <font-awesome-icon :icon="['fas', 'seedling']" />
              </h2>
            </div>
            <v-spacer></v-spacer>
            <v-container>
              <v-row class="justify-end mt-1">
                <v-col cols="3">
                  <v-btn
                    color="#41B44C"
                    class="black"
                    outlined
                    rounded
                    text
                    to="/TH"
                  >
                    <v-icon>mdi-login</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="3"
          xl="2"
          v-if="user.rol == 'Administrador'"
        >
          <v-card
            class="pt-0 light-green-accent-4"
            color="#41B44C"
            max-width="340"
            outlined
          >
            <div>
              <h1 class="text-left mb-10">
                SISTEMAS
                <font-awesome-icon :icon="['fas', 'computer']" />
              </h1>
            </div>
            <v-spacer></v-spacer>
            <v-container>
              <v-row class="justify-end mt-1">
                <v-col cols="3">
                  <v-btn
                    color="#41B44C"
                    class="black"
                    outlined
                    rounded
                    text
                    to="/Sistemas"
                  >
                    <v-icon>mdi-login</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>

        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="3"
          xl="2"
          v-if="user.rol == 'Actualizador'"
        >
          <v-card class="mx-auto" color="#41B44C" max-width="344" outlined>
            <div>
              <h1 class="text-left mb-10">
                SST
                <font-awesome-icon :icon="['fas', 'user-nurse']" />
              </h1>
            </div>
            <v-spacer></v-spacer>

            <v-container>
              <v-row class="justify-end mt-0">
                <v-col cols="3">
                  <v-btn
                    color="#41B44C"
                    class="black"
                    outlined
                    rounded
                    text
                    to="/Sst"
                  >
                    <v-icon>mdi-login</v-icon></v-btn
                  >
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>

        <v-col cols="12" sm="6" md="4" lg="3" xl="2">
          <v-card class="mx-auto" color="#41B44C" max-width="344" outlined>
            <div>
              <h1 class="text-left mb-10">
                Perfil
                <font-awesome-icon :icon="['fas', 'user']" />
              </h1>
            </div>
            <v-spacer></v-spacer>

            <v-container>
              <v-row class="justify-end mt-0">
                <v-col cols="3">
                  <v-btn
                    color="#41B44C"
                    class="black"
                    outlined
                    rounded
                    text
                    to="Perfil"
                  >
                    <v-icon>mdi-login</v-icon></v-btn
                  >
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "pagesHome",
  data: () => ({
    user: "",
  }),
  methods: {
    traer() {
      this.user = JSON.parse(localStorage.getItem("usuario"));
    },
  },
  created() {
    this.traer();
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