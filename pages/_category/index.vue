<template>
  <v-container>
    <h1 class="secundary--text">
      {{ category.attributes.name }}
      <v-icon large class="secundary--text">{{ category.attributes.icon }}</v-icon>
    </h1>
    <p class="secundary--text">{{ category.attributes.description }}</p>
    <v-row>
      <v-col cols="4" v-for="recipe in recipes" :key="recipe.id">
        <app-ui-nav-card-recipe :recipe="recipe"></app-ui-nav-card-recipe>
      </v-col>
    </v-row>
    <v-alert type="info" v-if="recipes.length === 0" class="mt-3">
      <p>Não há receitas disponíveis</p>
    </v-alert>
    <div class="my-3">
      <app-ui-back-button />
    </div>
  </v-container>
</template>

<script>

export default {
  data() {
    return {
    }
  },
  computed: {
    category() {
      const slug = this.$route.params.category
      return this.$store.getters.readCategories.find(category => category.attributes.slug == slug)
    }
  },
  async asyncData({app, route}) {
    const slug = route.params.category
    const client = app.apolloProvider.defaultClient
    const query = {
      query:require('../../graphql/recipes.gql'),
      variables: { slug }
    }

    let recipes = []
    await client.query(query).then(({data}) => {
      recipes = data.recipes.data
    }).catch(e => console.log(error))

    return { recipes }
  }

}
</script>