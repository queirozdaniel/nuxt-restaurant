<template>
  <v-app>
    <v-navigation-drawer
      app
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      color="grey lighten-4"
    >
      <v-list color="primary--text">
        <v-list-item to="/">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              Início
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item 
          v-for="link in links" 
          :key="link.id" 
          :to="{
            name: 'category', 
            params : { category: link.attributes.slug }}"
        >
          <v-list-item-icon>
            <v-icon>{{ link.attributes.icon}}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              {{ link.attributes.name}}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app :clipped-left="$vuetify.breakpoint.lgAndUp" color="grey lighten-4" flat>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
    </v-app-bar>
   <v-main class="grey lighten-4">
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
    links() {
      return this.$store.getters.readCategories
    }
  }
}
</script>
