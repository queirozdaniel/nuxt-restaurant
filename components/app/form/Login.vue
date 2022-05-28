<template>
  <v-card>
    <v-card-title>
      <v-icon class="mr-3">mdi-account-key</v-icon>
      Acessar Conta
    </v-card-title>
    <v-card-text>
      <v-form @submit.prevent="onsubmit">
        <v-text-field dense outlined label="Nome de usuário" v-model="userInfo.identifier"></v-text-field>
        <v-text-field dense outlined label="Senha" v-model="userInfo.password" 
          :type=" show ? 'text' : 'password'" 
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="show = !show"></v-text-field>
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
      show: false,
      userInfo: {
        identifier:'',
        password: '',
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
          this.$emit('close',false)
          this.$store.dispatch("snackbars/setSnack", { text: `Bem vindo, ${this.$auth.user.username}!` , color: 'success'})
        }).catch(error => {
          this.$store.dispatch("snackbars/setSnack", { text: 'Verifique se o nome de usuário e/ou senha estão corretos', color: 'error'})
        })
    }
  }
}
</script>