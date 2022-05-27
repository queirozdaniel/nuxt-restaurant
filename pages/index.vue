<template>
  <v-container>
    <v-row>
      <v-col cols="3" v-for="category in categories" :key="category.id">
        <app-ui-nav-card :category="category"></app-ui-nav-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'IndexPage',
  middleware: 'initData',
  data() {
    return {
    }
  },

  computed: {
    categories() {
      return this.$store.getters.readCategories
    }
  }
}
</script>
