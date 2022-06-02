<template>
  <div>
    <v-form>
      <v-text-field dense label="Nome da Receita" outlined v-model="recipe.name"></v-text-field>
      <v-text-field dense label="Tempo de Preparo" type="number" outlined v-model="recipe.duration"></v-text-field>
      <v-text-field dense label="Serve Quantas Pessoas ?" outlined v-model="recipe.serving"></v-text-field>
      <v-text-field dense label="Link para Foto de Receita" outlined v-model="recipe.img"></v-text-field>
      <v-text-field dense label="Descrição" outlined v-model="recipe.description"></v-text-field>
      <div v-for="(ingredient, i) in recipe.ingredients" :key="i + 'ingredient'">
        <v-text-field dense :label="`Ingrediente ${i+1}`" 
          outlined v-model="recipe.ingredients[i]"></v-text-field>
      </div>
      <div v-for="(step, i) in recipe.steps" :key="i + 'step'">
        <v-text-field dense :label="`Passo ${i+1}`" 
          outlined v-model="recipe.steps[i]"></v-text-field>
      </div>
    </v-form>
  </div>
</template>

<script>
export default {
  props: {
    recipe: {
      type: Object,
      default: () => {
        name: ""
        duration: 0
        serving: 21
        img: ""
        description: ""
        ingredients:[""]
        steps:[""]
        category: 1
      }
    }
  }
}
</script>