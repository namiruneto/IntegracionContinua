<template>
  <v-container class="amber" fluid>
    <h1 cols="whithe--text">Bitacora</h1>
    <br />
    <v-col>
    <v-img
      src="https://colombiacooperativa.coop/wp-content/uploads/2020/08/fique-cooperativo-foto-vanguardia-colombia-cooperativa.jpg"
    ><br>
      <v-row>
        <v-col class="green accent-4">
          <v-card class="green accent-4">
            <v-card-title >
              <v-spacer></v-spacer>
            </v-card-title>
            <v-data-table class="green accent-4" :headers="headers" :items="bitacora" :search="search">
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>

    </v-img>
    </v-col>

    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ formTitle }}</span>
        </v-card-title>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="Usuario"
            :counter="10"
            :rules="UsuarioRules"
            label="usuario"
            required
          ></v-text-field>

          <v-text-field
            v-model="Mensaje"
            :counter="10"
            :rules="MensajeRules"
            label="mensaje"
            required
          ></v-text-field>

          <v-text-field
            v-model="FechaHora"
            :counter="10"
            :rules="FechaHoraRules"
            label="fecha y ahora"
            required
          ></v-text-field>
        </v-form>
        <v-card-actions>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "PagesBitacora",
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Usuario",
        align: "start",
        sortable: false,
        value: "usuario",
      },
      { text: "Mensaje", value: "mensaje" },
      { text: "Fecha y Hora", value: "createdAt" },
    ],

    bitacora: [],
  }),

  methods: {
    abrir() {
      this.dialog = true;
    },

    traerBitacora() {
      axios
        .get("https://back-coohilados.vercel.app/api/bitacora")
        .then((response) => {
          this.bitacora = response.data.bitacora;
          console.log(this.bitacora);
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  created() {
    this.traerBitacora();
  },
};
</script>

<style scoped>
.cajas {
  max-height: 26px;
}

.parrafo {
  max-height: 26px;
}

#border {
  border: 1px solid black;
}

#ancho {
  border: 1px solid orange;
}
</style>