<template>
  <v-card>
    <v-card-title>
      <v-icon class="mr-3">mdi-account-key</v-icon>
      Acessar Conta
    </v-card-title>
    <v-card-text>
      <v-text-field dense outlined label="Nome do usuário"></v-text-field>
      <v-text-field dense outlined label="Senha"></v-text-field>
      <div class="d-flex justify-space-between">
        <v-btn color="primary" small >Entrar</v-btn>
        <v-btn color="primary" small outlined @click="close()">Fechar</v-btn>
      </div>
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