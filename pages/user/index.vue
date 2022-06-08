<template>
  <v-container>
    <h2>Bem vindo, {{ $auth.user.username }}</h2>
    <v-divider class="my-5"></v-divider>
    <h3>Suas Receitas</h3>
    <v-btn color="primary" small class="my-3" to="user/newRecipe">Associar Receita</v-btn>
    <div v-if="recipes">
      <app-ui-list-recipes :recipes="recipes"></app-ui-list-recipes>
    </div>
    <div v-else></div>
  </v-container>
</template>

<script>
export default {
  middleware : 'auth',
  async asyncData({app}){
    let client = app.apolloProvider.defaultClient
    let id = app.$auth.user.id

    const query = {
      query:require('../../graphql/userRecipes.gql'),
      variables:{id},
      //fetchPolicy:'no-cache'
    }

    let recipes = null
    await client.query(query).then(({ data }) => {
      recipes = data.recipes.data
    })
    return {
      recipes
    }
  }
}
</script>