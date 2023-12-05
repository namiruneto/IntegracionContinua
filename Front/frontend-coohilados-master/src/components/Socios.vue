<template>
  <v-app id="inspire">
    <v-container fluid>
      <v-row class="amber lighten-3">
          <v-col cols="" sm="5" md="4" lg="1" xl="2">
            <v-row class="justify-end mt-1">
              <v-col cols="3">
                <v-btn
                  color="white"
                  class="red"
                  outlined
                  rounded
                  text
                  to="/TH"
                >
                  <h1>ATRAS</h1> 
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      <v-row
        class="amber lighten-3 justify-center"
        align="center"
        style="height: 90vh"
      >
        <v-col cols="12" sm="6" md="4" lg="3" xl="2">
          <v-card
            class="pt-0 light-green-accent-4"
            color="#41B44C"
            max-width="340"
            outlined
          >
            <div>
              <h1 class="text-left mb-10">
                ASOCIADO TRABAJADOR
                <font-awesome-icon :icon="['fas', 'person-digging']" />
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
                    to="/AgregarTrabajadores"
                  >
                    <v-icon>mdi-login</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>

        <v-col cols="12" sm="6" md="4" lg="3" xl="2">
          <v-card
            class="mx-auto"
            color="light-blue darken-3"
            max-width="344"
            outlined
          >
            <div>
              <h1 class="text-left mb-10">
                ASOCIADO APORTANTE
                <font-awesome-icon :icon="['fas', 'sack-dollar']" />
              </h1>
            </div>
            <v-spacer></v-spacer>
            <v-container>
              <v-row class="justify-end mt-1">
                <v-col cols="3">
                  <v-btn
                    color="#41B44C"
                    class="white"
                    outlined
                    rounded
                    text
                    to="/Aportante"
                  >
                    <v-icon>mdi-login</v-icon></v-btn
                  >
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
<script>
export default {
  name: "pagesSocios",
  data: () => ({}),
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