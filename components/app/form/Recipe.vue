<template>
  <div>
    <v-card max-width="800" class="mx-auto">
      <v-card-title>
        Minha Receita
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="onsubmit">
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field dense label="Nome da Receita" outlined v-model="recipe.name"></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field dense label="Tempo de Preparo em minutos" type="number" outlined v-model="recipe.duration"></v-text-field>
                <v-icon>mdi-clock</v-icon> {{formatedTime}}
              </v-col>
              <v-col cols="4">
                <v-text-field dense label="Serve Quantas Pessoas ?" outlined v-model="recipe.servings"></v-text-field>
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

            <v-btn type="submit" class="secundary my-5" small>Gravar receita</v-btn>
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
        servings: 21,
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
    },
    formatedTime() {
      let hours = Math.floor(this.recipe.duration / 60)
      let minutes = this.recipe.duration % 60

      return ("0"+hours).slice(-2) + ":" + ("0"+minutes).slice(-2)
    }
  },
  methods: {
    addItem(item){
      if (this.recipe[item] == null) {
        this.recipe[item] = []
      }
      this.recipe[item].push("")
    },
    async onsubmit() {
      const id = this.$auth.user.id
      this.recipe.author = id
      this.recipe.duration = Number(this.recipe.duration)
      this.recipe.servings = Number(this.recipe.servings)
      this.recipe.category = Number(this.recipe.category)
      const token = this.$auth.strategy.token.get()

      await this.$apollo.mutate({
        context: {
          headers: {
            Authorization: token
          }
        },
        mutation:require('../../../graphql/createRecipe.gql'),
        variables:this.recipe
      })
      .then( data => {
        //console.log(data)
        this.$router.push({ name: 'user' })
        this.$store.dispatch("snackbars/setSnack", { text: "Receita Salva!", color: "info" })
      })
      .catch(error => {
        console.error(error);
        this.$store.dispatch("snackbars/setSnack", { text: "Houve algum erro!", color: "error" })
      })
    }
  }
}
</script>