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
      <v-spacer></v-spacer>
      <v-menu v-model="search" :close-on-content-click="false" offset-y>
        <template v-slot:activator="{on}">
          <v-btn v-on="on" color="primary" icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            Buscar Receita
          </v-card-title>
          <v-card-text>
            <v-text-field outlined label="Nome da Receita" dense v-model="findRecipe" @input="searchRecipe"></v-text-field>
            <v-list v-if="findRecipe.length !== 0">
              <v-list-item v-for="recipe in recipes" :key="recipe.id" 
              @click="seeRecipe(recipe.attributes.category.data.attributes.slug, recipe.id)">
                {{ recipe.attributes.name }}
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-menu>
      <div v-if="$auth.loggedIn">
        <v-btn text color="primary" @click="logout()">Sair</v-btn>
        <v-menu
          v-model="loginmenu"
          :close-on-content-click="false"
          offset-y
        >
          <template v-slot:activator="{on}">
            <v-btn v-on="on" color="secundary" icon>
                <v-avatar>
                  <span class=" headline">{{ $auth.user.username[0] }}</span>
                </v-avatar>
              </v-btn>
          </template>
          <v-card>
            <v-list>
              <v-list-item>
                <v-list-content class="mx-2">
                  <v-list-item-title>{{ $auth.user.username }}</v-list-item-title>
                  <v-list-item-subtitle>{{ $auth.user.email }}</v-list-item-subtitle>
                </v-list-content>
                <v-list-action>
                  <v-btn to="/user" small>Editar</v-btn>
                </v-list-action>
              </v-list-item>
            </v-list>
            <v-card-actions>
              <v-btn text color="primary" @click="loginmenu = false" small>Fechar</v-btn>
              <v-btn color="primary" @click="logout()">Sair de conta</v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </div>
      <div v-else>
        <v-btn text color="primary" @click="dialog = true; type = 'app-form-login'">Acessar</v-btn>
        <v-btn text color="primary" @click="dialog = true; type = 'app-form-register'">Registrar-se</v-btn>
      </div>
    </v-app-bar>

   <v-main class="grey lighten-4">
     <nuxt />
     <v-snackbar v-for="(snack, i) in snacks.filter( s => s.showing) " :key="i + Math.random()" 
     v-model="snack.showing" :color="snack.color" :timeout="snack.timeout" right :style="`bottom: ${i * 60 + 8}px`">
      {{ snack.text }}
      <v-btn slot="action" small icon @click="snack.showing = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
     </v-snackbar>
   </v-main>

    <v-dialog v-model="dialog" max-width="600">
      <component :is="type" @close="dialog = $event"/>
    </v-dialog>

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
import { mapGetters } from 'vuex'

export default {
  name: 'DefaultLayout',
  data() {
    return {
      drawer: false,
      title: "Le Restaurant",
      search: false,
      findRecipe: '',
      dialog: false,
      type: 'app-form-register',
      snackbar: false,
      loginmenu: false
    }
  },
  computed: {
    ...mapGetters({
      links: "readCategories",
      recipes:"readLoadedRecipes",
      snacks: "snackbars/readSnackbars"
    })
  },
  methods: {
    seeRecipe(category, recipe) {
      this.findRecipe = ""
      this.search = false
      this.$router.push({name:'category-recipe', params:{category, recipe}})
    },
    searchRecipe(){
      this.$store.dispatch("searchRecipe", this.findRecipe)
    },
    logout() {
      this.$auth.logout()
    }
  }
}
</script>
