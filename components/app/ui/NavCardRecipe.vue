<template>
  <v-card :to="{
      name: 'category-recipe',
      params: { category: recipe.attributes.category.data.attributes.slug , recipe: recipe.id}
    }">
    <v-img :src="recipe.attributes.img"></v-img>
    <v-card-text>
      <v-row>
        <v-col cols="7">
          <h3>{{ recipe.attributes.name }}</h3>
        </v-col>
        <v-col cols="5" class="d-flex justify-end">
          <div>
            <v-icon>mdi-heart</v-icon>
            <span>{{ recipe.attributes.likes }}</span>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {

  props: {
    recipe: {
      type: Object,
      required: true
    }
  }

}
</script>