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
    <!-- <div v-for="recipe in recipes" :key="recipe.id">
      <nuxt-link 
        :to="{
          name: 'category-recipe',
          params: { category: $route.params.category, recipe: recipe.id}
        }"
      > 
        {{ recipe.attributes.name }}
      </nuxt-link>
    </div> -->
    <v-divider></v-divider>
    <nuxt-link to="/">Voltar</nuxt-link>
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