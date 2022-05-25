<template>
  <v-card>
    <v-card-title class="title primary white--text mb-3">
      <v-icon class="mr-3" dark>mdi-account-plus</v-icon>
      Criar Conta
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-text-field dense outlined label="Nome do usuário"></v-text-field>
        <v-text-field dense outlined label="E-mail"></v-text-field>
        <v-text-field dense outlined label="Senha"></v-text-field>
        <v-text-field dense outlined label="Confirmar senha"></v-text-field>
        <div class="d-flex justify-space-between">
          <v-btn color="secundary" small >Entrar</v-btn>
          <v-btn color="secundary" small outlined @click="close()">Fechar</v-btn>
        </div>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  methods: {
    close() {
      this.$emit('close',false)
    }
  }
}
</script>