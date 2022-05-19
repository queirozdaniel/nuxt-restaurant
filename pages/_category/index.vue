<template>
  <div>
    {{ $route.params.category }}
    {{ category }}
    <div>
      {{ counter }}
      <v-btn @click="callMutation()">Mutation</v-btn>
      <v-btn @click="callAction()">Action</v-btn>
    </div>
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
  },
  computed: {
    counter() {
      return this.$store.getters.readCounter
    }
  },
  methods: {
    callMutation() {
      this.$store.commit('increment')
    },
    callAction(){
      this.$store.dispatch('increment')
    }
  }

}
</script>