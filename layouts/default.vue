<template>
  <v-app>
    <v-navigation-drawer
    app
    v-model="drawer"
    :clipped="$vuetify.breakpoint.lgAndUp"
    >
      <div>Botoes {{ counter }}</div>
    </v-navigation-drawer>
    <v-app-bar app :clipped-left="$vuetify.breakpoint.lgAndUp">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
    </v-app-bar>
   <v-main>
     <nuxt />
   </v-main>
   <v-footer padless>
      <v-row justify="center" no-gutters>
       <v-btn color="primary" small icon>
         <v-icon>mdi-facebook</v-icon>
       </v-btn>
       <v-btn color="primary" small icon>
         <v-icon>mdi-instagram</v-icon>
       </v-btn>
       <v-btn color="primary" small icon>
         <v-icon>mdi-twitter</v-icon>
       </v-btn>
       <v-col class="text-center primary--text" cols="12">
         &copy; {{new Date().getFullYear()}} - Le Restaurant
       </v-col>
      </v-row>
   </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      drawer: false,
      title: "Le Restaurant"
    }
  },
  computed: {
    counter() {
      return this.$store.getters.readCounter
    }
  }
}
</script>
