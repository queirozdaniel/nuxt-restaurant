<template>
  <v-card :to="{ name: 'category', params: {category: category.attributes.slug }}">
    <v-img :src="category.attributes.image.data[0].attributes.name" height="180"></v-img>
    <v-card-title>
      {{ category.attributes.name }}
      <v-icon class="ml-2" color="primary">{{ category.attributes.icon }}</v-icon>
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  props: {
    category: {
      type: Object,
      required: true
    }
  }
}
</script>