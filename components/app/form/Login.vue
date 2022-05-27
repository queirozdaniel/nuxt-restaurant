<template>
  <v-card>
    <v-card-title>
      <v-icon class="mr-3">mdi-account-key</v-icon>
      Acessar Conta
    </v-card-title>
    <v-card-text>
      <v-form @submit.prevent="onsubmit">
        <v-text-field dense outlined label="Nome de usuário" v-model="userInfo.identifier"></v-text-field>
        <v-text-field dense outlined label="Senha" v-model="userInfo.password"></v-text-field>
        <div class="d-flex justify-space-between">
          <v-btn color="primary" small type="submit">Entrar</v-btn>
          <v-btn color="primary" small outlined @click="close()">Fechar</v-btn>
        </div>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data(){
    return {
      userInfo: {
        identifier:'',
        password: ''
      }
    }
  },
  methods: {
    close() {
      this.$emit('close',false)
    },
    async onsubmit() {
      await this.$auth.loginWith("local", { data: this.userInfo })
        .then(() => {
          console.log(this.$auth);
          this.$emit('close',false)
        }).catch(error => console.log(error))
    }
  }
}
</script>