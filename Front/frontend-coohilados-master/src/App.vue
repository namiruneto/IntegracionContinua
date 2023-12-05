<template>
  <v-app>
    <Header></Header>
    <router-view></router-view>
    <v-content></v-content>
    <Footer />
  </v-app>
</template>
<script>
import Header from "./pages/Header.vue";
import Footer from "./pages/Footer.vue";
export default {
  name: "App",
  components: {
    Header,
    Footer,

  },
  data: () => ({
    tiempo: 10,
  }),
  computed: {

  },
  methods: {
    expirarSesion() {
      let i = setInterval(() => {
        window.onmousemove = () => {
          this.tiempo = 900
        }
        this.tiempo--
        console.log(this.tiempo);
        if (this.tiempo == 300) {
          this.$swal({
            icon: "info",
            title: `Su sesión esta a 5 minutos de cerrar`,
          });
        }
        if (this.tiempo == -1) {
          this.$store.state.token = undefined
          this.$router.push("/");
          localStorage.removeItem("token");
          localStorage.removeItem("usuario")
          this.$swal({
            icon: "info",
            title: "Su sesión a expirado",
          });
          clearInterval(i)
        }
      }, 1200)
    }
  },
  created(){
    console.log("created de app");
  }
};
</script>

<style scoped lang="scss">
::v-deep .v-application--wrap {
  min-height: unset;
}
</style>
