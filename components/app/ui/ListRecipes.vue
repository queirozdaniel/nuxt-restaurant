<template>
  <div>
    <div v-if="recipes.length != 0">
      <v-list>
        <v-list-item-group>
          <template v-for="recipe in recipes">
            <v-list-item two-line :key="recipe.id">
              <v-list-item-content>
                <v-list-item-title>{{recipe.attributes.name}}</v-list-item-title>
                <v-list-item-subtitle>{{recipe.attributes.category.data.attributes.name}}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-row align="center" justify="center">
                  <v-btn icon><v-icon>mdi-pencil</v-icon></v-btn>
                  <v-btn icon><v-icon>mdi-delete</v-icon></v-btn>
                </v-row>
              </v-list-item-action>
            </v-list-item>
          </template>
        </v-list-item-group>
      </v-list>
    </div>
    <div v-else>
      Não há receitas vinculadas.
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recipes: {
      type: Array,
      default: () => ([])
    }
  }
}
</script>