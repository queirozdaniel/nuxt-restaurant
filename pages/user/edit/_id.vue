<template>
  <v-container>
    <h2>Editar Receita</h2>
    <v-divider></v-divider>
      <div v-if="recipe">
        <app-form-recipe :recipe="recipe" ></app-form-recipe>
      </div>
  </v-container>
</template>

<script>
export default {
  middleware: 'auth',
  async asyncData({app, route}){
    const client = app.apolloProvider.defaultClient
    const id = route.params.id
    const query = {
      query:require("../../../graphql/recipe.gql"),
      variables:{ id },
      fetchPolicy: "no-cache"
    }
    let recipe = null
    await client.query(query).then(({data}) => {
      const recipeId = data.recipe.data.id
      const recipeAttributes = data.recipe.data.attributes

      recipe = {
        id:recipeId,
        name: recipeAttributes.name,
        duration: recipeAttributes.duration,
        servings: recipeAttributes.servings,
        img: recipeAttributes.img,
        description: recipeAttributes.description,
        ingredients: recipeAttributes.ingredients,
        steps: recipeAttributes.steps,
        likes: recipeAttributes.likes,
        category: {
          id: recipeAttributes.category.data.id,
          ...recipeAttributes.category.data.attributes,
        },
        autor: recipeAttributes.author.data.attributes.username,
      }

    })
    
    return { recipe }
  }
}
</script>