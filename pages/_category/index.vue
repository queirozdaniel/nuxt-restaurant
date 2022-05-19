<template>
  <div>
    {{ $route.params.category }}
    {{ category }}
  </div>
</template>

<script>
import { categoryGql } from '@/graphql/queries'

export default {
  data() {
    return {
      query: categoryGql
    }
  },
  apollo: {
    category: {
      query() {
        return this.query
      },
      variables() {
        return { id: this.$route.query.id}
      }
    }
  }

}
</script>