<template>
  <v-container>
    {{ categories }}
    <v-divider></v-divider>
    <ApolloQuery :query="query">
      <template slot-scope="{result: { data, loading, error }}">
        <div v-if="loading">Carregando dados...</div>
        <div v-else-if="error">{{error}}</div>
        <div v-else v-for="category in data.categories.data" :key="category.id">
          nombre: {{category.attributes.name}}
        </div>
      </template>
    </ApolloQuery>
  </v-container>
</template>

<script>
import gql from 'graphql-tag'
import { categoriesGql } from '~~/graphql/queries'


export default {
  name: 'IndexPage',
  data() {
    return {
      query: categoriesGql
    }
  },
  apollo: {
    categories: {
      query:  categoriesGql,
      update: data => data.categories
    }
  }
}
</script>
