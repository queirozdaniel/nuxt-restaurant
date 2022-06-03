<template>
  <v-container>
    <h2>Adicionar Nova Receita</h2>
    <v-divider class="my-5"></v-divider>
    <app-form-recipe></app-form-recipe>
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
      variables:{id}
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