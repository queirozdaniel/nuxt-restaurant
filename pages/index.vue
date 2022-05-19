<template>
  <v-container>
    <v-divider></v-divider>
    <!-- {{ categories }} -->
    <div v-for="category in categories" :key="category.id">
      <v-btn 
        :to="{
          name: 'category', 
          params : { category:category.attributes.slug },
          query: { id: category.id}
        }">
        {{category.attributes.name}}
      </v-btn>
    </div>
    <!-- <ApolloQuery :query="query">
      <template slot-scope="{result: { data, loading, error }}">
        <div v-if="loading">Carregando dados...</div>
        <div v-else-if="error">{{error}}</div>
        <div v-else v-for="category in data.categories.data" :key="category.id">
          <v-btn 
            :to="{
              name: 'category', 
              params : { category:category.attributes.slug },
              query: { id: category.id}
            }">
            {{category.attributes.name}}
          </v-btn>
        </div>
      </template>
    </ApolloQuery> -->
  </v-container>
</template>

<script>
// import { categoriesGql } from '@/graphql/queries'

export default {
  name: 'IndexPage',
  async asyncData(context) {
    const client = context.app.apolloProvider.defaultClient
    const query = {
      query:require('../graphql/categories.gql')
    }

    let categories = []
    await client.query(query).then( ({data}) => {
      categories = data.categories.data
    })

    return { categories }
  },
  // data() {
  //   return {
  //     query: categoriesGql
  //   }
  // },
  // apollo: {
  //   categories: {
  //     query:  categoriesGql,
  //     update: data => data.categories
  //   }
  // }
}
</script>
