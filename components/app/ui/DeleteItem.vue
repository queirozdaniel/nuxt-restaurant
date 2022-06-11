<template>
  <div>
    <v-btn icon @click="dialog = true"><v-icon>mdi-delete</v-icon></v-btn>
    <v-dialog v-model="dialog" max-width="590">
      <v-card>
        <v-card-title class="headline">Deletar Receita</v-card-title>
        <v-card-text>
          Deseja realmente exluir receita ?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="error" @click="returnChoice(true)">Deletar</v-btn>
          <v-btn class="primary" @click="returnChoice(false)">Voltar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false
    }
  },
  methods: {
    returnChoice(choice) {
      this.dialog = false
      this.$emit("choice", choice)
    }
  }
}
</script>