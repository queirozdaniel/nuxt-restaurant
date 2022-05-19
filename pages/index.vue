<template>
  <v-container>
    <v-divider></v-divider>
    <p v-if="$fetchState.pending">Carregando os dados</p>
    <p v-else-if="$fetchState.error">Erro em busca</p>
    <div v-else>
      <div  v-for="category in categories" :key="category.id">
        <v-btn 
          class="my-1"
          :to="{
            name: 'category', 
            params : { category:category.attributes.slug },
            query: { id: category.id}
          }">
          {{category.attributes.name}}
        </v-btn>
      </div>
    </div>
  </v-container>
</template>

<script>

export default {
  name: 'IndexPage',
  data() {
    return {
      categories: []
    }
  },
  async fetch() {
    const client = this.$apollo.getClient()
    const query = {
      query:require('../graphql/categories.gql')
    }

    await client.query(query).then( ({data}) => {
      this.categories = data.categories.data
    })
  }
  // async asyncData(context) {
  //   const client = context.app.apolloProvider.defaultClient
  //   const query = {
  //     query:require('../graphql/categories.gql')
  //   }

  //   let categories = []
  //   await client.query(query).then( ({data}) => {
  //     categories = data.categories.data
  //   })

  //   return { categories }
  // },
}
</script>
