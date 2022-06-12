<template>
  <v-container>
    <h1 class="secundary--text">
      Receitas favoritas
      <v-icon large class="secundary--text">mdi-heart</v-icon>
    </h1>
    <p class="secundary--text">Minhas receitas favoritas :)</p>
    <v-row>
      <v-col cols="4" v-for="favorite in favorites" :key="favorite.id">
       <app-ui-nav-card-recipe :recipe="favorite"></app-ui-nav-card-recipe>
      </v-col>
    </v-row>
    <v-alert type="info" v-if="favorites.length === 0" class="mt-3">
      <p>Não há receitas favoritas</p>
    </v-alert>
    <div class="my-3">
      <app-ui-back-button />
    </div>
  </v-container>
</template>

<script>
export default {
  middleware: "auth",
  async asyncData({ app }) {
    let client = app.apolloProvider.defaultClient
    let id = app.$auth.user.id
    let query = {
      context: {
        headers: {
          Authorization: app.$auth.strategy.token.get()
        }
      },
      query:require('../../graphql/userFavorites.gql'),
      fetchPolicy: 'no-cache',
      variables: { id }
    }
    let favorites = null
    await client.query(query).then(({data}) => {
      favorites = data.usersPermissionsUser.data.attributes.favorites.data
    }).catch(e => console.log(e))
    
    return {
      favorites
    }
  }
}
</script>