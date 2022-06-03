<template>
  <div>
    <v-card max-width="800" class="mx-auto">
      <v-card-title>
        Minha Receita
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field dense label="Nome da Receita" outlined v-model="recipe.name"></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field dense label="Tempo de Preparo" type="number" outlined v-model="recipe.duration"></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field dense label="Serve Quantas Pessoas ?" outlined v-model="recipe.serving"></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-select dense outlined v-model="recipe.category" 
                  label="Categoria" :items="categories" item-text="attributes.name" item-value="id">
                </v-select>
              </v-col>
              <v-col cols="4">
                <v-text-field dense label="Link para Foto de Receita" outlined v-model="recipe.img"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea dense label="Descrição" outlined v-model="recipe.description"></v-textarea>
              </v-col>
              <v-col cols="12">
                <h3 class="mb-5">Ingredientes</h3>
                <div v-for="(ingredient, i) in recipe.ingredients" :key="i + 'ingredient'">
                  <v-text-field dense :label="`Ingrediente ${i+1}`" 
                    outlined v-model="recipe.ingredients[i]"></v-text-field>
                </div>
                <v-btn class="primary" small @click="addItem('ingredients')">Adicionar Ingrediente</v-btn>
                <v-divider class="my-4"></v-divider>
              </v-col>
              <v-col cols="12">
                <h3 class="mb-5">Passos</h3>
                <div v-for="(step, i) in recipe.steps" :key="i + 'step'">
                  <v-text-field dense :label="`Passo ${i+1}`" 
                    outlined v-model="recipe.steps[i]"></v-text-field>
                </div>
                <v-btn class="primary" small @click="addItem('steps')">Adicionar Passo</v-btn>
                <v-divider class="my-4"></v-divider>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    recipe: {
      type: Object,
      default: () => ({
        name: "",
        duration: 0,
        serving: 21,
        img: "",
        description: "",
        ingredients:[""],
        steps:[""],
        category: 1
      })
    }
  },
  computed: {
    categories(){
      return this.$store.getters.readCategories
    }
  },
  methods: {
    addItem(item){
      if (this.recipe[item] == null) {
        this.recipe[item] = []
      }
      this.recipe[item].push("")
    }
  }
}
</script>