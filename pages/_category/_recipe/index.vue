<template>
  <v-container>
    <h1 class="secundary--text"> {{ recipe.attributes.name }}</h1>
    <h5 class="secundary--text"> {{ recipe.attributes.category.data.attributes.name }}</h5>

    <v-card class="mt-3">
      <v-card-title>
        <v-icon>mdi-information</v-icon>
        Informações
      </v-card-title>
      <v-card-text class="black--text">
        <v-row>
          <v-col cols="6">
            <v-chip color="primary" outlined>
              <v-icon left>mdi-account-group</v-icon>
              Serve: {{ recipe.attributes.servings }}
            </v-chip>
            <v-chip color="primary" outlined>
              <v-icon left>mdi-clock</v-icon>
              Tempo: {{ formatedTime }}
            </v-chip>
            <v-chip color="primary" outlined>
              <v-icon left>mdi-account-edit</v-icon>
              Autor: {{ recipe.attributes.author.data.attributes.username }}
            </v-chip>
            <v-divider class="my-3"></v-divider>
            <h4 class="body-1">Descrição</h4>
            <div v-html="recipe.attributes.description"></div>
          </v-col>
          <v-col cols="6">
            <v-img :src="recipe.attributes.img" max-height="500"></v-img>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn icon v-if="$auth.loggedIn" large @click="toggleLiked()">
          <v-icon :color="recipeIsLiked? 'error': 'grey'" large>mdi-heart</v-icon>
        </v-btn>
        <v-icon v-else class="mr-3">mdi-heart</v-icon><span class="overline"> Likes {{recipe.attributes.likes}}</span>
      </v-card-actions>
    </v-card>
    <div class="mt-3">
      <v-row>
        <v-col cols="5">
          <v-card>
            <v-card-title>
              <v-icon class="mr-3">mdi-fridge</v-icon>Ingredientes
            </v-card-title>
            <v-list>
              <v-list-item v-for="(ingredient,i) in recipe.attributes.ingredients" :key="i">
                {{ ingredient }}
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
        <v-col cols="7">
          <v-card>
            <v-card-title>
              <v-icon>mdi-stove</v-icon>Passos
            </v-card-title>
            <v-timeline dense>
              <v-timeline-item v-for="(step,i) in recipe.attributes.steps" :key="i+Math.random()" color="secondary" small>
                {{ step }}
              </v-timeline-item>
            </v-timeline>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <div class="my-3">
      <app-ui-back-button />
    </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      likedRecipe: false
    }
  },
  computed: {
    formatedTime() {
      let hours = Math.floor(this.recipe.attributes.duration / 60)
      let minutes = this.recipe.attributes.duration % 60

      return ("0"+hours).slice(-2) + ":" + ("0"+minutes).slice(-2)
    },
    userFavorites(){
      return this.$store.getters['user/favorites']
    },
    recipeIsLiked() {
      if (this.userFavorites) {
        this.likedRecipe = this.userFavorites.some((fav) => fav.id === this.recipe.id)
      } else {
        this.likedRecipe = false
      }
      return this.likedRecipe
    }
  },
  methods: {
    toggleLiked() {
      this.likedRecipe = !this.likedRecipe
      if (this.likedRecipe) {
        this.likeRecipe()
      } else {
        this.unlikeRecipe()
      }
    },
    likeRecipe() {
      this.$store.commit('user/addRecipe', this.recipe)
      
      const variables = {
        id: this.recipe.id,
        idUser: this.$auth.user.id,
        favorites: this.userFavorites.map(fav => Number(fav.id))
      }

      this.$apollo.query({
        query: require('../../../graphql/getLikes.gql'),
        variables: { id: this.recipe.id }
      }).then(({ data }) => {
        let likes = data.recipe.data.attributes.likes + 1
        this.recipe.attributes.likes = likes
        variables.likes = likes

        this.$apollo.mutate({
          context: {
            headers: {
              Authorization: this.$auth.strategy.token.get()
            }
          },
          mutation: require('../../../graphql/updateLikes.gql'),
          variables
        })
      
      })

    },
    unlikeRecipe() {
      this.$store.commit('user/removeRecipe', this.recipe.id)

      const variables = {
        id: this.recipe.id,
        idUser: this.$auth.user.id,
        favorites: this.userFavorites.map(fav => Number(fav.id))
      }

      this.$apollo.query({
        query: require('../../../graphql/getLikes.gql'),
        variables: { id: this.recipe.id }
      }).then(({ data }) => {
        let likes = data.recipe.data.attributes.likes - 1
        this.recipe.attributes.likes = likes
        variables.likes = likes

        this.$apollo.mutate({
          context: {
            headers: {
              Authorization: this.$auth.strategy.token.get()
            }
          },
          mutation: require('../../../graphql/updateLikes.gql'),
          variables
        })
      })
    }
  },
  async asyncData({app, route}) {
    const client = app.apolloProvider.defaultClient
    const id = route.params.recipe

    const query = {
      query:require('../../../graphql/recipe.gql'),
      variables: { id }
    }
    let recipe = null

    await client.query(query).then(({ data }) => {
      recipe = data.recipe.data
    }).catch(e => console.log(e))

    return { recipe }
  },
  async mounted(){
    if (this.$auth.loggedIn && this.$store.getters['user/favorites'] == null) {
      await this.$store.dispatch("user/getFavorites")
    }
  }
}
</script>